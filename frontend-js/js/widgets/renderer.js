/**

 * Main render function
 * @param view path to file with the template
 * @param container css path to the element where the template will be renderized
 * @param data data to fill the template
 * @param pre_callback callback to modify the data before the renderization
 * @param post_callback callback to modify the html output before appending it to the iface
 * @return
 */
(function( $ ) {
	$.widget( "telefonica.render", {
	    // These options will be used as defaults
	    options: { 
	    	withAppend: false,
			view: '', 
			data: {},
			setLanguage: false,
			post_callback: function(html) {
				return html;
			}, 
			pre_callback: function(data) {
				return data;
			}, 
			callback: function() {
				
			}
	    },


	 	_init: function() {
	 		var language = getLanguage(store.get('language'));
	    	var widget = this;
	    	$.get(this.options.view, function(content_view) {
	    		var log = false;
	    		// Callback to modify data
	    		var data = $.extend(true, {}, widget.options.data);
	    		data = widget._extend_data(data);
	    		data = widget.options.pre_callback(data);
	    		if (log) {
	    			console.log('render data received', data);
	    		}
	    		// Add i18n strings
	    		data = i18n_fill(language, data);
	    		if (log) {
	    			console.log('render data with i18n', data);
	    		}
	    		content_view = widget._add_localization_vars(content_view);

	    		if (log) {
	    			console.log('render content view', content_view);
	    		}
	    		// Updates the template to provide i18n support  
	    		content_view = widget._add_localization(content_view);
	    		if (log) {
	    			console.log('render i18n content view', content_view);
	    		}

	    		// Render the template
	    		var html = Mustache.to_html(content_view, data);
	    		if (log) {
	    			console.log('render mustache html', html);
	    		}

	    		html = widget._add_replace_vars(html);
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

	    		//Load data
	    		html = widget._loadData(html);

	    		if(widget.options.setLanguage){
					setLanguage(store.get('language'), html);
				}

				widget.element.each(function(key, element) {
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
	    _add_localization: function(html) {
	    	return html.replace(/(\{\{(_[^}]+)\}\})/g, "<span class=\"lang $2\">$1</span>");
	    },

		_add_localization_vars: function(html) {
	    	return html.replace(/\[\[\s*(_[\w\d_]+)((\s*,\s*\{\{[\w\d_]+\}\})*)\]\]/g, function(match, pragma, options) {
	    		return '<span class="pre_i18n">' + pragma + options + '</span>';
	    	});
	    },

	    /**
	     * Function to replace varibles on a string using a string with use of paramerters
	     * @param html
	     * @return
	     */
	    _add_replace_vars: function(html) {
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
	    },
	  
		_extend_data : function(data) {
			var widget = this;
			$.each(data, function(key, value) {
				if ($P.is_array(value)) {
					if (!$P.empty(value) && (value.length == undefined || value.length > 0)) {
						data[key] = widget._extend_data(value);
						data[key + '?'] = true;
					} else {
						data[key + '?'] = false;
					}
				}
			});
			return data;
		},



	    // Set up the widget
	    _create: function() {
	    },
	 
	    // Use the _setOption method to respond to changes to options
	    _setOption: function( key, value ) {
			switch( key ) {
				case "clear":
				// handle changes to clear option
				break;
			}
	 
			// In jQuery UI 1.8, you have to manually invoke the _setOption method from the base widget
			$.Widget.prototype._setOption.apply( this, arguments );
			// In jQuery UI 1.9 and above, you use the _super method instead
			//this._super( "_setOption", key, value );
	    },
	 
	    // Use the destroy method to clean up any modifications your widget has made to the DOM
	    destroy: function() {
	      // In jQuery UI 1.8, you must invoke the destroy method from the base widget
	      $.Widget.prototype.destroy.call( this );
	      // In jQuery UI 1.9 and above, you would define _destroy instead of destroy and not call the base method
	    },

	    _loadData: function(html) {
	    	var widget = this;
	    	var html =  $('<div></div>').html(html);
	    	var loadData = function(data, context){
		    	$.each(data, function(key, value) {
					$.each( $(context + ' .' + key, html), function(key, item){
						if($(this).parents('*[data-type="item"]').length > 0 ){
							return;
						}
						if ($(item).hasClass('datepicker')) {
							$(item).val(parseDateHour(value).date);
						} else if ($(item).is('select')) {
							$(item).val(value);
						} else if ($(item).is('input') && $(item).attr('type') == 'checkbox') {
							if (value == 'S') {
								$(item).attr('checked', 'checked');
							}
						}else if($(item).attr('data-type') == 'list'){
							$.each($('> *[data-type="item"]', $(item)), function(key2, item2){
								if(!$P.empty(value[key2]) ){
									$(this).attr('data-type', '_item');
									$(this).addClass('_item');
									loadData(value[key2], '._item');
									$(this).removeClass('_item');
									$(this).attr('data-type', 'item');	
								}
							});
						}
					});
				});
			};
			loadData(widget.options.data, '');
			return html.children();
	    },

		composeData: function(args) {
			var data = {};
			if('data' in args){
				data = args['data'];	
			}
			var widget = this;
			var skipList = data['skipLisk'];	// Classes won't be taked
			var blackList = ['hidden', 'datepicker', 
			                 'hasDatepicker', 'ui-autocomplete-input', 'ui-autocomplete-loading', 
			                 'small', 'medium', 'large', 'extra-large', 
			                 'ui-corner-all', 'ui-widget-content', 'ui-widget', 'ui-tabs', 'lang'];	// Classes will be discart

			var getWhitelistClass = function(item) {
				if($P.empty($(item).attr('class'))) {
					return null;
				}
				var classes = $(item).attr('class').split(/\s+/);
				var classR = null;
				var regexpLang = new RegExp(/^_.*/); // Classes lang
				var regexpSpan = new RegExp(/^span.*/); // Classes span
				$.each(classes, function(k, _class) {
					if (!$P.in_array(_class, skipList) && !$P.in_array(_class, blackList) && !regexpLang.exec(_class) && !regexpSpan.exec(_class)) {
						classR = _class;
						return;
					}
				});
				return classR;
			};

			var getComposeData = function(context){
				var sub_data = {};
				$('textarea, input, select', $(context)).each(function(key, item) {
					var _class = getWhitelistClass(item);
					var value = '';
					if(_class == null || $(this).parents('*[data-type="item"]').length > 0 ){
						return;
					}
					if($(item).hasClass('datepicker')){
						value = composeStringDate($(item).datepicker('getDate'));
					} else if($(item).attr('type') == 'checkbox') {
						if ($(item).attr('checked') == "checked") {
							value = true;
						} else {
							value = false;
						}
					} else if($(item).attr('type') == 'radio') {
						if ($(item).attr('checked') == "checked") {
							value = $(item).val();
						}
					} else{
						value = $(item).val();
					}
					if (!$P.empty(value)) {
						sub_data[_class] = value;
					}
				});

				$.each($('*[data-type="list"]', $(context)), function(key, list){
					var _class = getWhitelistClass(list);
					if(_class == null || $(this).parents('*[data-type="item"]').length > 0 ){
						return
					}
					sub_data[_class] = [];
					$.each($('*[data-type="item"]', $(list)), function(key, item){
						$(this).attr('data-type', '_item');
						var value = getComposeData(item);
						if(!$P.empty(value)){
							sub_data[_class].push(value);	
						}
						$(this).attr('data-type', 'item');
					});
				});
				return sub_data;
			};

			widget.element.each(function(key, context) {
				data = $P.array_merge(data, getComposeData(context));
			});
			return data;
		}
	});
}(jQuery) );
