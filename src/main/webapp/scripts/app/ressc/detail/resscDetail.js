(function(){
	'use strict';
	
	angular.module('suiviApiApp')
		.config(function ($stateProvider){
			$stateProvider.state('ressc.resscDetail',{
				parent: 'ressc',
	            url: '/:id',
	            views: {
	                'content@': {
	                    templateUrl: 'scripts/app/ressc/detail/resscDetail.html',
	                    controller: 'resscDetailController as resscDetVm'
	                }
	            }
			});
		});
})();