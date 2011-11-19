/**
 * jQuery Validation Tooltips Plugin v1.0
 * http://envysphere.com/jquery-validation-tooltips-14/
 *
 * Copyright 2011, Shaun Simmons
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

;(function($) {

$.extend($.validator.defaults, {
	errorPlacement: function($error, $element) {
		$error.css('visibility', 'hidden').appendTo($element[0].form);
	},

	showErrors: function(errorMap, errorList) {
		this.defaultShowErrors();
		this.reflow(errorList);
	},

	errorPosition: 'r',

	// Extra spacing is applied only in the direction of the error's side closest to it's element.
	errorSpacing: {
		top:    2,
		right:  3,
		bottom: 2,
		left:   3
	}
});

$.validator.prototype.reflow = function(errorList) {
	// If an errorList is not provided and the form has already been submitted once,
	// reflow all errors.
	if ( ! errorList) {
		if (typeof this.lastElement !== 'undefined') {
			this.reset();
			this.form();
		}

		return;
	}

	var i = errorList.length;
	while (i--) {
		var $element = $(errorList[i].element),
			$error = this.errorsFor(errorList[i].element),
			error_position = [$element.data('errorposition') || this.settings.errorPosition][0].toLowerCase(),
			offset, top = 0, left = 0;

		switch (errorList[i].element.type) {
			// Make an assumption that radios and checkboxes are wrapped by a label, or
			// they have labels that are directly linked using the `for` attribute.
			case 'checkbox':
			case 'radio':
				var $parentLabel = $element.parent('label');
				if ($parentLabel.length) {
					$element = $parentLabel;
					top = -3;
				}
				else {
					var $linkedLabel = $(this.currentForm).find("label[for='"+ $element.attr('id') +"']");
					if ($linkedLabel.length) {
						$element = $linkedLabel;
						top = -3;
					}
				}
				break;
		}

		offset = $element.offset();

		switch (error_position) {
			case 't':
				top += offset.top - this.settings.errorSpacing.top - $element.outerHeight();
				left += offset.left;
				break;
			case 'b':
				top += offset.top + this.settings.errorSpacing.bottom + $element.outerHeight();
				left += offset.left;
				break;
			case 'l':
				top += offset.top;
				left += offset.left - this.settings.errorSpacing.right - $error.outerWidth();
				break;
			case 'tl':
				top += offset.top - this.settings.errorSpacing.top - $element.outerHeight();
				left += offset.left - this.settings.errorSpacing.right - $error.outerWidth();
				break;
			case 'tr':
				top += offset.top - this.settings.errorSpacing.top - $element.outerHeight();
				left += offset.left + this.settings.errorSpacing.left + $element.outerWidth();
				break;
			case 'bl':
				top += offset.top + this.settings.errorSpacing.bottom + $element.outerHeight();
				left += offset.left - this.settings.errorSpacing.right - $error.outerWidth();
				break;
			case 'br':
				top += offset.top + this.settings.errorSpacing.bottom + $element.outerHeight();
				left += offset.left + this.settings.errorSpacing.left + $element.outerWidth();
				break;
			case 'r':
			default:
				top += offset.top;
				left += offset.left + this.settings.errorSpacing.left + $element.outerWidth();
				break;
		}

		$error.css({
			'left': left + 'px',
			'top': top + 'px',
			'position': 'absolute',
			'visibility': 'visible'
		});
	}
};

})( jQuery );
