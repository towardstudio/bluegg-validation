var $ = require('jquery');
require('parsleyjs');

export default function () {
	$('form[data-validate]').parsley({
		errorClass: 'form__row--error',
		successClass: 'form__row--success',
		errorsWrapper: '<ul class="form__errors"></ul>',
		errorTemplate: '<li class="form__errors-item"></li>',
		classHandler: function(ParsleyField) {
			return ParsleyField.$element.parent();
		}
	});
}
