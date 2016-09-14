(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .factory('requeteService', requeteService);
	
	requeteService.$inject = ['$http', '$q', 'logger'];
	
	/**
	 * Service providing access to api/apimc/ resources
	 * @param $log
	 * @param $http
	 * @returns
	 */
	function requeteService($http, $q, logger){

		var baseUri = "api/requete/";
		
		var service = {
			searchPath : searchPath
		};
		
		return service;

		
		
		///////////////
		
		function searchPath(path){
			return $http.get(baseUri, {params : {path: path}}).then(successCallback, errorCallback);
		}
		
		
		// Generic callback
		function successCallback(response){
			return response.data;
		}
		
		function errorCallback(response){
			logger.error("Erreur survenue lors de l'appel du service distant requeteService", angular.toJson(response), "Erreur technique");
			//Wrapping the rejected response to the upper level
			return $q.reject(response);
		}
	}
})();