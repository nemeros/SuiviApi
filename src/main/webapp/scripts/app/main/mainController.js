(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .controller('mainController', mainController);
	
	mainController.$inject = ['$scope', '$state', 'logger', 'apimcService', 'resscService'];
	
	function mainController($scope, $state, logger, apimcService, resscService){
		/* jshint validthis: true */
		var vm = this;
		
		vm.processSelectedApimc = processSelectedApimc;
		vm.processSelectedRessc = processSelectedRessc;
		
		// manage displaying of table
		vm.errorApimc = false;
		vm.errorRessc = false;
		
		// List of Data
		vm.listApimc = null;
		vm.listRessc = null;
		
		// init
		activate();
		
		//////////////////////
		
		function activate(){
			apimcService.getLatest().then(
				function successCallback(data){
					vm.listApimc = data;
				},
				function errorCallback(exception){
					vm.errorApimc = true;
					logger.error("L'initialisation des apimc a &eacute;chou&eacute;", angular.toJson(exception), "Erreur Technique");
				}
			);
			
			resscService.getLatest().then(
				function successCallback(data){
					vm.listRessc = data;
				},
				function errorCallback(exception){
					vm.errorRessc = true;
					logger.error("L'initialisation des ressources a &eacute;chou&eacute;", angular.toJson(exception), "Erreur Technique");
				}
			);
		}
		
		function processSelectedApimc(apimc){
			$state.go('apimc.apimcDetail', {id: apimc.id});
		}
		
		function processSelectedRessc(ressc){
			$state.go('ressc.resscDetail', {id: ressc.id});
		}
	}
})();