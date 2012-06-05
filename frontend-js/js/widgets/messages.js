$(document).ready(function() {
	(function($) {
	  $.widget( "telefonica.messages", {
		    // These options will be used as defaults
		    options: { 
		    	clear: null ,
		    	log: false ,
		    	open: false ,
		    	messages: [] ,
		    	message_header: _('result'), 
		    	modal_context: "#modal-message" ,
		    	view: '../../js/helper/views/messages.html' ,
		    	callback: function(){}
		    },

		 	_init: function() {
		 		
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
		    _callback: function() {
				var modal_context = this.options.modal_context;
				$(modal_context).modal({keyboard: true, backdrop: true});
				$(modal_context).modal('show');
				$(modal_context + ' .modal-footer .close').css('opacity', 1);
				$(modal_context + ' .close').click(function(){
					$(modal_context).modal('hide');
				});
				$(modal_context).die().live('hidden', function() {
					store.set('modal_is_opened', false);
				});
			},
		    by_type: function(args){
		    	var widget = this;
		    	var message = '';
		    	var type = 'success';
		    	var context = widget.element[0];
		    	if(!$P.empty(args)) {
		    		message = args['message'];
		    		type = args['type'];
		    	}
		    	$(context).render({
					data : {
						message_header: widget.options.message_header,
						messages : {type: type, typeStr : _(type), message : message}
					},
					view : widget.options.view,
					callback: function(){
						widget._callback();
					}
				});
		    },
			show: function(args) {
				if($P.empty(args)){
					return;
				}
				if('messages' in args){
					this.options.messages = args.messages;
				}
				if('message_header' in args){
					this.options.message_header = args.message_header;
				}

				var context = this.element[0];
				var widget = this;
				if (this.options.open == true) {
					return;
				}

				if(store.get('modal_is_opened') == true){
					return;
				}
				store.set('modal_is_opened', true);
				$(context).render({
					data : {
						message_header: widget.options.message_header,
						messages : widget.options.messages
					},
					view : widget.options.view,
					pre_callback: function(data) {
						if ('messages' in data) {
							$.each(data.messages, function(key, value) {
								data.messages[key]= {
										type: data.messages[key].type, 
										typeStr: _(data.messages[key].type),
										message: data.messages[key].message,
										param : data.messages[key].param,
										op1 : data.messages[key].op1,
										op2 : data.messages[key].op2

									};
								var params = '';
								if(data.messages[key].op1 != ''){
									params +=','+data.messages[key].op1;
								}
								if(data.messages[key].op2 != ''){
									params +=','+data.messages[key].op2;
								}

								eval("data.messages[key].message = $P.sprintf('"+data.messages[key].message+"'"+params+");");
								//console.log(data.messages[key]);
								if(!$P.empty(data.messages[key]['param']) ) {
									data.messages[key]['param?'] = true;
									data.messages[key]['param'] = data.messages[key].param;
								}
							});
						}
						return data;
					} ,
					callback: function(){
						widget._callback();
					}
				});
			}
	})
	}(jQuery));
});
