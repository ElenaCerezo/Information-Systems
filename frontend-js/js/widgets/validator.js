// Widget
$(document).ready(function() {
	(function( $ ) {
	  $.widget( "telefonica.validator", {
	    // These options will be used as defaults parameters
	    options: { 
	      clear: null ,
	      type: 'warning',
	      data: {},
	      callback: function(data){ }
	    },
	
	    // This method is invoked anytime your widget is invoked without either 0 arguments or with a single options argument
	    
	    // Set up the widget
	    _init: function() {
	      this._applyRenderValidations();
	    },

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
	
	    _pushMessage : function(messages, param, message, op1, op2) {
	        messages.push({type: this.options.type, param : param, message: message, op1:op1, op2:op2});
	    },
	
	    check: function(args) {
	    	if(!$P.empty(args)){
				if('data' in args){
	    			this.options.data = args.data;
	    		}
			}
	    	
	    	this.options.callback(this.options.data);
	    	var data = this.options.data;
	    	var widget = this;
	    	var context = this.element[0];
	    	var messages = [ ];
	    	//console.log(this, this.element, $(this.element).context);
	    	var validation = function(checker, value, param){
	    		var f,op1,op2;
		    	if(typeof checker === 'object') {
		    		f = checker[0];
		    		op1 = checker[1];
		    		if(checker.length > 2){
		    			op2 = checker[2];	
		    		}
		    		
		    	} else {
		    		f = checker;
		    	}
				var result = widget._validator(value, f, op1, op2);
				if (!result) {
					widget._validatorMsj(messages, param, f, op1, op2);
				}
	    	}
	
			$.each(data, function(item, checkers){
				var lengthRadio = 0;
				var countRadio = 0;
				if($(item).attr('type') == 'radio'){
					lengthRadio = $(item).length;
					countRadio = 0;
				}				
				$.each($(item, context), function(key, item2){
			        var value = '';
			        var param = item.split(' ');
			        param = $.trim(param[param.length-1]);

			        if($(item2).attr('type') == 'radio') {
			        	countRadio++;
						if ($(item2).attr('checked') == "checked") {
							value = $(item2).val();
							countRadio = lengthRadio; // Finished searching
						} else if(countRadio == lengthRadio){
							value = '';
						} else{
							return;
						}
					} else{
						value = $(item2).val();
					}
			        
			        if(param[0] == '.') {
			        	param = $.trim(param.replace('.',''));	
			        } else if(param[0] == '#') {
			        	param = $.trim(param.replace('#',''));	
			        }
			        
			        //console.log('context : ', context, $(item, context));
			        //console.log('data : ', item, value, param, checkers);
			        if(value != null) {
						if ( typeof checkers === 'object') {
							$.each(checkers, function(key, checker) {
								if(checker == 'autocomplete'){
									var checker2 = [checker, value];
									validation(checker2, $(item2) ,param);
								} else{
									validation(checker, value ,param);
								}
							});
						}
			        }
			    });
		    });
			return messages;
	    },
	
	
	    _validator : function(value, type, op1, op2) {
	    	switch(type) {
		        case 'notEmpty' :
					if (typeof value === 'string') {
						value = $.trim(value);
					}
					return (value != '' && value != null && value != undefined);
		        break;
		        case 'isInteger':
		        	if (!this._validator(value, 'notEmpty')) {
		        		return true;
		        	}
					var regExpInteger  = /(^-?\d\d*$)/;
					return regExpInteger.test(value);
		        break;
		        case 'isNumeric':
		        	if (!this._validator(value, 'notEmpty')) {
		        		return true;
		        	}
					var regExpFloat = new RegExp(/^\d+(\.\d+)?$/);
					return regExpFloat.test(value);
		        break;
		        case 'isEqual':
		        	if (!this._validator(value, 'notEmpty')) {
		        		return true;
		        	}
		        	if (op1 == undefined) {
		        		return false;
		        	}
				    return value == op1;
		        break;
		        case 'isSmaller':
		        	if (!this._validator(value, 'notEmpty')) {
		        		return true;
		        	}
		        	if (op1 == undefined) {
		        		return false;
		        	}
				    if(!this._validator(value, 'isNumeric') || !this._validator(value, 'isNumeric')){
					   return false;
				    }
				    return value <= op1;
		        break;
		        case 'isBigger':
		        	if (!this._validator(value, 'notEmpty')) {
		        		return true;
		        	}
		        	if (op1 == undefined) {
		        		return false;
		        	}
				    if(!this._validator(value, 'isNumeric') || !this._validator(value, 'isNumeric')){
					     return false;
				    }
				    return value >= op1;
		        break;
		        case 'range':
		        	if (!this._validator(value, 'notEmpty')) {
		        		return true;
		        	}
		        	if (op1 == undefined || op2 == undefined) {
		        		return false;
		        	}
				    return (this._validator(value ,'isBigger' ,op1) && this._validator(value ,'isSmaller' ,op2));
		        break;
		        case 'notZero':
		        	if (!this._validator(value, 'notEmpty')) {
		        		return true;
		        	}
					var regExpZero  = /^(0)+$/;
					return !regExpZero.test(value);
		        break;
		        case 'isUrl' :
		        	if (!this._validator(value, 'notEmpty')) {
		        		return true;
		        	}
		        	if (value == '') {
		        		return true;
		        	}
	  		    	var regExpUrl = new RegExp(/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/);
	  			    return regExpUrl.test(value);
		        break;
		        case 'isDate' :
		        	if (!this._validator(value, 'notEmpty')) {
		        		return true;
		        	}
		        	if (value == '') {
		        		return true;
		        	}
	  		    	var regexpDate = new RegExp(/^[0-3]?[0-9]\/[0-1]?[0-9]\/\d+$/);
				    return regexpDate.exec(value);
		        break;
		        case 'isHour':
		        	if (!this._validator(value, 'notEmpty')) {
		        		return true;
		        	}
	  		    	var regexpEmail = new RegExp(/^(\d{1,2})\:(\d{1,2})$/);
				    var result = regexpEmail.exec(value);
				    if (result == null) {
				    	return false;
				    }
				    if (result.length != 3) {
				    	return false;
				    }
				    if (result[1] < 0 || result[1] > 23) {
				    	return false;
				    }
				    if (result[2] < 0 || result[2] > 59) {
				    	return false;
				    }
				    return true;
		        break;
		        case 'isPhone':
		        	if (!this._validator(value, 'notEmpty')) {
		        		return true;
		        	}
	  		    	var regexpPhone = new RegExp(/^(\d{6,20})$/);
				    return regexpPhone.exec(value);
				break;
		        case 'isEmail' :
		        	if (!this._validator(value, 'notEmpty')) {
		        		return true;
		        	}
		        	if (value == '') {
		        		return true;
		        	}
	  		    	var regexpEmail = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
				    return regexpEmail.exec(value);
		        break;
		        case 'size' :
		        	if (!this._validator(value, 'notEmpty')) {
		        		return true;
		        	}
		        	return value.length == op1;
		        case 'size_range':
		        	if (!this._validator(value, 'notEmpty')) {
		        		return true;
		        	}
		        	if (op1 == undefined || op2 == undefined) {
		        		return false;
		        	}
		        	return (op1 <= value.length && value.length <= op2);
		        break;
		        case 'autocomplete':
		        	if (!this._validator(op1, 'notEmpty')) {
		        		return true;
		        	}
		        	return $(value).selfAutocomplete('validate');
		        break;
		        default:
		        	console.log('Validation type incorrect : ', type);
			};
	    },
	
		_validatorMsj : function(messages, key, type, op1, op2){
			switch(type){
				case 'notEmpty':
					this._pushMessage(messages, _(key), _('cant_be_empty'));
				break;
				case 'isInteger':
					this._pushMessage(messages, _(key), _('is_not_integer'));
				break;
				case 'isNumeric':
					this._pushMessage(messages, _(key), _('is_not_number'));
				break;
				case 'isBigger':
					this._pushMessage(messages, _(key), _('is_not_bigger'), op1);
				break;
				case 'isSmaller':
					this._pushMessage(messages, _(key), _('is_not_smaller'), op1);
				break;
				case 'range':
					this._pushMessage(messages, _(key), _('not_belong_range'), op1, op2);
				break;
				case 'isEqual':
					this._pushMessage(messages, _(key), _('is_not_equal'), op1);
				break;
				case 'notZero':
					this._pushMessage(messages, _(key), _('cant_be_zero'));
				break;
				case 'isUrl':
					this._pushMessage(messages, _(key), _('is_not_url'));
				break;
				case 'isDate':
					this._pushMessage(messages, _(key), _('is_not_date'));
				break;
				case 'isHour':
					this._pushMessage(messages, _(key), _('is_not_hour'));
				break;
				case 'isPhone':
					this._pushMessage(messages, _(key), _('is_not_phone'));
				break
				case 'isEmail':
					this._pushMessage(messages, _(key), _('is_not_email'));
				break;
				case 'size':
					this._pushMessage(messages, _(key), _('must_be_size'), op1);
				case 'size_range':
					this._pushMessage(messages, _(key), _('must_be_length'), op1, op2);
				break;
				case 'autocomplete':
					this._pushMessage(messages, _(key), _('must_be_selected'));
				break;
			};
	    },
	    _applyRenderValidations : function() {
	    	var list_validations = this.options.data;
	    	var context = this.element[0];

	    	if($P.empty(list_validations)){
	    		return;
	    	}

			var checkInteger = function(value) {
				var n = parseInt(value);
		        if (isNaN(n)){
		            return "";
		        }
		        return n;						
			};
			
			var checkNumeric = function(value) {
				var regExpFloat = new RegExp(/^(\d+(\.\d*)?)$/);
				var result = regExpFloat.exec(value);
		        if (result == null || result.length < 2 || result[0] != result[1]) {
		    		var regExpFloat = new RegExp(/^(\d+(\.\d*)?)/);
		    		var result = regExpFloat.exec(value);
		    		if (result == null || result.length < 2) {
		    			return "";
		    		} else {
		    			return result[0];
		    		}
		        }
		        return result[0];
			};

			$.each($('.datepicker', $(context)), function(key, value) {
				$(value, $(context)).addClass('medium');
			});
			
			$.each(list_validations, function(_class, values) {
				$.each(values, function(key, value) {
					// Applying for each class
					if(value == 'isHour'){
						value = ['size_range', 5, 5];
					}
					if ($P.is_array(value) && value[0] == 'size_range') {
						$(_class, $(context)).attr('maxlength', value[2]);
						if($(_class, $(context)).length == 0) {
							return;
						}
						if ($(_class, $(context))[0].tagName == 'TEXTAREA') {
							return;
						}
						if (value[2] <=5) {
							$(_class, $(context)).addClass('small');
						} else if (value[2] > 5 && value[2] <= 10) {
							$(_class, $(context)).addClass('medium');
						} else if (value[2] > 10 && value[2] <= 20) {
							$(_class, $(context)).addClass('large');
						} else if (value[2] > 20) {
							$(_class, $(context)).addClass('extra-large');
						}
						return;
					}
					// Applying for each element
					$(_class, $(context)).each(function(key2, item){
						if (value == 'isInteger' || value == 'isPhone') {
							$(item).unbind('keyup').keyup(function() {
								var value = checkInteger($(item).val());
								if (value == "") {
									var regexp = new RegExp(/^(\d*)/);
									var result = regexp.exec($(_class).val());
									$(item).val(result[0]);
								} else {
									$(item).val(value);
								}
							});
							return;
						}
						if (value == 'isNumeric') {
							$(item).unbind('keyup').keyup(function() {
								var value = checkNumeric($(item).val());
								if (value == "") {
									$(item).val('');
									return false;
								} else {
									$(item).val(value);
								}
							});
							return;
						}
					});
				});
			});
		}

	  });
	
	}(jQuery) );
});
