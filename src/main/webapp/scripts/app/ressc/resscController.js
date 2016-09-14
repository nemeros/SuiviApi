(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .controller('resscController', resscController);
	
	resscController.$inject = ['$scope', '$state', 'logger', 'searchFilterService', 'resscService', 'statutService'];
	
	function resscController($scope, $state, logger, searchFilterService, resscService, statutService){
		/* jshint validthis: true */
		var vm = this;
		
		vm.listRessc = [];
		vm.listStatus = [];
		vm.isError = false;
		
		// retreiving search parameters
		vm.searchParams = searchFilterService.getResscParam();
		
		vm.search = search;
		vm.goToRessc = goToRessc;
		
		
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
			searchFilterService.setResscParam(vm.searchParams);
			
			resscService.search(vm.searchParams).then(
				function successCallback(data){
					vm.isError = false;
					vm.listRessc = data;
				},
				function errorCallback(exception){
					vm.isError = true;
					logger.error("La recherche a &eacute;chou&eacute;", angular.toJson(exception), "Erreur Technique");
				});
		}
		
		function goToRessc(ressc){
			$state.go(".resscDetail", {id: ressc.id});
		}
	}
})();