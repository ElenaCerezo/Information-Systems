function init() {
	http_request.loggedUser(function(data){
		store.set('loggedUser', data.userVO);
		$('.navbar-fixed-top .container').render({
			view: 'views/main.html',
		});
		$('.tab-content').render({
			view: 'views/prove.html',
			pre_callback: function(data){
				data.cities.push({name: 'name4', key:'key4'});
				return data;
			},
			data: {
				sLabel : 'CONVERSATIONS',
				sKey: '86072',
				cities :[ 
					{name: 'name1', key:'key1'},
					{name: 'name2', key:'key2'},
					{name: 'name3', key:'key3'}
				],
				city: 'key1',
				countries:[{
					country : 'spain',
					cities :[ 
						{name: 'name1', key:'key1'},
						{name: 'name2', key:'key2'},
						{name: 'name3', key:'key3'}
					],
					city: 'key2'
					},{
					country : 'france',
					cities :[ 
						{name: 'name1', key:'key1'},
						{name: 'name2', key:'key2'},
						{name: 'name3', key:'key3'}
					],
					city: 'key3'
					}
				]
			},
			callback: function(){
				var data2 = { pp : 'asd'};
				//$('select:first-child').val('key2');
				//$('.countries select:last-child').val('key3');
				$('.tab-content').validator({
					data: {
						'.name' : ['isNumeric', ['size_range',1,5]],
						'.sLabel' : ['autocomplete']
					}
				});
				data2 = $('.tab-content').render('composeData', { 
					data : data2,
					skipList : ['ui-autocomplete-input', 'row']
				});
				$('.selector').selfAutocomplete({
					service: 'searchInitiatives',
					accesor: ['initiativeSearchVO', 'initiativeList'],
					label : 'act_descr_corta',
					key: 'act_cd_actividad',
					pathLabel :'.sLabel', 
					pathKey: '.sKey',
					prefixStore: 'prove'
				});
				console.log(data2);
			}
		});
	});
}
