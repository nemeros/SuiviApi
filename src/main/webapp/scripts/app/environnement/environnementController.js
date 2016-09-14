(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .controller('environnementController', environnementController);
	
	environnementController.$inject = ['$scope', '$state', 'logger', 'environnementService', 'statutService'];
	
	function environnementController($scope, $state, logger, environnementService, statutService){
		/* jshint validthis: true */
		var vm = this;
		
		vm.searchParams = {};
		vm.listEnv = null;		
		vm.listSearchEnv = null;
		vm.listStatut = null;
		
		//ErrorHandling
		vm.errorSearch = false;
		
		//Table sorting
		initTableSort();
		vm.sortBy = sortBy;
		
		// Global function
		vm.search = search;
		vm.gotToApimc = gotToApimc;
			
		//init
		activate();
		
		//////////////////////
		function activate(){
			environnementService.listEnv().then(
				function successCallback(data){
					vm.listEnv = data;
				},
				function errorCallback(exception){
					vm.errorSearch = true;
					logger.error("Erreur d'appel du service distant environnementService", angular.toJson(exception), "Erreur Technique");
				}
			);
			
			statutService.getStatut().then(
				function successCallback(data){
					vm.listStatut = data;
				},
				function errorCallback(exception){
					vm.errorSearch = true;
					logger.error("Erreur d'appel du service distant statutService", angular.toJson(exception), "Erreur Technique");
				}
			);
		}
		
		function search(){
			environnementService.searchEnv(vm.searchParams).then(
				function successCalback(data){
					vm.listSearchEnv = data;
					vm.errorSearch = false;
					initTableSort();
				},
				function errorCallback(exception){
					vm.errorSearch = true;
					logger.error("La recherche a &eacute;chou&eactue;", angular.toJson(exception), "Erreur Technique");
				}
			);
		}

		function gotToApimc(apimcId){
			$state.go("apimc.apimcDetail", {id: apimcId});
		}
		
		function initTableSort(){
			vm.orderCol = "";
			vm.orderReverse = false;
		}
		
		function sortBy(colName){
			vm.orderReverse = (vm.orderCol === colName) ? !vm.orderReverse : false;
			vm.orderCol = colName;
		}
		
	}
})();