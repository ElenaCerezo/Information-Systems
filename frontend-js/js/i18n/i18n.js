	function i18n_fill(language, data) {
		for (key in i18n[language]) {
			data['_' + key] = getValue(language, key);
		}
		return data;
	}
	
	function getValue(language, key) {
		if (!(language in i18n)) {
			return '_' + key;
		}

		if (!(key in i18n[language])) {
			return '_' + key;
		}

		var val = i18n[language][key];

		if (val == '' || val === null || val === false || typeof val === 'undefined') {
			return '_' + key;
		}

		return val;
	}
	
	_ = function (text, extended_i18n) {
		var language = store.get('language');
		if (!$P.empty(extended_i18n) && language in extended_i18n && text in extended_i18n[language]) {
			return extended_i18n[language][text];
		}
		return i18n[language][text];
	}.defaults('', {});

	function getLanguage(languageKey) {
		var language;
		switch (languageKey) {
		case '0': {
			language = 'en';
			break;
		}
		case '1': {
			language = 'es';
			break;
		}
		default: 
			if (languageKey == 'en' || languageKey == 'es') {
				language = languageKey;
			}
		}
		return language;
	}

	function setLanguage(lang) {
		lang = getLanguage(lang);
		store.set('language', lang);
		var regexp = new RegExp(/^_.*/);
		$('.lang').each(function (key, element) {
			var classList = $(element).attr('class').split(/\s+/);
			$.each( classList, function(index, _class){
			    if (regexp.exec(_class)) {
			    	_class = _class.slice(1, _class.length);
			    	if ($P.empty($(element).data('i18n'))) {
			    		$(element).html(getValue(lang, _class));
			    	} else {
			    		var ev = 'var ht = $P.sprintf(getValue(lang, _class)';
			    		$.each($(element).data('i18n'), function(key, value) {
			    			ev = ev + ',\'' + value + '\'';
			    		});
			    		ev = ev + ');'
			    		eval(ev);
			    		$(element).html(ht);
			    	}
			    }
			});
		});
		$('.search-query').attr('placeholder', _('search'));
		setDatePicker();
	}
	
	function existsI18nKey(key) {
		var language = store.get('language');
		return key in i18n[language];
	}