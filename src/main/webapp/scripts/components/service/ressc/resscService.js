(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .factory('resscService', resscService);
	
	resscService.$inject = ['$http', '$q', 'logger'];
	
	/**
	 * Service providing acces to api/ressc resources
	 * 
	 * @param $http
	 * @returns
	 */
	function resscService($http, $q, logger){
		var baseUri = "api/ressc/";
		
		var service = {
			getLatest : getLatest,
			getRessc : getRessc,
			getListVersion : getListVersion,
			getListDependantApimc : getListDependantApimc,
			getSwagger : getSwagger,
			getRequestPath: getRequestPath,
			search: search,
			save: save
		};
		
		return service;
		
		///////////////
		
		function getLatest(){
			return $http.get(baseUri + "latest").then(successCallback, errorCallback);
		}
		
		function getRessc(resscId){
			return $http.get(baseUri + resscId).then(successCallback, errorCallback);
		}
		
		function getListVersion(resscId){
			return $http.get(baseUri + resscId + "/versions").then(successCallback, errorCallback);
		}
		
		function getListDependantApimc(resscId){
			return $http.get(baseUri + resscId + "/ressources").then(successCallback, errorCallback);
		}
		
		function getSwagger(resscId){
			return $http.get(baseUri + resscId + "/swagger").then(successCallback, errorCallback);
		}
		
		function getRequestPath(resscId){
			return $http.get(baseUri + resscId + "/paths").then(successCallback, errorCallback);
		}
		
		function search(searchParams){
			return $http.post(baseUri, searchParams).then(successCallback, errorCallback);
		}
		
		function save(resscPatch){
			return $http.patch(baseUri + resscPatch.id, resscPatch).then(successCallback, errorCallback);
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