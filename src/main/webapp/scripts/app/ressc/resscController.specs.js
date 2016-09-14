/*jslint node: true */
'use strict';


describe('Ressc Controller', function(){
	beforeEach(module("suiviApiApp"));
	
	// Fix ui-rooter & jasmine interaction
	beforeEach(module(function($urlRouterProvider){
		$urlRouterProvider.deferIntercept();
	}));
	
	var ctrl, $scope;
	var deferredResscService, deferredStatutService;
	var resscService, searchFilterService, loggerService, statutService;
	var $stateMock;
	
	beforeEach(inject(function($rootScope, $controller, $q, logger, _resscService_, _searchFilterService_, _statutService_){
		
		$scope = $rootScope.$new();
		deferredResscService = $q.defer();
		deferredStatutService = $q.defer();
		
		resscService = _resscService_;
		searchFilterService = _searchFilterService_;
		loggerService = logger;
		statutService = _statutService_;
		
		
		spyOn(resscService, "search").and.returnValue(deferredResscService.promise);
		spyOn(loggerService, "error").and.returnValue({});
		spyOn(statutService, "getStatut").and.returnValue(deferredStatutService.promise);
		
		$stateMock = {
				go: function(route, params){
					this.route = route; 
					this.params = params;
				}
		};
		
		ctrl = $controller("resscController", {
				$scope: $scope, 
				logger : loggerService,
				$state: $stateMock,
				resscService : resscService,
				searchFilterService: searchFilterService,
				statutService: statutService
		});		
	}));
	
	
	it("Should test the structure of the controller", function(){
		expect(ctrl).toBeDefined();
		expect(ctrl.searchParams).toBeDefined();
		expect(ctrl.listRessc).toBeDefined();
		expect(ctrl.isError).toBeDefined();
		expect(ctrl.listStatus).toBeDefined();
		expect(ctrl.search).toEqual(jasmine.any(Function));
		expect(ctrl.goToRessc).toEqual(jasmine.any(Function));
	});
	
	it("Should test the activate() function", function(){
		deferredStatutService.resolve({statutList:[]});
		$scope.$apply();
		expect(statutService.getStatut).toHaveBeenCalled();
	});
	
	it("Should test the OK search()",function(){
		ctrl.searchParams = {codeApplication:"RDJ"};
		ctrl.search();
		
		deferredResscService.resolve([{resscId:12, commentaire:"Com1"}]);
		$scope.$apply();
		
		expect(resscService.search).toHaveBeenCalled();
		expect(ctrl.listRessc).toEqual([{resscId:12, commentaire:"Com1"}]);
		expect(ctrl.isError).toEqual(false);
		
		expect(searchFilterService.getResscParam()).toEqual({codeApplication:"RDJ"});
		
	});
	
	it("Should Test the KO search()", function(){
		ctrl.search();
		
		deferredResscService.reject("rejet technique");
		$scope.$apply();
		
		expect(resscService.search).toHaveBeenCalled();
		expect(loggerService.error).toHaveBeenCalled();
		expect(ctrl.listRessc).toEqual([]);
		expect(ctrl.isError).toEqual(true);
	});
	
	it("Should Test the goToApimc(apimc)", function(){
		ctrl.goToRessc({id:12});
		expect($stateMock.route).toEqual(".resscDetail");
		expect($stateMock.params.id).toEqual(12);
	});	
	
});