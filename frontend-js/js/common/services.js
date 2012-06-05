var services = {
	paths : {
		guser: {
			loggedUser : '/loggedUser.json',
			userByUserId: '/search/userByUserId/',
			usersByName: '/search/usersByName/',
			usersByLegalId: '/search/usersByLegalId/',
			usersByNameForRegistration: '/search/usersByNameForRegistration/',

			registerStaffPersonalData: '/registration/registerStaffPersonalData',
			registerStaffUserAddress: '/registration/registerStaffUserAddress',
			registerStaffAcademicQualifications: '/registration/registerStaffAcademicQualifications',
			registerStaffWorkData: '/registration/registerStaffWorkData',
			registerStaffCompensationData: '/registration/registerStaffCompensationData',
			registerStaffInfrastructureData: '/registration/registerStaffInfrastructureData',
			registerStaffDesktopData: '/registration/registerStaffDesktopData',
			registerStaffGespacioData: '/registration/registerStaffGespacioData',
			registerStaffOperationsData: '/registration/registerStaffOperacionesData',

			getWorkDataListBox: '/workData/getListBox',

			getPendingUsersForCompensacion:'/pending/getPendingUsersForCompensacion/',
			getPendingUsersForBeca: '/pending/getPendingUsersForBeca/',
			getPendingUsersForBC: '/pending/getPendingUsersForBC/',
			getPendingUsersForLeader: '/pending/getPendingUsersForLeader/',
			getPendingUsersForDesktop: '/pending/getPendingUsersForDesktop/',
			getPendingUsersForGespacio: '/pending/getPendingUsersForGespacio/',
			getPendingUsersForOperacion: '/pending/getPendingUsersForOperacion/',

			getWorkDataListBox: '/workData/getListBox',
			getWorkBuildingList: '/workBuilding/getWorkBuildingsByCode/',
			searchInitiatives: '/search/searchInitiatives/',
				
			getUserAddress: '/registration/getUserAddress/',
			getRegistration: '/pending/getRegistration/',
			getAcademicQualifications: '/registration/getAcademicQualifications/', 
			getWorkData: '/registration/getWorkData/',
			getCompensation: '/registration/getCompensation/',
			getInfrastructure: '/registration/getInfrastructure/',

			getDesktopDataByUserId: '/pending/desktopInfo/',
			getGespacioDataByUserId: '/pending/gespacioInfo/',
			getOperacionesDataByUserId: '/pending/operacionesInfo/',

			leave_getLeaveData: '/leave/getLeaveData/',
			setLeaveData: '/leave/setLeaveData',

			reincorporation_getLeaveData: '/reincorporation/getLeaveData/',
			loadData : '/reincorporation/loadData/',
				
			getModificationData: '/modification/getData/',
			searchCompanies: '/search/searchCompanies/',
			searchCcc: '/search/searchCcc/',
			searchCountries: '/country/search/',
			getUserSearchByName: '/personal/search/',
			getPersonalDataListBox: '/personalData/getListBox/'
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
