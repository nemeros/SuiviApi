(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .controller('requeteController', requeteController);
	
	requeteController.$inject = ['$scope', '$state', 'logger', 'requeteService'];
	
	function requeteController($scope, $state, logger, requeteService){
		/* jshint validthis: true */
		var vm = this;
		
		vm.inputPath = "";
		vm.listPath = null;
		vm.errorSearch = false;
		vm.search = search;
		vm.goToRessc = goToRessc;
		
		//////////////////////
		
		function search(){
			requeteService.searchPath(vm.inputPath).then(
				function successCalback(data){
					vm.listPath = data;
					vm.errorSearch = false;
				},
				function errorCallback(exception){
					vm.errorSearch = true;
					logger.error("La recherche a &eacute;chou&eactue;", angular.toJson(exception), "Erreur Technique");
				}
			);
		}

		function goToRessc(resscId){
			$state.go('ressc.resscDetail', {id: resscId});
		}
	}
})();