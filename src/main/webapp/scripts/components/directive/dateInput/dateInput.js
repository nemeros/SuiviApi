(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .directive('catsDateInput', dateInput);
	
	dateInput.$inject = ['$filter', '$log'];

	function dateInput($filter, $log){
		return {
			restrict: 'A',
			require: 'ngModel',
			scope:{
				ngModel: '='
			},
			link: function(scope){
				if(scope.ngModel){
					scope.ngModel = $filter('date')(new Date(scope.ngModel), 'yyyy-MM-dd HH:mm:ss');
				}
			}
		};		
	}
})();