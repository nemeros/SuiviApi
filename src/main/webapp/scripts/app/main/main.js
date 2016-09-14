(function(){
	'use strict';
	
	angular.module('suiviApiApp')
		.config(function ($stateProvider){
			$stateProvider.state('main',{
				parent: 'abstractHome',
	            url: '/',
	            views: {
	                'content@': {
	                    templateUrl: 'scripts/app/main/main.html',
	                    controller: 'mainController as mainVm'
	                }
	            }
			});
		});
})();