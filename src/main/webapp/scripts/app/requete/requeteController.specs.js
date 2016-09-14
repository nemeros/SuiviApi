/*jslint node: true */
'use strict';


describe("Requete Controller",function(){
	beforeEach(module('suiviApiApp'));
	
	var ctrl, $scope, $q, $state;
	var requeteService;
	var deferredRequete;
	
	var mockedListPath;
	var $stateMock;
	
	// Fix ui-rooter & jasmine interaction
	beforeEach(module(function($urlRouterProvider){
		$urlRouterProvider.deferIntercept();
	}));
	
	
	beforeEach(inject(function(_$q_, _$state_, $rootScope, $controller, _requeteService_, logger){
		$scope = $rootScope.$new();
		$q = _$q_;
		$state = _$state_;
		deferredRequete = $q.defer();
		
		requeteService =_requeteService_;
		
		spyOn(logger, "error").and.returnValue({});
		
		spyOn(requeteService, "searchPath").and.returnValue(deferredRequete.promise);
		 
		
		mockedListPath = [{verb: "aaa"}, {verb:"bbb"}];
		$stateMock = {
				go: function(route, params){
					this.route = route; 
					this.params = params;
				}
		};
	
		ctrl = $controller('requeteController', 
				{
					$scope: $scope, 
					$state: $stateMock, 
					requeteService: requeteService,
					logger:logger});
	}));
	
	
	
	it("Should test the structure of the controller", function(){
		expect(ctrl).toBeDefined();
		expect(ctrl.search).toEqual(jasmine.any(Function));
		expect(ctrl.goToRessc).toEqual(jasmine.any(Function));
		expect(ctrl.inputPath).toBeDefined();
		expect(ctrl.errorSearch).toBeDefined();
		expect(ctrl.listPath).toBeDefined();
	});
	
	it("Should test the OK search function", function(){
		deferredRequete.resolve(mockedListPath);
		
		ctrl.search();
		
		$scope.$apply();
		
		expect(requeteService.searchPath).toHaveBeenCalled();		
		expect(ctrl.listPath.length).toEqual(2);
		expect(ctrl.errorSearch).toEqual(false);
	});
	
	it("Should test the reject of apimcService call", function(){
		deferredRequete.reject();
		
		ctrl.search();
		
		$scope.$apply();
		
		expect(requeteService.searchPath).toHaveBeenCalled();	
		expect(ctrl.errorSearch).toEqual(true);
	});
	
	it("Should test the routing to ressc", function(){
		ctrl.goToRessc(12);
		
		expect($stateMock.route).toEqual("ressc.resscDetail");
		expect($stateMock.params.id).toEqual(12);
	});
});