/**

 * Main render function
 * @param view path to file with the template
 * @param container css path to the element where the template will be renderized
 * @param data data to fill the template
 * @param pre_callback callback to modify the data before the renderization
 * @param post_callback callback to modify the html output before appending it to the iface
 * @return
 */

(function($){

	var Render = function(element, options) {
	    this.$element = $(element);
	    this.options = options;
	    this.enabled = true;
	    this.init();
	};
	Render.prototype = {
	    init: function () {
	    	var language = getLanguage(store.get('language'));
	    	var widget = this;
	    	$.get(this.options.view, function(content_view) {
	    		var log = false;
	    		// Callback to modify data
	    		var data = $.extend(true, {}, widget.options.data);
	    		data = extend_data(data);
	    		data = widget.options.pre_callback(data);
	    		if (log) {
	    			console.log('render data received', data);
	    		}
	    		// Add i18n strings
	    		data = i18n_fill(language, data);
	    		if (log) {
	    			console.log('render data with i18n', data);
	    		}
	    		content_view = widget.add_localization_vars(content_view);

	    		if (log) {
	    			console.log('render content view', content_view);
	    		}
	    		// Updates the template to provide i18n support  
	    		content_view = widget.add_localization(content_view);
	    		if (log) {
	    			console.log('render i18n content view', content_view);
	    		}

	    		// Render the template
	    		var html = Mustache.to_html(content_view, data);
	    		if (log) {
	    			console.log('render mustache html', html);
	    		}

	    		html = widget.add_replace_vars(html);
	    		if (log) {
	    			console.log('render add_replace_vars html', html);
	    		}
	    		// Post callback
	    		html = widget.options.post_callback(html);
	    		if (log) {
	    			console.log('render post_callback', html);
	    		}
	    		
	    		if (log) {
	    			console.log('render widget.$element', widget.$element);
	    		}
				widget.$element.each(function(key, element) {
		    		if (widget.options.withAppend) {
		    			$(element).append(html);
		    		} else {
		    			$(element).empty().append(html);
		    		}
				});
	    		widget.options.callback();
	    		setDatePicker();
	    	});
	    },
	    /**
	     * Function to expand the localization items to support dynamic language change
	     * @param html
	     * @return
	     */
	    add_localization: function(html) {
	    	return html.replace(/(\{\{(_[^}]+)\}\})/g, "<span class=\"lang $2\">$1</span>");
	    },

		add_localization_vars: function(html) {
	    	return html.replace(/\[\[\s*(_[\w\d_]+)((\s*,\s*\{\{[\w\d_]+\}\})*)\]\]/g, function(match, pragma, options) {
	    		return '<span class="pre_i18n">' + pragma + options + '</span>';
	    	});
	    },

	    /**
	     * Function to replace varibles on a string using a string with use of paramerters
	     * @param html
	     * @return
	     */
	    add_replace_vars: function(html) {
	    	var html = $(html)
	    	$('span.pre_i18n', html).each(function(k,v) {
	    		var value = $(v).html();
	    		var regexp = new RegExp(/_([\w\d_]+)/);
	    		var class_info = regexp.exec(value);
	    		var _class = class_info[0];
	    		var i18n_class = class_info[1];
	    		$(v).removeClass('pre_i18n');
	    		$(v).addClass(_class).addClass('lang');
	    		
	    		var result = value.split(/\s*,\s*/);
	    		var results = [];
	    		$.each(result, function(key, result) {
	    			if (key == 0) {
	    				return
	    			}
	    			results.push(result);
	    		});
	    		$(v).data('i18n', results);
	    		var ev = 'var ht = $P.sprintf(_(i18n_class)';
	    		$.each(results, function(key, value) {
	    			ev = ev + ',\'' + value + '\'';
	    		});
	    		ev = ev + ');'
	    		eval(ev);
	    		$(v).html(ht);
	    	});
	    	return html;
	    }
	  };
	  
	var extend_data = function(data) {
		$.each(data, function(key, value) {
			if ($P.is_array(value)) {
				if (!$P.empty(value) && (value.length == undefined || value.length > 0)) {
					data[key] = extend_data(value);
					data[key + '?'] = true;
				} else {
					data[key + '?'] = false;
				}
			}
		});
		return data;
	};
    /**
     * Default pre callback function
     * @param data
     * @return
     */
    var default_pre = function(data) {
    	return data;
    };
    /**
     * Default post callback function
     * @param html
     * @return
     */
    var default_post = function(html) {
    	return html;
    };
    /**
     * Default callback
     */
    var default_callback = function() {
    	
    };
	  
	  $.fn.render = function(options) {
			$.fn.render.initWith.call(this, options, Render, 'render');
			return this;
	  };
	  
	  $.fn.render.initWith = function (options, Constructor, name) {
		    if (options === true) {
		        return this.data(name);
		      } else if (typeof options == 'string') {
		        render = this.data(name);
		        if (render) {
		          render[options]();
		        }

		        return this;
		      }

		    options = $.extend({}, $.fn[name].defaults, options);

		    function get(ele) {
		        var render = $.data(ele, name);

//		        if (!render) {
		          render = new Constructor(ele, $.fn.render.elementOptions(ele, options));
		          $.data(ele, name, render);
//		        }

		        return render;
		      }

		    if (!options.live) {
		        this.each(function() {
		          get(this);
		        });
		    }
		    return this;
	    
	  };

	  $.fn.render.Render = Render;
	  $.fn.render.defaults = {
				withAppend: false,
				view: '', 
				data: {}, 
				pre_callback: default_pre, 
				post_callback: default_post, 
				callback: default_callback
			  };
	  $.fn.render.elementOptions = function(ele, options) {
		    return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
	  };

	})(jQuery);