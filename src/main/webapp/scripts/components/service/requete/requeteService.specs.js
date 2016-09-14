/*jslint node: true */
'use strict';

describe('requete Service factory', function(){
	beforeEach(module('suiviApiApp'));
	
	beforeEach(module(function($urlRouterProvider){
		$urlRouterProvider.deferIntercept();
	}));
	
	
	var factory, $httpBackend;
	
	beforeEach(inject(function(requeteService, _$httpBackend_){
		factory = requeteService;
		$httpBackend = _$httpBackend_;
	}))	;
	
	
	it('test the structure of the Requete Service factory', function(){
		expect(factory).toBeDefined();
		expect(factory.searchPath).toEqual(jasmine.any(Function));
	});
	
	
	afterEach(function() {
	     $httpBackend.verifyNoOutstandingExpectation();
	     $httpBackend.verifyNoOutstandingRequest();
	   });
			
	
	describe('testing functions', function(){
		it('Should search for path',function(){
			$httpBackend.expectGET('api/requete/').respond(200);
			
			factory.searchPath();
			
			$httpBackend.flush();
		});
		
	});
});