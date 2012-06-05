(function($){
	var DESC = false;
	var ASC = true;

	var Pager = function(element, options) {
	    this.$element = $(element);
	    this.options = options;
	    this.enabled = true;
	    this.init();
	};
	Pager.prototype = {
			init: function() {
				if ($P.empty(this.options.data)) {
					this.options.data = store.get(this.options.prefix);
				} else {
					store.set(this.options.prefix, this.options.data);
				}
				var pageFilter = store.get('pager_' + this.options.prefix);
				if ($P.empty(pageFilter)) {
					store.set('pager_' + this.options.prefix, 
								{
									show_page: this.options.show_page, 
									view: this.options.view, 
									container: this.options.container, 
									callback: this.options.callback, 
									prefix: this.options.prefix, 
									accesor: this.options.accesor, 
									data: this.options.data, 
									sort: this.options.sort
								}
					);
				};
				var pages = this._getPages(this.options.data, this.options.accesor);
				var page = this._getPage(this.options.data, this.options.show_page, this.options.accesor, this.options.sort);
				var pagesArray = [];
				if (pages > 5) {
					if (this.options.show_page == 1 || this.options.show_page == 2) {
						pagesArray.push({page: 1});
						pagesArray.push({page: 2});
						pagesArray.push({page: 3});
						pagesArray.push({page: '...'});
						pagesArray.push({page: pages});
					} else if (this.options.show_page == pages || this.options.show_page == (pages - 1)) {
						pagesArray.push({page: 1});
						pagesArray.push({page: '...'});
						pagesArray.push({page: (pages - 2)});
						pagesArray.push({page: (pages -1)});
						pagesArray.push({page: pages});
					} else {
						pagesArray.push({page: 1});
						pagesArray.push({page: '...'});
						pagesArray.push({page: (this.options.show_page - 1)});
						pagesArray.push({page: (this.options.show_page)});
						pagesArray.push({page: (parseInt(this.options.show_page) + 1)});
						pagesArray.push({page: '...'});
						pagesArray.push({page: pages});
					}
				} else {
					for (var i = 1; i <= pages; i++) {
						pagesArray.push({page: i});
					}
				}
				page['pages'] = pagesArray;
				var widget = this;
				var pager_callback = function() {
					widget.options.callback();
					$('.pagination .page', widget.$element).click(function(eventData) {
						var show_page = $(eventData.currentTarget).attr('id');
						if (!isNaN(show_page)) {
							widget.options.show_page = show_page;
							widget.init();
						}
						return false;
					});
					$('.pagination li#' + widget.options.show_page, widget.$element).addClass('active');
					$(".sort", widget.$element).click(function(eventData) {
						widget.options.sort = $(eventData.currentTarget).attr('class');
						widget.init();
					});
					var sortInfo = getSortInfo(widget.options.sort);
					if (sortInfo.sortTerm != '') {
						if (sortInfo.direction == 'ASC') {
							$('.' + sortInfo.sortTerm).addClass('DESC');
							$('.' + sortInfo.sortTerm + ' .ui-icon').removeClass('ui-icon-carat-2-n-s').addClass('ui-icon-carat-1-s');
						} else {
							$('.' + sortInfo.sortTerm).addClass('ASC');
							$('.' + sortInfo.sortTerm + ' .ui-icon').removeClass('ui-icon-carat-2-n-s').addClass('ui-icon-carat-1-n');
						}
					}
					setLanguage(store.get('language'));
				};
				$(this.$element).render({
					view: this.options.view, 
					data: page,
					callback: pager_callback
				});
				
			},
			pager_filter: function(args) {//(prefix, filter, field) {
				var params = store.getCloned('pager_' + this.options.prefix);
				var lastFilter = store.get(this.options.prefix + '_lastFilter');
				if (lastFilter == args.filter) {
					return;
				} else {
					store.set(this.options.prefix + '_lastFilter', args.filter);
				}
				if (args.filter == '') {
					this.options.data = params.data;
				} else {
					this.options.data = _filter_data(params.data, args.filter, args.field, params.accesor);
				}
				this.init();
			},
			_getPages: function (data, accesor) {
				data = getDataFromAccesor(data, accesor);
				var length = data.length;
				return Math.ceil(length / this.options.pageLimit);
			},
			_getPage: function(_data, page, accesor, sort) {
				var data = getDataFromAccesor(_data, accesor);
				if (sort != '') {
					var sortInfo = getSortInfo(sort);
					var direction = sortInfo.direction == 'ASC' ? true : false;
					data = sortData(data, sortInfo.sortTerm, direction);
				}
				limitLow = ((page - 1) * this.options.pageLimit) + 1;
				limitHigh = page * this.options.pageLimit;
				var item = 1;
				var returnInfo = [];
				$.each(data, function(key, value) {
					if (item > limitHigh) {
						return;
					}
					if (limitLow <= item && item <= limitHigh) {
						returnInfo.push(value);
					}
					item++;
				});
				data = setDataToAccesor(returnInfo, accesor);
				return data;
			}
			
	};
	
	
	var getDataFromAccesor = function(data, accesor) {
		$.each(accesor, function(key, value){
			if (value in data) {
				data = data[value];
			} else {
				return {};
			}
		});
		return data;
	};

	var setDataToAccesor = function(data, accesor) {
		var length = accesor.length - 1;
		for (var i = length; i >=0; i--) {
			var tmp = {};
			tmp[accesor[i]] = data;
			data = tmp;
		}
		return data;
	};
	var getSortInfo = function(sort) {
		var classList = sort.split(/\s+/);
		var sortTerm = '';
		var direction = 'ASC';
		$.each(classList, function(key, value) {
			if (value != 'sort' && value != 'ASC' && value != 'DESC') {
				sortTerm = value;
			}
			if (value != 'sort' && (value == 'ASC' || value == 'DESC')) {
				direction = value;
			}
		});
		return {sortTerm: sortTerm, direction: direction};
	};


	var _filter_data = function(data, filter, field, accesor) {
		data = getDataFromAccesor(data, accesor);
		var returnInfo = [];
		$(data).each(function(key, value) {
			if ($P.strripos(value[field], filter) !== false) {
				returnInfo.push(value);
			}
		});
		return setDataToAccesor(returnInfo, accesor);
	};


	var sortData = function(data, field, orientation) {
		var sortTerm = field.split(/-/);
		var swapped;
		do {
			swapped = false;
			for (var i=0; i < data.length-1; i++) {
				var switch_fields = false;
				var f = data[i];
				var c = data[i+1];
				$.each(sortTerm, function(key, value) {
					f = f[value];
					c = c[value];
				});
				if (orientation) {
					if (f > c) {
						switch_fields = true;
					}
				} else {
					if (f < c) {
						switch_fields = true;
					}
				}
				if (switch_fields) {
					var temp = data[i];
					data[i] = data[i+1];
					data[i+1] = temp;
					swapped = true;
				}
			}
		} while (swapped);
		return data;
	};
	  $.fn.pager = function(options, args) {
			$.fn.pager.initWith.call(this, options, Pager, 'pager', args);
			return this;
	  };
	  
	  $.fn.pager.initWith = function (options, Constructor, name, args) {
		    if (options === true) {
		        return this.data(name);
		      } else if (typeof options == 'string') {
		        pager = this.data(name);
		        if (pager) {
		          pager[options](args);
		        }

		        return this;
		      }

		    options = $.extend({}, $.fn[name].defaults, options);

		    function get(ele) {
		        var pager = $.data(ele, name);
				pager = new Constructor(ele, $.fn[name].elementOptions(ele, options));
				$.data(ele, name, pager);
		        return pager;
		      }

		    if (!options.live) {
		        this.each(function() {
		          get(this);
		        });
		    }
		    return this;
	    
	  };

	  $.fn.pager.Pager = Pager;
	  $.fn.pager.defaults = {
			  pageLimit: 10,
			  show_page: 1, 
			  view: '', 
			  callback: function() {}, 
			  prefix: 'pager', 
			  accesor: [], 
			  data: {}, 
			  sort: ''
			  };
	  
	  $.fn.pager.elementOptions = function(ele, options) {
		    return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
	  };

	})(jQuery);




