(function(){
	'use strict';
	
	angular.module('suiviApiApp')
	    .controller('editModalController', editModalController);
	
	editModalController.$inject = ['$scope', '$uibModalInstance', 'editModalObj', 'statutService', 'logger'];
	
	function editModalController($scope, $uibModalInstance, editModalObj, statutService, logger){
		/* jshint validthis: true */
		var vm = this;
		
		vm.listStatus = [];
		vm.objToEdit = editModalObj;
		vm.save = save;
		vm.cancel = cancel;
		
		activate();
		
		////////
		
		function activate(){
			statutService.getStatut().then(
				function successCallback(data){
					vm.listStatus = data;
				},
				function errorCallback(response){
					logger.error("L'initialisation des statuts a &eacute;chou&eacute;", angular.toJson(response), "Erreur Technique");
				});
		}
		
		function save(objToSave){
			$uibModalInstance.close(objToSave);
		}
		
		function cancel(){
			$uibModalInstance.dismiss("cancel");
		}
		
	}
})();