(function(){
	'use strict';
	
	angular.module('suiviApiApp')
		.config(function ($stateProvider){
			$stateProvider.state('apimc',{
				parent: 'abstractHome',
	            url: '/apimc',
	            views: {
	                'content@': {
	                    templateUrl: 'scripts/app/apimc/apimc.html',
	                    controller: 'apimcController as apimcVm'
	                }
	            }
			});
		});
})();