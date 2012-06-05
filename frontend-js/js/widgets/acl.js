	(function($) {
	  $.widget( "telefonica.acl", {
		    // These options will be used as defaults
		    options: { 
		    	clear: null,
		    	log: false,
		    	data: {},
		    	callback: function(){}
		    },

		 	_init: function() {
		 		
		 	},

		    // Set up the widget
		    _create: function() {
		    	this['visibility'] = $.telefonica.acl.visibility;
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

			apply: function(args) {
				if($P.empty(args)){
					return;
				}
				if( 'data' in args){
					this.options.data = args.data;
				}
				
				var mode = this.options.callback(args);
				var context = this.element[0];
				var widget = this;
				var template;
				if($P.empty(widget.options.data)){
					return;
				}
				if(mode in widget.options.data) {
					template = widget.options.data[mode];
				} else {
					return;
				}

				$.each(template, function(tag, visibility){
					$.each( $(tag,context), function(key, item){
						switch(visibility){
							case widget.visibility.READONLY:
								if ( item.tagName == 'DIV' || item.tagName == 'TR'){
									$.each($('input', $(item)), function(key2, item2){ 
										$(item2).attr('readonly','readonly');
									});
									$.each($('select', $(item)), function(key2, item2){ 
										$(item2).attr('disabled','disabled');
									});
									$.each($('textarea', $(item)), function(key2, item2){ 
										$(item2).attr('readonly','readonly');
									});
								} else if($(item).attr('data-toggle') !== undefined){
									$(item).removeAttr('data-toggle');
									$(item).removeAttr('href');
									$(item).attr('disabled','disabled');
								} else {
									if(item.type === 'radio' || item.type === 'checkbox' || item.type === 'select-one') {
										$(item).attr('disabled','disabled');	
									} else {
										$(item).attr('readonly','readonly');
									}
								}
							break;

							case widget.visibility.HIDDEN:
								var forAttr = tag;
								if(forAttr[0] === '.' || forAttr[0] === '#'){
									forAttr = $P.substr(forAttr,1);
									$('label[for='+forAttr+']', context).addClass('hidden');
								}
								$(item).addClass('hidden');
							break;

							case widget.visibility.AVAILABLE: 
								$(item).removeClass('hidden');
								$(item).removeAttr('disabled');
								$(item).removeAttr('readonly');
							break;
						}
					});
				});
			}
	})
	$.telefonica.acl['visibility'] = {
		AVAILABLE: 0,
		HIDDEN : 1,
		READONLY : 2
	};
	}(jQuery));
