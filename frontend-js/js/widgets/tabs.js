$(document).ready(function() {
	(function($) {
	  $.widget( "telefonica.myTabs", {
		    // These options will be used as defaults
		    options: { 
		    	container: '',
				view: '',
				init:''
		    },

		    

		 	_init: function() {
		 		var widget = this;
		    	var context = widget.element[0];
		 		$('a[href="'+widget.options.init+'"]', $(context)).trigger('click');
		 	},

		    // Set up the widget
		    _create: function() {
		    	var widget = this;
		    	var context = widget.element[0];
		    	$('a[data-toggle="tab"]', $(context)).each(function(key, item){
		    		var tab_name = $P.str_replace('#', '', $(item).attr('href'));
		    		$(item).unbind('click').click(function(){
		    			$(widget.options.container).render({
		    				view: widget.options.view,
		    				data: {
		    					header: tab_name
		    				},
		    				callback: function(){
		    					eval(tab_name + '(\'' + widget.options.container + '\');');
		    				}
		    			});
		    		});
		    	});
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
	})
	}(jQuery));
});
