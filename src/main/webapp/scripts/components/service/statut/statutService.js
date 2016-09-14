(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .factory('statutService', statutService);
	
	statutService.$inject = ['$http', '$q', '$cacheFactory', 'logger'];
	
	/**
	 * Service providing acces to api/statut resources
	 * 
	 * @param $http
	 * @returns
	 */
	function statutService($http, $q, $cacheFactory, logger){
		var baseUri = "api/statut/";
		
		var service = {
			getStatut : getStatut
		};
		
		return service;
		
		///////////////
		
		function getStatut(){
			var cache = $cacheFactory.get("listStatutCache");
			
			if(angular.isUndefined(cache)){
				return $http.get(baseUri).then(
					function cacheCallback(response){
						//creating a new cache object to store the result
						$cacheFactory("listStatutCache").put("list", response.data);
						return response.data;
					}, 
					errorCallback);
			}
			else{
				// returning a promise with the content of the cache
				var defer = $q.defer();
				defer.resolve(cache.get("list"));
				return defer.promise;
			}			
		}

		// Generic callback
		function successCallback(response){
			return response.data;
		}
		
		function errorCallback(response){
			logger.error("Erreur survenue lors de l'appel du service distant resscService", angular.toJson(response), "Erreur technique");
			return $q.reject(response);
		}
	}
})();