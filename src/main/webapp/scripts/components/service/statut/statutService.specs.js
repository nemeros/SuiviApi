/*jslint node: true */
'use strict';

describe('Ressc Service factory', function(){
	beforeEach(module('suiviApiApp'));
	
	// Fix ui-rooter & jasmine interaction
	beforeEach(module(function($urlRouterProvider){
		$urlRouterProvider.deferIntercept();
	}));
	
	
	var factory, $httpBackend;
	
	beforeEach(inject(function(statutService, _$httpBackend_){
		factory = statutService;
		$httpBackend = _$httpBackend_;
	}))	;
	
	
	it('test the structure of the Statut Service factory', function(){
		expect(factory).toBeDefined();
		expect(factory.getStatut).toEqual(jasmine.any(Function));
	});
	
	
	afterEach(function() {
	     $httpBackend.verifyNoOutstandingExpectation();
	     $httpBackend.verifyNoOutstandingRequest();
	   });
			
	describe('testing functions', function(){
		it('Should get the statut list',function(){
			$httpBackend.expectGET('api/statut/').respond(200);
			
			factory.getStatut();
			
			$httpBackend.flush();
		});
		
	});
});