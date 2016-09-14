/*jslint node: true */
'use strict';

describe('log BackEnd Service', function(){
	beforeEach(module('suiviApiApp'));
	
	/**
	 * fix ui.router & httpBackend
	 */
	beforeEach(module(function($urlRouterProvider){
		$urlRouterProvider.deferIntercept();
	}));
	
	var factory, $httpBackend = null;
	
	beforeEach(inject(function(logBackEndService, _$httpBackend_){
		factory = logBackEndService;
		$httpBackend = _$httpBackend_;
	}));
	
	it("test the structure of the logBackEndService factory", function(){
		expect(factory).toBeDefined();
		expect(factory.logError).toEqual(jasmine.any(Function));
	});
	
	describe('$factory.logError',function(){		
		
		beforeEach(inject(function(){	
			$httpBackend.when('PUT', 'api/tech/logError').respond(200);
		}));
		
		
		afterEach(function() {
		     $httpBackend.verifyNoOutstandingExpectation();
		     $httpBackend.verifyNoOutstandingRequest();
		   });
		
		it('should put data into logBackEnd', function(){
			
			$httpBackend.expectPUT('api/tech/logError');
			factory.logError("{rr}");			
			$httpBackend.flush();
		});
	});
});