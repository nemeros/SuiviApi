(function(){
	'use strict';
	
	angular.module('suiviApiApp')
		.config(function ($stateProvider){
			$stateProvider.state('env',{
				parent: 'abstractHome',
	            url: '/env',
	            views: {
	                'content@': {
	                    templateUrl: 'scripts/app/environnement/environnement.html',
	                    controller: 'environnementController as envVm'
	                }
	            }
			});
		});
})();