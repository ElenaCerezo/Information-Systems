var http_request = {
	log: false,
	loggedUser: function(callback) {
		$.ajax({
			url: services.services.loggedUser,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	userByUserId: function(number, limit, callback){
		$.ajax({
			url: services.services.userByUserId
				+ $P.sprintf('?userId=%s', number, limit),
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	usersByName: function(string, limit, callback){
		$.ajax({
			url: services.services.usersByName
				+ $P.sprintf('?name=%s&limit=%s', string, limit),
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	usersByLegalId : function(string, limit, callback){
		$.ajax({
			url: services.services.usersByLegalId
				+ $P.sprintf('?legalId=%s&limit=%s', string, limit),
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	usersByNameForRegistration: function(name, familyName1, familyName2, type, callback) {
		$.ajax({
			url: services.services.usersByNameForRegistration + type
				+ $P.sprintf('?name=%s&familyName1=%s&familyName2=%s',
						name, familyName1, familyName2),
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	registerStaffPersonalData: function(data, callback, error) {
		$.ajax({
			url: services.services.registerStaffPersonalData,
			dataType: 'json',
			type: 'POST',
			async: false,
			cache: false,
			timeout: 30000,
			data: jsonStringify(data),
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	                error();
	        },
	        success: function (data) {
	        	setData(data);
	        	callback(data);
	        }
		});
	},
	registerStaffUserAddress: function(data, callback, error) {
		$.ajax({
			url: services.services.registerStaffUserAddress,
			dataType: 'json',
			type: 'POST',
			async: false,
			cache: false,
			timeout: 30000,
			data: jsonStringify(data),
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	                error();
	        },
	        success: function (data) {
	        	setData(data);
	        	callback(data);
	        }
		});
	},
	registerStaffAcademicQualifications: function(data, callback, error) {
		$.ajax({
			url: services.services.registerStaffAcademicQualifications,
			dataType: 'json',
			type: 'POST',
			async: false,
			cache: false,
			timeout: 30000,
			data: jsonStringify(data),
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	                error();
	        },
	        success: function (data) {
	        	setData(data);
	            callback(data);
	        }
		});
	},
	registerStaffWorkData: function(data, callback, error) {
		$.ajax({
			url: services.services.registerStaffWorkData,
			dataType: 'json',
			type: 'POST',
			async: false,
			cache: false,
			timeout: 30000,
			data: jsonStringify(data),
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	                error();
	        },
	        success: function (data) {
	        	setData(data);
	            callback(data);
	        }
		});
	},
	registerStaffCompensationData: function(data, callback, error) {
		$.ajax({
			url: services.services.registerStaffCompensationData,
			dataType: 'json',
			type: 'POST',
			async: false,
			cache: false,
			timeout: 30000,
			data: jsonStringify(data),
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	            defaultErrorHandler(jsonerror);
	            error();
	        },
	        success: function (data) {
	        	setData(data);
	            callback(data);
	        }
		});
	},
	registerStaffInfrastructureData: function(data, changeState, callback, error) {
		$.ajax({
			url: services.services.registerStaffInfrastructureData + '?changeState=' + changeState,
			dataType: 'json',
			type: 'POST',
			async: false,
			cache: false,
			timeout: 30000,
			data: jsonStringify(data),
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	                error();
	        },
	        success: function (data) {
	        	setData(data);
	            callback(data);
	        }
		});
	},
	registerStaffDesktopData: function(data, callback, stopLoading) {
		$.ajax({
			url: services.services.registerStaffDesktopData,
			dataType: 'json',
			type: 'POST',
			async: false,
			cache: false,
			timeout: 30000,
			data: jsonStringify(data),
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	                stopLoading();
	        },
	        success: function (data) {
	                callback(data);
	                stopLoading();
	        }
		});
	},
	registerStaffGespacioData: function(data, callback, stopLoading) {
		$.ajax({
			url: services.services.registerStaffGespacioData,
			dataType: 'json',
			type: 'POST',
			async: false,
			cache: false,
			timeout: 30000,
			data: jsonStringify(data),
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	                stopLoading();
	        },
	        success: function (data) {
	                callback(data);
	                stopLoading();
	        }
		});
	},
	registerStaffOperationsData: function(data, callback, stopLoading) {
		$.ajax({
			url: services.services.registerStaffOperationsData,
			dataType: 'json',
			type: 'POST',
			async: false,
			cache: false,
			timeout: 30000,
			data: jsonStringify(data),
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	                stopLoading();
	        },
	        success: function (data) {
	                callback(data);
	                stopLoading();
	        }
		});
	},
	getWorkDataListBox: function(callback) {
		$.ajax({
			url: services.services.getWorkDataListBox,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	getPendingUsersForCompensacion: function(callback){
		$.ajax({
			url: services.services.getPendingUsersForCompensacion,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});	
	},
	getPendingUsersForBeca: function(callback){
		$.ajax({
			url: services.services.getPendingUsersForBeca,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	getPendingUsersForBC: function(callback){
		$.ajax({
			url: services.services.getPendingUsersForBC,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	getPendingUsersForLeader: function(callback){
		$.ajax({
			url: services.services.getPendingUsersForLeader,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	getPendingUsersForDesktop: function(callback){
		$.ajax({
			url: services.services.getPendingUsersForDesktop,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	getPendingUsersForGespacio: function(callback){
		$.ajax({
			url: services.services.getPendingUsersForGespacio,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	getPendingUsersForOperacion: function(callback){
		$.ajax({
			url: services.services.getPendingUsersForOperacion,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	getWorkBuildingList: function(center_id, callback) {
		$.ajax({
			url: services.services.getWorkBuildingList + center_id,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	searchInitiatives: function(search_string, limit, callback) {
		$.ajax({
			url: services.services.searchInitiatives + "?limit=" + limit,
			dataType: 'json',
			type: 'POST',
			async: false,
			cache: false,
			timeout: 30000,
			data: search_string,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	getUserAddress: function(user_id, callback) {
		$.ajax({
			url: services.services.getUserAddress + user_id,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	getDesktopDataByUserId: function(user_id, callback) {
		$.ajax({
			url: services.services.getDesktopDataByUserId + 
			$P.sprintf("?userId=%d",user_id),
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});	
	},
	getGespacioDataByUserId: function(user_id, callback) {
		$.ajax({
			url: services.services.getGespacioDataByUserId + 
			$P.sprintf("?userId=%d",user_id),
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});	
	},
	getOperacionesDataByUserId: function(user_id, callback) {
		$.ajax({
			url: services.services.getOperacionesDataByUserId + 
			$P.sprintf("?userId=%d",user_id),
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});	
	},
	getRegistration: function(user_id, callback) {
		$.ajax({
			url: services.services.getRegistration + user_id,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	        	setData(data);
	        	callback(data);
	        }
		});
	},
	getAcademicQualifications: function(user_id, callback) {
		$.ajax({
			url: services.services.getAcademicQualifications + user_id,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	getWorkData: function(user_id, callback) {
		$.ajax({
			url: services.services.getWorkData + user_id,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	getCompensation: function(user_id, callback) {
		$.ajax({
			url: services.services.getCompensation + user_id,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	getInfrastructure: function(user_id, callback) {
		$.ajax({
			url: services.services.getInfrastructure + user_id,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	leave_getLeaveData: function(user_id, callback) {
		$.ajax({
			url: services.services.leave_getLeaveData + user_id,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	setLeaveData: function(data, callback) {
		$.ajax({
			url: services.services.setLeaveData,
			dataType: 'json',
			type: 'POST',
			async: false,
			cache: false,
			timeout: 30000,
			data : jsonStringify(data),
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	reincorporation_getLeaveData: function(user_id, callback) {
		$.ajax({
			url: services.services.reincorporation_getLeaveData + user_id,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	loadData: function(data, callback) {
		$.ajax({
			url: services.services.loadData,
			dataType: 'json',
			type: 'POST',
			async: false,
			cache: false,
			timeout: 30000,
			data : jsonStringify(data),
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
	                defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	                callback(data);
	        }
		});
	},
	getModificationData: function(user_id, callback) {
		$.ajax({
			url: services.services.getModificationData + '?userId=' + user_id,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
				defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	        	callback(data);
	        }
		});
	},
	searchCompanies: function(name, limit, callback) {
		$.ajax({
			url: services.services.searchCompanies + '?limit=' + limit,
			dataType: 'json',
			type: 'POST',
			async: false,
			cache: false,
			timeout: 30000,
			data: name,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
				defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	        	callback(data);
	        }
		});
	},
	searchCcc: function(name, limit, callback) {
		$.ajax({
			url: services.services.searchCcc + '?limit=' + limit + '&ccc=' + name,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
				defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	        	callback(data);
	        }
		});
	},
	searchCountries: function(name, limit, callback) {
		$.ajax({
			url: services.services.searchCountries + '?limit=' + limit + '&name=' + name,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
				defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	        	callback(data);
	        }
		});
	},
	getPersonalDataListBox: function(callback) {
		$.ajax({
			url: services.services.getPersonalDataListBox,
			dataType: 'json',
			type: 'GET',
			async: false,
			cache: false,
			timeout: 30000,
			contentType: 'application/json;charset=UTF-8',
			error: function (jsonerror) {
				defaultErrorHandler(jsonerror);
	        },
	        success: function (data) {
	        	callback(data);
	        }
		});
	},
    getUserSearchByName: function(name, limit, callback) {
        var result;
        $.ajax({
                url: services.services.getUserSearchByName
                        + "?filter=TID"
                        + "&limit=" + limit
                        + "&actualEmployee=Y",
                contentType: 'text/plain',
                type: 'POST',
                async: false,
                cache: false,
                timeout: 30000,
                data: name,
                error: function (jsonerror) {
                        var service_i18n = {
                                es: {
                                        si_10: 'El término de búsqueda no es correcto o es incompleto.'
                                },
                                en: {
                                        si_10: 'Incorrect or incomplete search term.'
                                }

                        };
                        defaultErrorHandler(jsonerror, service_i18n);
                },
                success: function (data) {
                        callback(data);
                }
        });
	}

};


var setData = function(data) {
	if ('userAddressVO' in data) {
		store.set('new_user', data.userAddressVO);
	} else if ('workDataVO' in data) {
		store.set('new_user', data.workDataVO);
	} else if ('academicQualificationsVO' in data) {
		store.set('new_user', data.academicQualificationsVO);
	} else if ('compensationVO' in data) {
		store.set('new_user', data.compensationVO);
	} else if ('infrastructureVO' in data) {
		store.set('new_user', data.infrastructureVO);
	} else if ('personalDataVO' in data) {
		store.set('new_user', data.personalDataVO);
	} else if ('userVO' in data) {
		store.set('new_user', {userId: data.userVO});
	}
}
