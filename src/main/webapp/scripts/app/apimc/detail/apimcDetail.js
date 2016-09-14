(function(){
	'use strict';
	
	angular.module('suiviApiApp')
		.config(function ($stateProvider){
			$stateProvider.state('apimc.apimcDetail',{
				parent: 'apimc',
	            url: '/:id',
	            views: {
	                'content@': {
	                    templateUrl: 'scripts/app/apimc/detail/apimcDetail.html',
	                    controller: 'apimcDetailController as apimcDetVm'
	                }
	            }
			});
		});
})();