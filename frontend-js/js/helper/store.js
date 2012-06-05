var store ={ 
	_store: {},
	get: function(key) {
		if (key in this._store) {
			return this._store[key];
		}
		return null;
	},
	set: function(key, value) {
		this._store[key] = value;
	},
	log: function() {
		console.log(_store);
	},
	getCloned: function(key) {
		return $.extend(true, {}, this.get(key));
	}
};
