(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .factory('apimcService', apimcService);
	
	apimcService.$inject = ['$http', '$q', 'logger'];
	
	/**
	 * Service providing access to api/apimc/ resources
	 * @param $log
	 * @param $http
	 * @returns
	 */
	function apimcService($http, $q, logger){

		var baseUri = "api/apimc/";
		
		var service = {
			getLatest : getLatest,
			getApimc : getApimc,
			getListVersion : getListVersion,
			getListDependantRessc : getListDependantRessc,
			getSwagger : getSwagger,
			search : search,
			save: save,
			getListEnv: getListEnv
		};
		
		return service;

		
		
		///////////////
		
		function getLatest(){
			return $http.get(baseUri + "latest").then(successCallback, errorCallback);
		}
		
		function getApimc(apimcId){
			return $http.get(baseUri + apimcId).then(successCallback, errorCallback);
		}
		
		function getListVersion(apimcId){
			return $http.get(baseUri + apimcId + "/versions").then(successCallback, errorCallback);
		}
		
		function getListDependantRessc(apimcId){
			return $http.get(baseUri + apimcId + "/ressources").then(successCallback, errorCallback);
		}
		
		function getSwagger(apimcId){
			return $http.get(baseUri + apimcId + "/swagger").then(successCallback, errorCallback);
		}
		
		function search(searchParams){
			return $http.post(baseUri, searchParams).then(successCallback, errorCallback);
		}
		
		function save(apimcPatch){
			return $http.patch(baseUri + apimcPatch.id, apimcPatch).then(successCallback, errorCallback);
		}
		
		function getListEnv(apimcId){
			return $http.get(baseUri + apimcId + "/environnements").then(successCallback, errorCallback);
		}
		
		
		// Generic callback
		function successCallback(response){
			return response.data;
		}
		
		function errorCallback(response){
			logger.error("Erreur survenue lors de l'appel du service distant apimcService", angular.toJson(response), "Erreur technique");
			//Wrapping the rejected response to the upper level
			return $q.reject(response);
		}
	}
})();