var services = {
	paths : {
		guser: {
			loggedUser : '/loggedUser.json'
		}
	},
	_init : function() {
		for (key in this.paths) {
			var value = this.paths[key];
			for (sKey in value) {
				var sValue = value[sKey];
				this.services[sKey] = '/' + key + sValue;
			}
		}
	},
	/**
	 * Just to store services in their paths, don't delete
	 */
	services : {}
};
