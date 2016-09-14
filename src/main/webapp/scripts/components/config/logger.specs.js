/*jslint node: true */
'use strict';

describe('logger factory', function(){
	beforeEach(module('suiviApiApp'));
	
	// Fix ui-rooter & jasmine interaction
	beforeEach(module(function($urlRouterProvider){
		$urlRouterProvider.deferIntercept();
	}));
	
	var factory, $scope;
	var logBackEndDeferred, logBackEndService;
	
	beforeEach(inject(function($q, $rootScope, logger, toastr, _logBackEndService_){
		$scope = $rootScope.$new();
		
		logBackEndService = _logBackEndService_;
		logBackEndDeferred = $q.defer();
		
		
		spyOn(logBackEndService, "logError").and.returnValue(logBackEndDeferred.promise);
		
		factory = logger;
	}))	;
	
	
	it('test the structure of the logger factory', function(){
		expect(factory).toBeDefined();
		expect(factory.error).toEqual(jasmine.any(Function));
		expect(factory.warning).toEqual(jasmine.any(Function));
		expect(factory.info).toEqual(jasmine.any(Function));
		expect(factory.success).toEqual(jasmine.any(Function));
		expect(factory.log).toEqual(jasmine.any(Function));
	});
	
	it("Should call logBackEndService",function(){
		logBackEndDeferred.reject({});
		factory.error("test error", "test error", "test error");
		
		$scope.$apply();
		expect(logBackEndService.logError).toHaveBeenCalled();
	});
	
});