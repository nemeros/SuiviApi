(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .controller('resscDetailController', resscDetailController);
	
	resscDetailController.$inject = ['$scope', 'logger', '$state', '$uibModal', 'resscService'];
	
	function resscDetailController($scope, logger, $state, $uibModal, resscService){
		/* jshint validthis: true */
		var vm = this;
		vm.idSelected = $state.params.id;
		
		vm.ressc = null;
		vm.selectedVersion = null;
		vm.listVersion = null;
		vm.listApimc = null;
		vm.listRequest = null;
		
		// handling error
		vm.errorRessc = false;
		vm.errorDependencies = false;
		vm.errorListRequest = false;
		
		vm.goToApimc = goToApimc;
		vm.goToRessource = goToRessource;
		vm.showSwagger = showSwagger;
		vm.showEditModal = showEditModal;
		
		// init
		activate();
		
		//////////////////////
		
		function activate(){
			resscService.getRessc(vm.idSelected).then(
				function successCallback(data){
					vm.ressc = data;
					
					vm.selectedVersion = {
							id: vm.ressc.id,
							version: vm.ressc.version
						};
				},
				function errorCallback(response){
					vm.errorRessc = true;
				}
			);
			
			resscService.getListVersion(vm.idSelected).then(
				function successCallback(data){
					vm.listVersion = data;
				},
				function errorCallback(response){
					vm.errorRessc = true;
				}
			);
			
			resscService.getListDependantApimc(vm.idSelected).then(
				function successCallback(data){
					vm.listApimc = data;
				},
				function errorCallback(response){
					vm.errorDependencies = true;
				}
			);
			
			resscService.getRequestPath(vm.idSelected).then(
				function successCallback(data){
					vm.listRequest = data;
				},
				function errorCallback(response){
					vm.errorListRequest = true;
				}
			);
		}
	
		/**
		 * @desc routing to specified apimc
		 */
		function goToApimc(apimcId){
			$state.go('apimc.apimcDetail', {id: apimcId});
		}
	
		/**
		 * @desc routing to specified ressc
		 */
		function goToRessource(resscId){
			$state.go('ressc.resscDetail', {id: resscId});
		}
		
		/**
		 * @desc load the swagger modal popup
		 */
		function showSwagger(){
			var swaggerOpt = {
					type: "ressc",
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
		function showEditModal(ressc){
			// initializing the object to edit
			var editModalObj = {
				type: "ressc",
				id: vm.idSelected,
				artifactId: ressc.ress.artifactId,
				version: ressc.version,
				statut: ressc.statut.id,
				auteur: ressc.auteur,
				commentaire: ressc.commentaire,
				responsableValidation : ressc.responsableValidation
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
					
					resscService.save(apimcToSave).then(
						function successCallback(data){
							logger.info("Ressource Sauvegardée", "Ressource Sauvegardée", "Message d'information");
							$state.reload();
						},
						function errorCallback(response){
							logger.error("L'édition a échouée", angular.toJson(response), "Erreur technique");
						}
					);
				},
				function dismissCallback(reason){
					logger.warning("Annulation de l'édition", "Annulation de l'édition", "Message d'information");
				});
		}
	}
})();