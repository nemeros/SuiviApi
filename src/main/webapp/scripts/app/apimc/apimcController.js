(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .controller('apimcController', apimcController);
	
	apimcController.$inject = ['$scope', 'logger', '$state', 'apimcService', 'searchFilterService', 'statutService'];
	
	function apimcController($scope, logger, $state, apimcService, searchFilterService, statutService){
		/* jshint validthis: true */
		var vm = this;
		
		vm.listApimc = [];
		vm.listStatus = [];
		
		vm.isError = false;
		
		// retreiving search parameters
		vm.searchParams = searchFilterService.getApicParam();
		
		vm.search = search;
		vm.goToApimc = goToApimc;
		
		// if search parameters are already existing we run the search
		if(!searchFilterService.isEmpty(vm.searchParams)){
			vm.search();
		}
		
		activate();
		
		//////////////////////
		
		function activate(){
			statutService.getStatut().then(
				function successCallback(data){
					vm.listStatus = data;
				},
				function errorCallback(exception){
					logger.error("L'initialisation des statuts a &eacute;chou&eacute;", angular.toJson(exception), "Erreur Technique");
				});
		}
		
		function search(){
			if("" === vm.searchParams.statut){
				vm.searchParams.status = null;
			}
			
			//saving search params
			searchFilterService.setApicParam(vm.searchParams);
			
			apimcService.search(vm.searchParams).then(
				function succesCallback(data){
					vm.isError = false;
					vm.listApimc = data;
				},
				function errorCallback(exception){
					vm.isError = true;
					logger.error("La recherche a &eacute;chou&eacute;", angular.toJson(exception), "Erreur Technique");
				}
			);
		}
		
		
		function goToApimc(apimc){
			$state.go('.apimcDetail', {id: apimc.id});
		}			
	}
		
})();