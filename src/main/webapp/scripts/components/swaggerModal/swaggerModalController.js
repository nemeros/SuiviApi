(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .controller('swaggerModalController', swaggerModalController);
	
	swaggerModalController.$inject = ['$scope', '$log', '$uibModalInstance', 'swaggerOpt'];
	
	function swaggerModalController($scope, $log, $uibModalInstance, swaggerOpt){
		/* jshint validthis: true */
		var vm = this;
		
		if(swaggerOpt.type === 'apimc'){
			vm.swaggerUrl = "api/apimc/" + swaggerOpt.id + "/swagger";
		}
		if(swaggerOpt.type === 'ressc'){
			vm.swaggerUrl = "api/ressc/" + swaggerOpt.id + "/swagger";
		}
	}
})();