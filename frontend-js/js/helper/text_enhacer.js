(function($){

	var TextEnhacer = function(element, options) {
	    this.$element = $(element);
	    this.options = options;
	    this.enabled = true;
	    this.init();
	};
	TextEnhacer.prototype = {
			init: function() {
				if (this.$element.attr('readonly') != 'readonly' && this.$element.attr('readonly') != true) {
					var widget = this;
					this.$element.unbind('click').click(function() {
						eventClick(widget.$element, widget.options);
					});
					setTwipsy(this.$element, this.options);
				}
			}		
	};

	var eventClick = function(element, options) {
		var content = element.val();
		var type_edit = true;
		if (content == '') {
			type_edit = false;
			content = element.html();
		}
		var div_container = $('div.text_enhacer');
		
		if (!(div_container == null || $P.empty(div_container) || div_container.length == 0)) {
			div_container.remove();
		}
			div_container = $('<div />');
			div_container.addClass('text_enhacer');
			$('body').append(div_container);
		//console.log('div_container', div_container);
		var data = {title: options.title, content: content};
		//console.log('render', element, div_container, data, options, type_edit);
		renderer(element, div_container, data, options, type_edit);
		
	};
	var renderer = function (element, container, data, options, type_edit) {
		
		var identifier = '#modal-text-enhacer';
		container.empty();
		container.render({
			paramData : data,
			view : '../../js/helper/views/text_enhacer.html',
			callback: function() {
					$('h3 span', $(identifier)).addClass("_" + options.title);
					$('h3 span', $(identifier)).html(_(options.title));
					$(identifier).modal({keyboard: true, backdrop: true});
					$(identifier).modal('show');
					$('.modal-footer .close', $(identifier)).css('opacity', 1);
					loadRichTextEditor($('.content', identifier), options);
					$('.content', identifier).focus();

					
					$(identifier).unbind('hidden').bind('hidden', function () {
				    	//console.log('unbind', $('.content', $(identifier)));
						var content = $('.content', $(identifier)).val();
						//console.log('type-edit', type_edit);
						if (type_edit) {
							element.val(content);
						} else {
							element.html(content);
						}
						setTwipsy(element, options);
						//console.log('removing rich t', $('.content', $(identifier)));
						removeRichTextEditor($('.content', $(identifier)), options);
						$(identifier).remove();
				    });
				}
		});
		
	};
	
	var setTwipsy = function(element, options) {
		if (options.twipsy) {
			var text = element.val();
			if (text == '') {
				element.twipsy('disable');
			} else {
				element.attr('rel', 'twipsy');
				element.attr('title', text);
				if (options.rich_text == true) {
					element.twipsy({html: true});
				} else {
					element.twipsy();
				}
			}
		}
	};

	var loadRichTextEditor = function(element, options) {
/*
		if (options.rich_text == true) {
			console.log(element, options, element.html());
//			tinyMCE.init(options.rich_text_options);
			console.log(typeof tinyMCE);
			if (typeof tinyMCE != 'undefined') {
				tinyMCE.execCommand('mceAddControl', true, 'text_enhacer');
			} else {
				element.tinymce(options.rich_text_options);
			}
//			tinyMCE.execCommand('mceAddControl', false, 'text_enhacer');
		};
		*/
	};

	var removeRichTextEditor = function(element, options) {
		/*
		if (options.rich_text == true) {
			console.log(element, options, element.html());
//	        element.tinymce().remove();
			$.each(tinyMCE['editors'], function(key, editor) {
				if (editor.id == 'text_enhacer') {
					console.log('destroy', key);
					tinyMCE.execCommand('mceRemoveControl', false, editor.id);
					console.log('destroy1', key);
//					editor.remove();
					console.log('destroy2', key);
					editor.destroy();
				}
			});
//			tinyMCE.execCommand('mceRemoveControl', false, 'text_enhacer');
//			var identifier = '#modal-text-enhacer';
//	        $('.mceEditor', $(identifier)).remove();
		};
		*/
	};

	$.fn.text_enhacer = function(options, args) {
		$.fn.text_enhacer.initWith.call(this, options, TextEnhacer, 'text_enhacer', args);
		return this;
	};
	  
	$.fn.text_enhacer.initWith = function (options, Constructor, name, args) {
		    if (options === true) {
		        return this.data(name);
		      } else if (typeof options == 'string') {
		    	text_enhacer = this.data(name);
		        if (text_enhacer) {
		        	text_enhacer[options](args);
		        }

		        return this;
		      }

		    options = $.extend({}, $.fn[name].defaults, options);

		    function get(ele) {
		        var text_enhacer = $.data(ele, name);
		        text_enhacer = new Constructor(ele, $.fn[name].elementOptions(ele, options));
				$.data(ele, name, text_enhacer);
		        return text_enhacer;
		      }
		    if (!options.live) {
		        this.each(function() {
		          get(this);
		        });
		    }
		    return this;
	    
	  };

	  $.fn.text_enhacer.TextEnhacer = TextEnhacer;
	  $.fn.text_enhacer.defaults = {
			  title: '',
			  //rich_text: false,
			  rich_text_options: {
					// Location of TinyMCE script
					script_url : '../../js/libs/tinymce/jscripts/tiny_mce/tiny_mce.js',
					// General options
					theme : "advanced",
					theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,cut,copy,paste,pastetext,pasteword,|,bullist,numlist",
					theme_advanced_buttons2 : "",
					theme_advanced_buttons3 : "",
					theme_advanced_buttons4 : "",
					theme_advanced_toolbar_location : "top",
					theme_advanced_toolbar_align : "left",
					theme_advanced_resizing : false
	  			},
			  twipsy: false
	  };
	  
	  $.fn.text_enhacer.elementOptions = function(ele, options) {
		    return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
	  };

	})(jQuery);




