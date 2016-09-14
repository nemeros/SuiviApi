(function(){
	'use strict';
	
	angular.module('suiviApiApp')
		.config(exceptionConfig);
	
	
	exceptionConfig.$inject = ['$provide'];
	
	function exceptionConfig($provide){
		$provide.decorator('$exceptionHandler', extendExceptionHandler);
	}
	
	extendExceptionHandler.$inject = ['$delegate', 'logger', 'logBackEndService'];
	
	function extendExceptionHandler($delegate, logger, logBackEndService) {
	    return function(exception, cause) {
	        $delegate(exception, cause);
	        var errorData = {
	            file: exception.fileName,
	            line: exception.lineNumber,
	            message: exception.message,
	            cause: cause
	        };
	        /**
	         * Could add the error to a service's collection,
	         * add errors to $rootScope, log errors to remote web server,
	         * or log locally. Or throw hard. It is entirely up to you.
	         * throw exception;
	         */	        
	        logger.error(errorData.message, angular.toJson(errorData), 'Generic Error : ');
	    };
	}
	
})();