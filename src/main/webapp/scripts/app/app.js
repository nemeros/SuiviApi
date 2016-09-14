	(function(){
	'use strict';
	
	angular.module('suiviApiApp', ['ngResource', 'ui.router', 'ui.bootstrap', 'ngSanitize', 'swaggerUi', 'ngAnimate'])
	
		//constant
		.constant('toastr', toastr)
		
		//route config
		.config(function($stateProvider, $urlRouterProvider){
			$urlRouterProvider.otherwise('/');
			
			$stateProvider.state('abstractHome', {
	            'abstract': true,
	            views: {
	                'navbar@': {
	                    templateUrl: 'scripts/components/navbar/navbar.html',
	                    controller: 'NavbarController as navBarVm'
	                }
	            }
	        });
		})
		
		//toastr config
		.config(toastrConfig);
	
		function toastrConfig(toastr){
			toastr.options.timeOut = 4000;
			toastr.options.positionClass = 'toast-bottom-right';
		}
})();



