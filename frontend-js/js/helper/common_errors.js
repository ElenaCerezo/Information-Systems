var common_errors = {
		"-10": 'si_10',
		"-20": 'si_20',
		"-30": 'si_30',
		"-40": 'si_40',
		"-41": 'si_41',
		"-50": 'si_50',
		"-60": 'si_60',
		"-70": 'si_70',
		"-80": 'si_80',
		"-90": 'si_90',
		"403": 'si_403',
		"-120": 'si_120',
		unknown: 'unknown_error'
};

function _getErrorCode(code) {
	if (!(code in common_errors)) {
		/**
		 * try to estimate the key based in code
		 */
		if ($P.is_int(parseInt(code))) {
			code = Math.abs(code);
		}
		var estimatedCode = "si_" + code;
		if (existsI18nKey(estimatedCode)) {
			return estimatedCode;
		}
		return common_errors.unknown;
	}
	return common_errors[code];
}

defaultErrorHandler = function (jsonerror, extended_i18n) {
	$('#messages').messages();
	var message;
	if (!$P.empty(jsonerror)) {
		var regexp = new RegExp(/<html>/);
		var matches = regexp.exec(jsonerror['responseText']);
		if (matches) {
			message = {
				message : _(_getErrorCode(jsonerror.status), extended_i18n), 
				type: 'important'
			};
		} else {
			eval("var errorObj = " +  jsonerror['responseText']);
			if ('SIError' in errorObj) {
				message = {
					message : _(_getErrorCode(errorObj.SIError.code), extended_i18n), 
					type: 'important'
				};
			} else {
				message = {
					message : _(_getErrorCode(jsonerror.status), extended_i18n), 
					type: 'important'
				};
			}
		}
	} else {
		message = {
			message : _('request_fail'), 
			type: 'important'
		};
	}
	$('#messages').messages('show', {messages : [message]});
}.defaults("", {});