'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	$('form[data-validate]').parsley({
		errorClass: 'form__row--error',
		successClass: 'form__row--success',
		errorsWrapper: '<ul class="form__errors"></ul>',
		errorTemplate: '<li class="form__errors-item"></li>',
		classHandler: function classHandler(ParsleyField) {
			return ParsleyField.$element.parent();
		}
	});
};

var $ = require('jquery');
require('parsleyjs');

module.exports = exports['default'];

