$(document).ready(function(){
	var allowedBrowsers = {mozilla: {'Firefox 6.x' : '^6\\.*'}, 
			msie: {'Internet Explorer 8.0': '8\\.0'},
			chrome: {'Chrome': '534\\..*'}};
	var version = '';
	var browser = '';
	for (key in $.browser) {
		if (key == 'version') {
			version = $.browser['version'];
		}
		if ($.browser[key] == true) {
			browser = key;
		}
	}
	
	var isVersionAllowed = false;
	
	for (var k in allowedBrowsers) {
		v = allowedBrowsers[k];
		for (nav in v) {
			navigator_id = v[nav];
			var regexp = new RegExp(navigator_id);
			var result;
			result = regexp.exec(version);
			if (result != null) {
				isVersionAllowed = true;
				break;
			}
		}
		
	}
	
	if (!isVersionAllowed) {
		var i = 0;
		var navigators = new Array();
		for (var k in allowedBrowsers) {
			v = allowedBrowsers[k];
			for (nav in v) {
				navigators[i++] = nav;
			}
		}
		var browserListString = '';
		$.each(navigators, function(key, navigator) {
			if (browserListString == '') {
				browserListString += navigator;
			} else {
				browserListString += ", " + navigator;
			}
		});
		$('.messages').html("<span class=\"lang _browser_not_supported\">" + _('browser_not_supported') + "</span>" + browserListString);
		
	}
});
