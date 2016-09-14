(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .factory('logger', logger);
	
	logger.$inject = ['$log', 'toastr', 'logBackEndService'];
	
	function logger($log, toastr, logBackEndService){
				
		var service = {
				error: error,
				warning: warning,
				info: info,
				success: success,
				
				log: $log.log
		};
		
		return service;
		
		////////////
		function error(message, data, title){
			toastr.error(message, title);
			$log.error(message + " / " + data);
			
			logBackEndService.logError("{\"message\":\"" + message + "\",\"data\": " + data +  " }").then(
				function successCallback(response){
					//nothing to do
				},
				function errorCallback(response){
					// if all fails ...
					$log.error("logBackEndService error : " + angular.toJson(response));
				}
			);
		}
		
		function warning(message, data, title){
			toastr.warning(message, title);
		}
		
		function info(message, data, title){
			toastr.info(message, title);
			$log.info(data);
		}
		
		function success(message, data, title){
			toastr.success(message, title);
		}
	}
	
})();