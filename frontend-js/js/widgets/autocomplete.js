// Widget
$(document).ready(function() {
	(function( $ ) {
	  $.widget( "telefonica.selfAutocomplete", {
		    // These options will be used as defaults
		    options: {
		    	search_quantity: 10,
		    	service: null,
		    	params: ['name', 'search_quantity'],
		    	accesor : [],
		    	label: '',
		    	key: '',
		    	pathLabel: '',
		    	pathKey: '',
		    	prefixStore: '',
		    	i18n: false,
		    	trick: false,
		    	callback: function(data){ }
		    },

		 	_init: function() {
		 		var widget = this;
		    	if(! widget.options.service in http_request){
		    		return;
		    	}
	    		
		    	widget.element.each(function(key, item){
		    		$(item).autocomplete({
				        minLenght: 3,
				        delay: 300,
				        source: function(request, response) {
				                var name = request.term;
				                var search_quantity = 10;
				                var params = $P.implode(', ', widget.options.params);
				                var service = widget.options.service;
				                eval ('http_request[service](' 
				                		+ params + ', function(result){ widget._sourceCallback(result, response, widget);}'+
				                	');');

				        },
				        select: function (event, ui) {
				        	widget._selectCallBack(ui, widget, item);
				        	widget.options.callback(ui.item);
				        	if(widget.options.i18n){
				        		widget._i18n(ui.item, item);
				        	}
				        	return false;
				        }
			    	});
			    	if(!$P.empty($(item).val())){
			    		var prefixStore = widget.options.prefixStore;
			    		var pathLabel = widget.options.pathLabel;
			    		store.set(prefixStore + ' ' + pathLabel + '_loaded', true);
			    		store.set(prefixStore + ' ' + pathLabel, $(item).val());
			    	} else{
			    		store.set(prefixStore + ' ' + pathLabel + '_loaded', false);
			    	}
		    	});
		 	},


		 	_sourceCallback: function(result, response, widget) {
				result = widget._accesor(result, widget.options.accesor, false);
        		response(
        			$.map(result, function(item) {
        				var data = { 'item' : item}
        				if(!$P.empty(widget.options.label)){
        					data['label'] = widget._accesor(item, widget.options.label, widget.options.i18n);
        				}
        				if(!$P.empty(widget.options.key)){
        					data['key'] = widget._accesor(item, widget.options.key, false);
        				}
        				return data;
        			})
        		);
        	},


        	_selectCallBack : function(ui, widget, item){
        		if(!$P.empty(widget.options.pathLabel)){
        			var label = $.trim(ui.item.label);
        			$(item).val(label);
        		}
        		if(!$P.empty(widget.options.pathKey)){
        			var key = ui.item.key;
        			$(item).siblings(widget.options.pathKey).val(key);	
        		}
        		widget._loadData(ui.item.item);
        	},

        	validate: function(){
		 		var widget = this;
		 		var prefixStore = widget.options.prefixStore;
				var pathLabel = widget.options.pathLabel;
				var pathKey = widget.options.pathKey;
				var item = widget.element[0];
				var storeLabel = store.get(prefixStore + ' ' + pathLabel);
				if(store.get(prefixStore + ' ' + pathLabel + '_loaded') && $.trim(storeLabel) == $.trim($(item).val())) {
					return true;
				}
				if(widget.options.i18n && !$P.empty(storeLabel)){
					storeLabel = storeLabel[parseLanguage(store.get('language'))];
				}
	 			if( $.trim(storeLabel) != $(item).val() || 
	 				store.get(prefixStore + ' ' + pathKey) != $(item).siblings(pathKey).val()){
	 				return false;
	 			}
	 			return true;
		 	},

		 	_loadData: function(item){
		 		var widget = this;
		 		var prefixStore = widget.options.prefixStore;
				var pathLabel = widget.options.pathLabel;
				var pathKey = widget.options.pathKey;
		 		widget.element.each(function(key, elem){
		 			if(!$P.empty(widget.options.prefixStore)){
	    				if(!$P.empty(pathLabel)){
	    					var label = $(elem).val();
	    					if(widget.options.i18n){
	    						label = widget._accesor(item, widget.options.label, false);
	    					}
	    					store.set(prefixStore + ' ' + pathLabel, label);
	    				}
	    				if(!$P.empty(pathKey)){
	    					var key = $(elem).siblings(pathKey).val();
	    					store.set(prefixStore + ' ' + pathKey, key);		
	    				}
	    				if(widget.options.trick){
	    					store.set(prefixStore + ' ' + 'trick', item);
	    				}
		        	}
	        	});
		 	},

		 	getTrick: function(){
		 		var prefixStore = this.options.prefixStore;
		 		return store.get(prefixStore + ' ' + 'trick');
		 	},


		 	_i18n: function(item, context){
		 		var regexp = new RegExp(/^_.*/);
				var classList = $(context).attr('class').split(/\s+/);
				var key = item['key'];

				$.each( classList, function(index, _class){
				    if (regexp.exec(_class)) {
				    	$(context).removeClass(_class);
				    }
				});
				$(context).addClass('_'+key);
				i18n['es'][key] = $.trim(item.item['description']['es_ES']);
				i18n['en'][key] = $.trim(item.item['description']['en_UK']);
		 	},

        	_accesor: function(item, accesor, i18n){
        		var result = '';
        		if(typeof accesor == 'object'){
					var item2 = $.extend(true, {}, item);
					$.each(accesor, function(key, value){
						if(value in item2){
							item2 = item2[value];
						}
					});
					result = item2;
				} else{
					result = item[accesor];
				}
				if(i18n){
		 			result = result[parseLanguage(store.get('language'))];
		 		}
		 		return result;
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

			
		});	
	}(jQuery) );
});
