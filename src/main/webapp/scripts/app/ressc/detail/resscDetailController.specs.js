/*jslint node: true */
'use strict';

describe("Ressc Detail Controller", function(){
	beforeEach(module('suiviApiApp'));
	
	
	var ctrl, $scope, $q;
	var deferredRessc, deferredListVersion, deferredApimc, deferredPath;
	var $uibModal, resscService;
	
	
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
			params : {
				id: 3
			}
	};
		
		
	beforeEach(inject(function(_$q_, $rootScope, $controller, _$uibModal_, _resscService_){
		$q = _$q_;
		$scope = $rootScope.$new();
		
		deferredRessc = $q.defer();
		deferredListVersion = $q.defer();
		deferredApimc = $q.defer();
		deferredPath = $q.defer();
		
		$uibModal = _$uibModal_;
		resscService = _resscService_;
		
		spyOn(resscService, "getRessc").and.returnValue(deferredRessc.promise);
		spyOn(resscService, "getListVersion").and.returnValue(deferredListVersion.promise);
		spyOn(resscService, "getListDependantApimc").and.returnValue(deferredApimc.promise);
		spyOn(resscService, "getRequestPath").and.returnValue(deferredPath.promise);
		
		spyOn($uibModal, "open").and.returnValue(fakeModal);

		ctrl = $controller('resscDetailController', {$scope: $scope, $state: $stateMock, $uibModal:$uibModal, resscService: resscService});
	}));
	
	
	it("Should test the Structure of the Ressc Detail Controller", function(){
		expect(ctrl).toBeDefined();
		expect(ctrl.goToApimc).toEqual(jasmine.any(Function));
		expect(ctrl.goToRessource).toEqual(jasmine.any(Function));
		expect(ctrl.showSwagger).toEqual(jasmine.any(Function));
		expect(ctrl.showEditModal).toEqual(jasmine.any(Function));
		//expect(ctrl.idSelected).toBeDefined(); //not yet resolved
		expect(ctrl.ressc).toBeDefined();
		expect(ctrl.selectedVersion).toBeDefined();
		expect(ctrl.listVersion).toBeDefined();
		expect(ctrl.listApimc).toBeDefined();
		expect(ctrl.listRequest).toBeDefined();
		
		expect(ctrl.errorRessc).toBeDefined();
		expect(ctrl.errorDependencies).toBeDefined();
		expect(ctrl.errorListRequest).toBeDefined();
	});
	
	it("Should test the OK activate() of the controller",function(){
		deferredRessc.resolve({resscId: 12, commentaire:"Un commentaire"});
		deferredListVersion.resolve([{resscId:12, mvnVersion:"1.2.0"}]);
		deferredApimc.resolve([{apimcId: 15, codeApplication:"RDJ"}]);
		deferredPath.resolve([{path:"/uri/test/"}]);
		
		$scope.$apply();
		
		expect(ctrl.errorRessc).toEqual(false);
		expect(ctrl.errorDependencies).toEqual(false);
		expect(ctrl.errorListRequest).toEqual(false);
		
		expect(ctrl.ressc).toEqual({resscId: 12, commentaire:"Un commentaire"});
		expect(ctrl.listVersion).toEqual([{resscId:12, mvnVersion:"1.2.0"}]);
		expect(ctrl.listApimc).toEqual([{apimcId: 15, codeApplication:"RDJ"}]);
		expect(ctrl.listRequest).toEqual([{path:"/uri/test/"}]);
	});
	
	
	it("Should test the reject of apimc Service calls", function(){
		deferredRessc.reject();
		deferredListVersion.reject();
		deferredApimc.reject();
		deferredPath.reject();
		
		$scope.$apply();
		
		expect(ctrl.errorRessc).toEqual(true);
		expect(ctrl.errorDependencies).toEqual(true);
		expect(ctrl.errorListRequest).toEqual(true);
	});
	
	it("Should test the open state of the showSwagger Modal", function(){
		ctrl.showSwagger();		
		
		expect($uibModal.open).toHaveBeenCalled();
	});
	
	
	it("Should test the state of the edit Modal", function(){
		ctrl.showEditModal({ress:{artifactId:"dummyArtId"}, statut:{id:"dummystatutId"}});

		expect($uibModal.open).toHaveBeenCalled();
	});
	
	it("Should test the routing to a new Ressc", function(){
		ctrl.goToRessource(12);
		
		expect($stateMock.route).toEqual("ressc.resscDetail");
		expect($stateMock.param.id).toEqual(12);
	});
	
	it("Should test the routing to a new Apimc", function(){
		ctrl.goToApimc(13);
		
		expect($stateMock.route).toEqual("apimc.apimcDetail");
		expect($stateMock.param.id).toEqual(13);
	});
});