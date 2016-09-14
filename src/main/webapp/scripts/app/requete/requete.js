(function(){
	'use strict';
	
	angular.module('suiviApiApp')
		.config(function ($stateProvider){
			$stateProvider.state('requete',{
				parent: 'abstractHome',
	            url: '/requete',
	            views: {
	                'content@': {
	                    templateUrl: 'scripts/app/requete/requete.html',
	                    controller: 'requeteController as reqVm'
	                }
	            }
			});
		});
})();