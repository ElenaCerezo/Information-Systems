var datasource = {
		convert: function(data, ds) {
			$.each(data, function(key, value) {
				if (typeof value == 'object') {
					if ($P.array_key_exists(key, ds)) {
						var r = this.convert(value, ds[key]);
						data[ds[key]._name] = this.convert(value, ds[key]);
						if (ds[key]._name != key) {
							delete(data[key]);
						}
					} else {
						// nothing to do here
						data[key] = value;
					}
					return data;
				}
				if ($P.array_key_exists(key, ds)) {
					data[ds[key]] = value;
					delete(data[key]);
				} else {
					data[key] = value;
				}
			}.bind(this));

			return data;
		}
};