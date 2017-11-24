class Validation {
	constructor(
		{
			form = '[data-validate]', // Should be unique per page, defaults to form with data-validate attribute
			errorClass = 'error', // The class to add to the field (or container)
			fieldContainer = '',
			validateLive = true
		} = {}
	) {
		// Store options
		this.form = document.querySelector(form);
		this.errorClass = errorClass;
		this.fieldContainer = fieldContainer;
		this.validateLive = validateLive;

		this.validateField = this.validateField.bind(this);
		this.handleKeyupListener = this.handleKeyupListener.bind(this);
		this.setErrorClass = this.setErrorClass.bind(this);
		this.validityError = this.validityError.bind(this);

		this.fields = this.form.querySelectorAll('input, select, textarea');
		this.changeFields = this.form.querySelectorAll(
			'input[type="checkbox"], input[type="radio"], select'
		);

		this.init();
	}

	init() {
		//  Polyfill for element.matches & element.closest()
		// https://plainjs.com/javascript/traversing/get-closest-element-by-selector-39

		// matches polyfill
		this.Element &&
			(function(ElementPrototype) {
				ElementPrototype.matches =
					ElementPrototype.matches ||
					ElementPrototype.matchesSelector ||
					ElementPrototype.webkitMatchesSelector ||
					ElementPrototype.msMatchesSelector ||
					function(selector) {
						var node = this,
							nodes = (node.parentNode || node.document).querySelectorAll(
								selector
							),
							i = -1;
						while (nodes[++i] && nodes[i] != node);
						return !!nodes[i];
					};
			})(Element.prototype);

		// closest polyfill
		this.Element &&
			(function(ElementPrototype) {
				ElementPrototype.closest =
					ElementPrototype.closest ||
					function(selector) {
						var el = this;
						while (el.matches && !el.matches(selector)) el = el.parentNode;
						return el.matches ? el : null;
					};
			})(Element.prototype);

		this.fields.forEach(input => {
			// Check all fields are valid
			input.addEventListener('invalid', this.validateField, false);
		});

		this.changeFields.forEach(input => {
			// Check all fields are valid
			input.addEventListener('change', this.validateField, false);
		});

		// We want inline live validation
		if (this.validateLive) {
			this.fields.forEach(input => {
				// Listen for when the element is unfocused
				input.addEventListener('blur', this.validateField, false);
			});
		}
	}

	// if passed valid param, it will remove the error class, otherwise it will add them
	setErrorClass(input, valid) {
		if (this.fieldContainer) {
			valid
				? input.closest(this.fieldContainer).classList.remove(this.errorClass)
				: input.closest(this.fieldContainer).classList.add(this.errorClass);
		} else {
			valid
				? input.classList.remove(this.errorClass)
				: input.classList.add(this.errorClass);
		}
	}

	handleKeyupListener(event) {
		let input = event.target;
		if (input.validity.valid) {
			input.setCustomValidity('');
			this.setErrorClass(input, true);
		} else {
			input.checkValidity();
		}
	}

	validityError(input) {
		return (
			input.validity.typeMismatch ||
			input.validity.patternMismatch ||
			input.validity.rangeUnderflow ||
			input.validity.rangeOverflow ||
			input.validity.tooLong ||
			input.validity.tooShort
		);
	}

	validateField(event) {
		let input = event.target;

		// Required field is empty
		if (input.validity.valueMissing) {
			input.dataset.errorRequired
				? input.setCustomValidity(input.dataset.errorRequired)
				: null;
			this.setErrorClass(input, false);
		} else if (this.validityError(input)) {
			input.dataset.errorRequired
				? input.setCustomValidity(input.dataset.errorInvalid)
				: null;
			this.setErrorClass(input, false);
		} else {
			input.setCustomValidity('');
			this.setErrorClass(input, true);
		}

		if (this.validateLive) {
			// If the input was marked invalid, lets listen for keyups to mark it valid asap
			input.addEventListener('keyup', this.handleKeyupListener);
		}
	}
}

export default Validation;
