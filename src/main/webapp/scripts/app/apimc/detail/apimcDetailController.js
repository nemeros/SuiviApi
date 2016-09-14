(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .controller('apimcDetailController', apimcDetailController);
	
	apimcDetailController.$inject = ['$scope', 'logger', '$state', '$uibModal', 'apimcService'];
	
	function apimcDetailController($scope, logger, $state, $uibModal, apimcService){
		/* jshint validthis: true */
		var vm = this;
		vm.idSelected = $state.params.id;
		
		vm.apimc = null;
		vm.selectedVersion = null;
		vm.listVersion = null;
		vm.listRessc = null;
		vm.listEnv = null;
		
		// Handling error
		vm.errorApimc = false;
		vm.errorDependencies = false;
		vm.errorListEnv = false;
		
		vm.goToApimc = goToApimc;
		vm.goToRessource = goToRessource;
		vm.showSwagger = showSwagger;
		vm.showEditModal = showEditModal;
		
		//init
		activate();
		
		//////////////////////
		
		/**
		 * @desc initialization of the controller
		 */
		function activate(){
			apimcService.getApimc(vm.idSelected).then(
				function successCallback(data){
					vm.apimc = data;
					
					vm.selectedVersion = {
							id: vm.apimc.id,
							version: vm.apimc.version
						};
				},
				function errorCallback(response){
					vm.errorApimc = true;
				}
			);
			
			apimcService.getListVersion(vm.idSelected).then(
				function successCallback(data){
					vm.listVersion = data;
				},
				function errorCallback(response){
					vm.errorApimc = true;
				}
			);
			
			apimcService.getListDependantRessc(vm.idSelected).then(
				function successCallback(data){
					vm.listRessc = data;
				},
				function errorCallback(response){
					vm.errorDependencies = true;
				}
			);
			
			apimcService.getListEnv(vm.idSelected).then(
				function successCallback(data){
					vm.listEnv = data;
				},
				function errorCallback(response){
					vm.errorListEnv = true;
				}
			);
		}
	
		/**
		 * @desc routing to selected apimc
		 */
		function goToApimc(apimcId){
			$state.go('apimc.apimcDetail', {id: apimcId});
		}
		/**
		 * @desc routing to the target resource
		 */
		function goToRessource(resscId){
			$state.go('ressc.resscDetail', {id: resscId});
		}	
		
		/**
		 * @desc Show the swagger Modal
		 */
		function showSwagger(){
			var swaggerOpt = {
					type: "apimc",
					id: vm.idSelected
			};
			
			var options = {
				templateUrl: "scripts/components/swaggerModal/swaggerModal.html",
				controller: "swaggerModalController",
				controllerAs: "swaggerVm",
				size: "lg",
				resolve: {
					swaggerOpt: swaggerOpt
				}
			};
			
			var modalInstance = $uibModal.open(options);
		}
		
		/**
		 * @desc Show the edit modal
		 */
		function showEditModal(apimc){
			// initializing the object to edit
			var editModalObj = {
				type: "apimc",
				id: vm.idSelected,
				artifactId: apimc.apim.artifactId,
				version: apimc.version,
				statut: apimc.statut.id,
				auteur: apimc.auteur,
				commentaire: apimc.commentaire,
				responsableValidation : apimc.responsableValidation
			};
			
			// options to call the modal
			var options = {
				templateUrl: "scripts/components/editModal/editModal.html",
				controller: "editModalController",
				controllerAs: "editVm",
				size: "md",
				resolve: {
					editModalObj: editModalObj
				}
			};
			
			// opening the modal
			var modalInstance = $uibModal.open(options);
			
			// post-processing the object to save
			modalInstance.result.then(
				
				function successCallback(objToSave){
					var apimcToSave = {
							id: objToSave.id,
							statut: objToSave.statut,
							auteur: objToSave.auteur,
							commentaire: objToSave.commentaire,
							responsableValidation: objToSave.responsableValidation
					};
					
					apimcService.save(apimcToSave).then(
						function successCallback(data){
							logger.info("Apim Sauvegardé", "Apim Sauvegard&eacute;", "Message d'information");
							$state.reload();
						},
						function errorCallback(response){
							logger.error("L'&eacute;dition a &eacute;chou&eacute;e", angular.toJson(response), "Erreur technique");
						}
					);
				},
				function dismissCallback(reason){
					logger.warning("Annulation de l'&eacute;dition", "Annulation de l'&eacute;dition", "Message d'information");
				});
		}
	}
})();