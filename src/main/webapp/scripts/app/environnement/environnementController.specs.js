/*jslint node: true */
'use strict';


describe("Environnement Controller",function(){
	beforeEach(module('suiviApiApp'));
	
	var ctrl, $scope, $q, $state;
	var environnementService, statutService, logger;
	var deferredEnv, deferredSearch, deferredStatut;
	
	var mockedListEnv, mockedListStatut, mockedListSearchEnv;
	var $stateMock;
	
	// Fix ui-rooter & jasmine interaction
	beforeEach(module(function($urlRouterProvider){
		$urlRouterProvider.deferIntercept();
	}));
	
	
	beforeEach(inject(function(_$q_, _$state_, $rootScope, $controller, _environnementService_, _statutService_, _logger_){
		$scope = $rootScope.$new();
		$q = _$q_;
		$state = _$state_;
		
		deferredEnv = $q.defer();
		deferredSearch = $q.defer();
		deferredStatut = $q.defer();
		
		environnementService =_environnementService_;
		statutService = _statutService_;
		logger = _logger_;
		
		spyOn(logger, "error").and.returnValue({});
		
		spyOn(environnementService, "listEnv").and.returnValue(deferredEnv.promise);
		spyOn(environnementService, "searchEnv").and.returnValue(deferredSearch.promise);
		spyOn(statutService, "getStatut").and.returnValue(deferredStatut.promise);
		 
		mockedListStatut = [{id:"NOUVEAU"}, {id:"INVALIDE"}];
		mockedListEnv = [{adabo:"ZTUA0"}];
		mockedListSearchEnv = [{env: "aaa"}, {env:"bbb"}];
		
		
		$stateMock = {
				go: function(route, params){
					this.route = route; 
					this.params = params;
				}
		};
	
		ctrl = $controller('environnementController', 
				{
					$scope: $scope, 
					$state: $stateMock, 
					environnementService: environnementService,
					statutService: statutService,
					logger: logger});
	}));
	
	
	
	it("Should test the structure of the controller", function(){
		expect(ctrl).toBeDefined();
		expect(ctrl.search).toEqual(jasmine.any(Function));
		expect(ctrl.gotToApimc).toEqual(jasmine.any(Function));
		expect(ctrl.searchParams).toBeDefined();
		expect(ctrl.errorSearch).toBeDefined();
		expect(ctrl.listEnv).toBeDefined();
		expect(ctrl.listSearchEnv).toBeDefined();
		expect(ctrl.listStatut).toBeDefined();
	});
	
	it("Should test the OK active() function", function(){
		deferredEnv.resolve(mockedListEnv);
		deferredStatut.resolve(mockedListStatut);
		
		$scope.$apply();
		
		expect(environnementService.listEnv).toHaveBeenCalled();
		expect(ctrl.listEnv.length).toEqual(1);
		expect(statutService.getStatut).toHaveBeenCalled();
		expect(ctrl.listStatut.length).toEqual(2);
	});
	
	it("Should test the reject of activate()", function(){
		deferredEnv.reject();
		deferredStatut.reject();
		
		$scope.$apply();
		
		expect(environnementService.listEnv).toHaveBeenCalled();
		expect(statutService.getStatut).toHaveBeenCalled();
		expect(logger.error).toHaveBeenCalled();		
		
		expect(ctrl.errorSearch).toEqual(true);
	});
	
	it("Should test the OK search function", function(){
		deferredSearch.resolve(mockedListSearchEnv);
		
		ctrl.search();
		
		$scope.$apply();
		
		expect(environnementService.searchEnv).toHaveBeenCalled();		
		expect(ctrl.listSearchEnv.length).toEqual(2);
		expect(ctrl.errorSearch).toEqual(false);
	});
	
	it("Should test the reject of environnementService call", function(){
		deferredSearch.reject();
		
		ctrl.search();
		
		$scope.$apply();
		
		expect(environnementService.searchEnv).toHaveBeenCalled();	
		expect(logger.error).toHaveBeenCalled();	
		expect(ctrl.errorSearch).toEqual(true);
	});
	
	it("Should test the routing to Apimc", function(){
		ctrl.gotToApimc(12);
		
		expect($stateMock.route).toEqual("apimc.apimcDetail");
		expect($stateMock.params.id).toEqual(12);
	});
});