(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .factory('searchFilterService', searchFilterService);
	
	searchFilterService.$inject = [];
	
	/**
	 * Service providing cache for search parameters
	 * 
	 * @param $log
	 * @returns
	 */
	function searchFilterService(){

		var searchApicParam = {};
		var searchRessParam = {};
		
		var service = {
			getApicParam : getApicParam,
			setApicParam : setApicParam,
			
			getResscParam : getResscParam,
			setResscParam : setResscParam,
			
			isEmpty : isEmpty
		};
		
		return service;
			
		
		///////////////		
		function getApicParam(){
			return searchApicParam;
		}
		
		function setApicParam(searchParam){
			searchApicParam = searchParam;
		}
		
		function getResscParam(){
			return searchRessParam;
		}
		
		function setResscParam(searchParam){
			searchRessParam = searchParam;
		}
		
		function isEmpty(obj){
			for(var key in obj) {
				if(obj.hasOwnProperty(key)){
					return false;
				}
			}
			return true;
		}
		
	}
})();