(function(){
	'use strict';
	
	angular.module('suiviApiApp')
		.config(function ($stateProvider){
			$stateProvider.state('ressc',{
				parent: 'abstractHome',
	            url: '/ressc',
	            views: {
	                'content@': {
	                    templateUrl: 'scripts/app/ressc/ressc.html',
	                    controller: 'resscController as resscVm'
	                }
	            }
			});
		});
})();