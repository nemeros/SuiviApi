(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .factory('environnementService', environnementService);
	
	environnementService.$inject = ['$http', '$q', '$cacheFactory', 'logger'];
	
	/**
	 * Service providing access to api/apimc/ resources
	 * @param $log
	 * @param $http
	 * @returns
	 */
	function environnementService($http, $q, $cacheFactory, logger){

		var baseUri = "api/env/";
		
		var service = {
			searchEnv : searchEnv,
			listEnv : listEnv
		};
		
		return service;

		///////////////
		
		function searchEnv(searchEnvParams){
			return $http.post(baseUri, searchEnvParams).then(successCallback, errorCallback);
		}
		
		function listEnv(){
			var cache = $cacheFactory.get("listEnvCache");
			
			if(angular.isUndefined(cache)){
				
				return $http.get(baseUri).then(
					function cacheCallback(response){
						//creating a new cache object to store the result
						$cacheFactory("listEnvCache").put("list", response.data);
						return response.data;
				}, errorCallback);
			}else{
				// returning a promise with the content of the cache
				var defer = $q.defer();
				defer.resolve(cache.get("list"));
				return defer.promise;
			}
			
			return $http.get(baseUri).then(successCallback, errorCallback);
		}
		
		// Generic callback
		function successCallback(response){
			return response.data;
		}
		
		function errorCallback(response){
			logger.error("Erreur survenue lors de l'appel du service distant environnementService", angular.toJson(response), "Erreur technique");
			//Wrapping the rejected response to the upper level
			return $q.reject(response);
		}
	}
})();