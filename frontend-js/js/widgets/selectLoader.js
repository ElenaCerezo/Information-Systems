	(function($) {
	  $.widget( "telefonica.selectLoader", {
		    // These options will be used as defaults
		    options: { 
		  		key: '',
		  		value: '',
		    	data: {},
		    	method: '',
		    	first_element: '',
		    	empty_element: '',
		    	accesor: [],
		    	callback: function(){}
		    },

		 	_init: function() {
		    	var widget = this;
		    	if (widget.options.method == '') {
		 			widget.element.each(function(key, element) {
						$(element).empty();
						var first_option = $('<option></option>');
						first_option.html(_(widget.options.empty_element));
						$(element).append(first_option);
		 			});
		    		return;
		    	}
		 		http_request[widget.options.method](widget.options.data, function(result) {
		 			result = widget.getDataFromAccesor(result, widget.options.accesor);
		 			widget.element.each(function(key, element) {
						$(element).empty();
						var first_option = $('<option></option>');
						first_option.attr('value', '');
						first_option.addClass('lang');
						first_option.addClass('_' + widget.options.first_element);
						first_option.html(_(widget.options.first_element));
						$(element).append(first_option);
						$(result).each(function(key, value) {
							var option = $('<option></option>');
							option.attr('value', value[widget.options.key]);
							if ($P.is_array(value[widget.options.value])) { // contains languages
								// localizated key for i18n
								i18nKey = widget.options.method + "_" + value[widget.options.key];
								
								if ($P.array_key_exists('es_ES', value[widget.options.value])) {
									i18n['es'][i18nKey] = value[widget.options.value]['es_ES'];
								}
								if ($P.array_key_exists('en_UK', value[widget.options.value])) {
									i18n['en'][i18nKey] = value[widget.options.value]['en_UK'];
								}
								option.addClass('lang');
								option.addClass('_' + i18nKey);
								option.html(_(i18nKey));
							} else {//is a string
								option.html(value[widget.options.value]);
							}
							$(element).append(option);
						});
						widget.options.callback;
					});
		 		});
		 	},
			getDataFromAccesor: function(data, accesor) {
				$.each(accesor, function(key, value){
					if (value in data) {
						data = data[value];
					} else {
						return {};
					}
				});
				return data;
			},

		    // Set up the widget
		    _create: function() {
		    },
		 
		    // Use the _setOption method to respond to changes to options
		    _setOption: function( key, value ) {
		    	
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
		    }

	})
	}(jQuery));
