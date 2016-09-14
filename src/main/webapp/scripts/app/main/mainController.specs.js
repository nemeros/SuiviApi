/*jslint node: true */
'use strict';


describe("Main Controller",function(){
	beforeEach(module('suiviApiApp'));
	
	var ctrl, $scope, $q, $state;
	var deferredApimc, deferredRessc;
	
	var listApimc = [{id:12, mvnVersion:"1.1.0"}, {id:13,mvnVersion:"1.2.4"}];
	var listRessc = [{id:2, mvnVersion:"3.2.0"}, {id:3,mvnVersion:"6.2.4"}];
	
	// Fix ui-rooter & jasmine interaction
	beforeEach(module(function($urlRouterProvider){
		$urlRouterProvider.deferIntercept();
	}));
	
	
	beforeEach(inject(function(_$q_, _$state_, $rootScope, $controller, apimcService, resscService, logger){
		$scope = $rootScope.$new();
		$q = _$q_;
		$state = _$state_;
		deferredApimc = $q.defer();
		deferredRessc = $q.defer();
		
		spyOn(logger, "error").and.returnValue({});
		
		spyOn(apimcService, "getLatest").and.returnValue(deferredApimc.promise);
		 
		spyOn(resscService, "getLatest").and.returnValue(deferredRessc.promise);
		
		ctrl = $controller('mainController', {$scope: $scope, $state: $state, apimcService: apimcService, resscService: resscService, logger:logger});
	}));
	
	
	
	it("Should test the structure of the controller", function(){
		expect(ctrl).toBeDefined();
		expect(ctrl.processSelectedApimc).toEqual(jasmine.any(Function));
		expect(ctrl.processSelectedRessc).toEqual(jasmine.any(Function));
		expect(ctrl.errorApimc).toBeDefined();
		expect(ctrl.errorRessc).toBeDefined();
		expect(ctrl.listApimc).toBeDefined();
		expect(ctrl.listRessc).toBeDefined();
	});
	
	it("Should test the OK activate()", function(){
		deferredApimc.resolve(listApimc);
		deferredRessc.resolve(listRessc);
		
		$scope.$apply();
		
		expect(ctrl.listApimc.length).toEqual(2);
		expect(ctrl.listRessc.length).toEqual(2);
		expect(ctrl.errorApimc).toEqual(false);
		expect(ctrl.errorRessc).toEqual(false);
	});
	
	it("Should test the reject of apimcService call", function(){
		deferredApimc.reject();
		deferredRessc.resolve(listRessc);
		
		$scope.$apply();
		expect(ctrl.errorApimc).toEqual(true);
		expect(ctrl.errorRessc).toEqual(false);
	});
	
	it("Should test the reject of resscService call", function(){
		deferredApimc.resolve(listApimc);
		deferredRessc.reject();
		
		$scope.$apply();
		expect(ctrl.errorApimc).toEqual(false);
		expect(ctrl.errorRessc).toEqual(true);
	});
	
});