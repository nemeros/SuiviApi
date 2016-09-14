/*jslint node: true */
'use strict';

describe("Apimc Controller", function(){
	beforeEach(module("suiviApiApp"));
	
	// Fix ui-rooter & jasmine interaction
	beforeEach(module(function($urlRouterProvider){
		$urlRouterProvider.deferIntercept();
	}));
	
	var ctrl, $scope, $q;
	var deferredApimcService, deferredStatutService;
	var apimcService, searchFilterService, loggerService, statutService;
	var $stateMock;
	
	beforeEach(inject(function($rootScope, $controller, _$q_, logger, _apimcService_, _searchFilterService_, _statutService_){
		$scope = $rootScope.$new();
		$q = _$q_;
		deferredApimcService = $q.defer();
		deferredStatutService = $q.defer();
		
		apimcService = _apimcService_;
		searchFilterService = _searchFilterService_;
		loggerService = logger;
		statutService = _statutService_;
		
		
		spyOn(apimcService, "search").and.returnValue(deferredApimcService.promise);
		spyOn(loggerService, "error").and.returnValue({});
		
		spyOn(statutService, "getStatut").and.returnValue(deferredStatutService.promise);
		
		$stateMock = {
				go: function(route, params){
					this.route = route; 
					this.params = params;
				}
		};
		
		ctrl = $controller("apimcController", {
				$scope: $scope, 
				logger : loggerService,
				$state: $stateMock,
				apimcService : apimcService,
				searchFilterService: searchFilterService,
				statutService: statutService
		});		
	}));
	
	it("Should test the strucure of the controller", function(){
		expect(ctrl).toBeDefined();
		expect(ctrl.search).toEqual(jasmine.any(Function));
		expect(ctrl.goToApimc).toEqual(jasmine.any(Function));
		expect(ctrl.listApimc).toBeDefined();
		expect(ctrl.listStatus).toBeDefined();
		expect(ctrl.isError).toBeDefined();
		expect(ctrl.searchParams).toBeDefined();
	});
	
	it("Should test the activate() function", function(){
		deferredStatutService.resolve({statutList:[]});
		$scope.$apply();
		expect(statutService.getStatut).toHaveBeenCalled();
	});
	
	it("Should test the OK search()",function(){
		ctrl.searchParams = {codeApplication:"RDJ"};
		ctrl.search();
		
		deferredApimcService.resolve([{apimcId:12, commentaire:"Com1"}]);
		$scope.$apply();
		
		expect(apimcService.search).toHaveBeenCalled();
		expect(ctrl.listApimc).toEqual([{apimcId:12, commentaire:"Com1"}]);
		expect(ctrl.isError).toEqual(false);
		
		expect(searchFilterService.getApicParam()).toEqual({codeApplication:"RDJ"});
		
	});
	
	it("Should Test the KO search()", function(){
		ctrl.search();
		
		deferredApimcService.reject("rejet technique");
		$scope.$apply();
		
		expect(apimcService.search).toHaveBeenCalled();
		expect(loggerService.error).toHaveBeenCalled();
		expect(ctrl.listApimc).toEqual([]);
		expect(ctrl.isError).toEqual(true);
	});
	
	it("Should Test the goToApimc(apimc)", function(){
		ctrl.goToApimc({id:12});
		expect($stateMock.route).toEqual(".apimcDetail");
		expect($stateMock.params.id).toEqual(12);
	});	
});