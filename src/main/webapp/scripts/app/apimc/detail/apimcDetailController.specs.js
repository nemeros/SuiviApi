/*jslint node: true */
'use strict';


describe("Apimc Detail Controller", function(){
	beforeEach(module('suiviApiApp'));
	
	
	var ctrl, $scope, $q;
	var deferredApimc, deferredListVersion, deferredRessc, deferredListEnv;
	var $uibModal, apimcService;
	
	
	// Fix ui-rooter & jasmine interaction
	beforeEach(module(function($urlRouterProvider){
		$urlRouterProvider.deferIntercept();
	}));

	var fakeModal = {
			result:{
				then:function(successCallback, dismissCallback){
					this.successCallback = successCallback;
					this.dismissCallback = dismissCallback;
				}
			}
	};
	
	var $stateMock = {
			go: function(route, param){
				this.route = route;
				this.param = param;
			},
			params:{
				id:3
			}
	};
		
	beforeEach(inject(function(_$q_, $rootScope, $controller, _$uibModal_, _apimcService_){
		$q = _$q_;
		$scope = $rootScope.$new();
		
		deferredApimc = $q.defer();
		deferredListVersion = $q.defer();
		deferredRessc = $q.defer();
		deferredListEnv = $q.defer();
		
		$uibModal = _$uibModal_;
		apimcService = _apimcService_;
		
		spyOn(apimcService, "getApimc").and.returnValue(deferredApimc.promise);
		spyOn(apimcService, "getListVersion").and.returnValue(deferredListVersion.promise);
		spyOn(apimcService, "getListDependantRessc").and.returnValue(deferredRessc.promise);
		spyOn(apimcService, "getListEnv").and.returnValue(deferredListEnv.promise);
		
		spyOn($uibModal, "open").and.returnValue(fakeModal);
					
		ctrl = $controller('apimcDetailController', {$scope: $scope, $state:$stateMock, $uibModal:$uibModal, apimcService: apimcService});
	}));
	
	
	it("Should test the Structure of the Apimc Detail Controller", function(){
		expect(ctrl).toBeDefined();
		expect(ctrl.goToApimc).toEqual(jasmine.any(Function));
		expect(ctrl.goToRessource).toEqual(jasmine.any(Function));
		expect(ctrl.showSwagger).toEqual(jasmine.any(Function));
		expect(ctrl.showEditModal).toEqual(jasmine.any(Function));
		//expect(ctrl.idSelected).toBeDefined(); //not yet resolved
		expect(ctrl.apimc).toBeDefined();
		expect(ctrl.selectedVersion).toBeDefined();
		expect(ctrl.listVersion).toBeDefined();
		expect(ctrl.listRessc).toBeDefined();
		expect(ctrl.listEnv).toBeDefined();
		expect(ctrl.errorApimc).toBeDefined();
		expect(ctrl.errorDependencies).toBeDefined();
		expect(ctrl.errorListEnv).toBeDefined();
	});
	
	it("Should test the activate() of the controller",function(){
		deferredApimc.resolve({apimcId: 12, commentaire:"Un commentaire"});
		deferredListVersion.resolve([{apimcId:12, mvnVersion:"1.2.0"}]);
		deferredRessc.resolve([{resscId: 15, codeApplication:"RDJ"}]);
		deferredListEnv.resolve([{"apimcId": 2, "environnement":{"codeAdabo": "DEVTUA"}}]);
		
		$scope.$apply();
		expect(ctrl.errorApimc).toEqual(false);
		expect(ctrl.errorDependencies).toEqual(false);
		expect(ctrl.errorListEnv).toEqual(false);
		
		expect(ctrl.apimc).toEqual({apimcId: 12, commentaire:"Un commentaire"});
		expect(ctrl.listVersion).toEqual([{apimcId:12, mvnVersion:"1.2.0"}]);
		expect(ctrl.listRessc).toEqual([{resscId: 15, codeApplication:"RDJ"}]);
		expect(ctrl.listEnv).toEqual([{"apimcId": 2, "environnement":{"codeAdabo": "DEVTUA"}}]);
	});
	
	
	it("Should test the reject of apimc Service calls", function(){
		deferredApimc.reject();
		deferredListVersion.reject();
		deferredRessc.reject();
		deferredListEnv.reject();
		
		$scope.$apply();
		
		expect(ctrl.errorApimc).toEqual(true);
		expect(ctrl.errorDependencies).toEqual(true);
		expect(ctrl.errorListEnv).toEqual(true);
	});
	
	it("Should test the open state of the showSwagger Modal", function(){
		ctrl.showSwagger();		
		
		expect($uibModal.open).toHaveBeenCalled();
	});
	
	
	it("Should test the state of the edit Modal", function(){
		ctrl.showEditModal({apim:{artifactId:"dummyArtId"}, statut:{id:"dummyStatut"}});

		expect($uibModal.open).toHaveBeenCalled();
	});
	
	it("Should test the routing to a new Apimc", function(){
		ctrl.goToApimc(12);
		expect($stateMock.route).toEqual("apimc.apimcDetail");
		expect($stateMock.param.id).toEqual(12);
	});
	
	it("Should test the routing to a new Ressc", function(){
		ctrl.goToRessource(45);
		expect($stateMock.route).toEqual("ressc.resscDetail");
		expect($stateMock.param.id).toEqual(45);
	});
});