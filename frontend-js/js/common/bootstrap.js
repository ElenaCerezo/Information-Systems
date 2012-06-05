/*
var $ = parent.$;
var $P = new parent.PHP_JS();
var jQuery = parent.jQuery;
var store = parent.store;
*/
var pre = true;
var default_language = 'es';
var $P;
$(document).ready(function() {
	$.loading({onAjax:true, align:'center', img:'../../images/loading.gif', classname:'loadingClass'});	
	$P = new PHP_JS();
	var language = $.getUrlVar(location.href,'l');
	if (language == 'en' || language == 'es') {
		store.set('language', language);
		setLanguage(language);
		default_language = language;
	} else {
		store.set('language', default_language);
	}
	setLanguage(default_language);
	services._init();
	init();
});
