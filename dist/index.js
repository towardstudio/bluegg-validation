'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validation = function () {
	function Validation() {
		var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    _ref$form = _ref.form,
		    form = _ref$form === undefined ? '[data-validate]' : _ref$form,
		    _ref$errorClass = _ref.errorClass,
		    errorClass = _ref$errorClass === undefined ? 'error' : _ref$errorClass,
		    _ref$fieldContainer = _ref.fieldContainer,
		    fieldContainer = _ref$fieldContainer === undefined ? '' : _ref$fieldContainer,
		    _ref$validateLive = _ref.validateLive,
		    validateLive = _ref$validateLive === undefined ? true : _ref$validateLive;

		_classCallCheck(this, Validation);

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
		this.changeFields = this.form.querySelectorAll('input[type="checkbox"], input[type="radio"], select');

		this.init();
	}

	_createClass(Validation, [{
		key: 'init',
		value: function init() {
			var _this = this;

			//  Polyfill for element.matches & element.closest()
			// https://plainjs.com/javascript/traversing/get-closest-element-by-selector-39

			// matches polyfill
			this.Element && function (ElementPrototype) {
				ElementPrototype.matches = ElementPrototype.matches || ElementPrototype.matchesSelector || ElementPrototype.webkitMatchesSelector || ElementPrototype.msMatchesSelector || function (selector) {
					var node = this,
					    nodes = (node.parentNode || node.document).querySelectorAll(selector),
					    i = -1;
					while (nodes[++i] && nodes[i] != node) {}
					return !!nodes[i];
				};
			}(Element.prototype);

			// closest polyfill
			this.Element && function (ElementPrototype) {
				ElementPrototype.closest = ElementPrototype.closest || function (selector) {
					var el = this;
					while (el.matches && !el.matches(selector)) {
						el = el.parentNode;
					}return el.matches ? el : null;
				};
			}(Element.prototype);

			this.fields.forEach(function (input) {
				// Check all fields are valid
				input.addEventListener('invalid', _this.validateField, false);
			});

			this.changeFields.forEach(function (input) {
				// Check all fields are valid
				input.addEventListener('change', _this.validateField, false);
			});

			// We want inline live validation
			if (this.validateLive) {
				this.fields.forEach(function (input) {
					// Listen for when the element is unfocused
					input.addEventListener('blur', _this.validateField, false);
				});
			}
		}

		// if passed valid param, it will remove the error class, otherwise it will add them

	}, {
		key: 'setErrorClass',
		value: function setErrorClass(input, valid) {
			if (this.fieldContainer) {
				valid ? input.closest(this.fieldContainer).classList.remove(this.errorClass) : input.closest(this.fieldContainer).classList.add(this.errorClass);
			} else {
				valid ? input.classList.remove(this.errorClass) : input.classList.add(this.errorClass);
			}
		}
	}, {
		key: 'handleKeyupListener',
		value: function handleKeyupListener(event) {
			var input = event.target;
			if (input.validity.valid) {
				input.setCustomValidity('');
				this.setErrorClass(input, true);
			} else {
				input.checkValidity();
			}
		}
	}, {
		key: 'validityError',
		value: function validityError(input) {
			return input.validity.typeMismatch || input.validity.patternMismatch || input.validity.rangeUnderflow || input.validity.rangeOverflow || input.validity.tooLong || input.validity.tooShort;
		}
	}, {
		key: 'validateField',
		value: function validateField(event) {
			var input = event.target;

			// Required field is empty
			if (input.validity.valueMissing) {
				input.dataset.errorRequired ? input.setCustomValidity(input.dataset.errorRequired) : null;
				this.setErrorClass(input, false);
			} else if (this.validityError(input)) {
				input.dataset.errorRequired ? input.setCustomValidity(input.dataset.errorInvalid) : null;
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
	}]);

	return Validation;
}();

exports.default = Validation;
module.exports = exports['default'];

