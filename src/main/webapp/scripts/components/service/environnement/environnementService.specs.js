/*jslint node: true */
'use strict';

describe('Environnement Service factory', function(){
	beforeEach(module('suiviApiApp'));
	
	beforeEach(module(function($urlRouterProvider){
		$urlRouterProvider.deferIntercept();
	}));
	
	
	var factory, $httpBackend;
	
	beforeEach(inject(function(environnementService, _$httpBackend_){
		factory = environnementService;
		$httpBackend = _$httpBackend_;
	}))	;
	
	
	it('test the structure of the Environnement Service factory', function(){
		expect(factory).toBeDefined();
		expect(factory.searchEnv).toEqual(jasmine.any(Function));
		expect(factory.listEnv).toEqual(jasmine.any(Function));
	});
	
	
	afterEach(function() {
	     $httpBackend.verifyNoOutstandingExpectation();
	     $httpBackend.verifyNoOutstandingRequest();
	   });
			
	
	describe('testing functions', function(){
		it('Should search for envs',function(){
			$httpBackend.expectPOST('api/env/').respond(200);
			
			factory.searchEnv();
			
			$httpBackend.flush();
		});
		
		it("Should list the envs", function(){
			$httpBackend.expectGET('api/env/').respond(200);
			
			factory.listEnv();
			
			$httpBackend.flush();
		});
		
	});
});