

/**
 * defaults parameters behavior
 * 
 * function (a, b) {
 * }.defaults(1, 2);
 */

Function.prototype.defaults = function()
{
  var _f = this;
  var _a = Array(_f.length-arguments.length).concat(
    Array.prototype.slice.apply(arguments));
  return function()
  {
    return _f.apply(_f, Array.prototype.slice.apply(arguments).concat(
      _a.slice(arguments.length, _a.length)));
  };
};

$.widget('ui.editable', {
	options: {},
	destroy: function() {
		var value = $('input', this.element).val();
		this.element.html(value);
	},
	create: function() {
		var value = this.element.html();
		value = $P.trim(value);
		
		var input = $('<input type="text" class="date" />');
		input.val(value);
		this.element.html(input);
	},
	_create: function() {
	}
	
}); 

function jsonStringify(obj) {
    try
    {
            return JSON.stringify(obj);
    }
    catch(err)
    {
            var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type  
            if (t == "string") obj = '"'+obj+'"';
            return String(obj);
        }
        else {
            // recurse array or object  
            var n, v, json = [], arr = (obj && obj.constructor == Array);
            for (n in obj) {
                v = obj[n]; t = typeof(v);
                if (t == "string") v = '"'+v+'"';
                else if (t == "object" && v !== null) v = jsonStringify(v);
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
}

function dateToTimestamp(date) {
	// Check if the object is a object Date
    if (date && typeof date === 'object' 
    	&& Object.prototype.toString.call(date) !== '[object Array]' 
    	&& date.constructor) {
        var arr = date.constructor.toString().match(/function\s*(\w+)/);
 
        if (arr && arr.length == 2) {
            if (arr[1] == 'Date') {
            	return date.getTime();
            }   
        }
    }

    // Check if the object is null
	if ($P.empty(date)) {
		return null;
	}
	
	// Object must be an string with format dd/mm/yyyy
	var exp = "(\\d+)/(\\d+)/(\\d+)";
	var reg = new RegExp(exp);
	var matches = reg.exec(date);
	if ($P.empty(matches)) {
		return null;
	}
	if ($P.empty(matches[1]) || $P.empty(matches[2]) || $P.empty(matches[3])) {
		return null;
	}
	var date = new Date(matches[3], (matches[2] - 1), matches[1]);
	return date.getTime();
}

function timeStampToDate(ts) {
	return new Date(parseInt(ts));
}

