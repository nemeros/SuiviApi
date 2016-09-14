(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .factory('logBackEndService', logBackEndService);
	
	logBackEndService.$inject = ['$injector'];
	
	function logBackEndService($injector){
		var config = {
				headers: {
					'Content-type': 'text/plain'
				}
		};
		
		var service = {
				logError : logError
		};
		
		return service;
				
		function logError(msg){
			//manual inject to avoid circle dependencies in exceptionHandling module
			var $http = $injector.get('$http');
			
			return $http.put("api/tech/logError", msg, config);
		}
	}
	
})();