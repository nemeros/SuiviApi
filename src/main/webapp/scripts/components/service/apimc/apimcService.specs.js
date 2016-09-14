/*jslint node: true */
'use strict';

describe('Apimc Service factory', function(){
	beforeEach(module('suiviApiApp'));
	
	beforeEach(module(function($urlRouterProvider){
		$urlRouterProvider.deferIntercept();
	}));
	
	
	var factory, $httpBackend;
	
	beforeEach(inject(function(apimcService, _$httpBackend_){
		factory = apimcService;
		$httpBackend = _$httpBackend_;
	}))	;
	
	
	it('test the structure of the Apimc Service factory', function(){
		expect(factory).toBeDefined();
		expect(factory.getLatest).toEqual(jasmine.any(Function));
		expect(factory.getApimc).toEqual(jasmine.any(Function));
		expect(factory.getListVersion).toEqual(jasmine.any(Function));
		expect(factory.getListDependantRessc).toEqual(jasmine.any(Function));
		expect(factory.getSwagger).toEqual(jasmine.any(Function));
		expect(factory.search).toEqual(jasmine.any(Function));
		expect(factory.save).toEqual(jasmine.any(Function));
		expect(factory.getListEnv).toEqual(jasmine.any(Function));
	});
	
	
	afterEach(function() {
	     $httpBackend.verifyNoOutstandingExpectation();
	     $httpBackend.verifyNoOutstandingRequest();
	   });
			
	describe('testing functions', function(){
		it('Should get the latest apimc',function(){
			$httpBackend.expectGET('api/apimc/latest').respond(200);
			
			factory.getLatest();
			
			$httpBackend.flush();
		});
		
		it("Should get The specific apim", function(){
			$httpBackend.expectGET('api/apimc/12').respond(200);
			
			factory.getApimc(12);
			
			$httpBackend.flush();
		});
			
		it("Should get the List of version for an apimcId",function(){
			$httpBackend.expectGET('api/apimc/12/versions').respond(200);
			
			factory.getListVersion(12);
			
			$httpBackend.flush();
		});
		
		it("Should get the List of Ress Dependencies for an apimcId",function(){
			$httpBackend.expectGET('api/apimc/12/ressources').respond(200);
			
			factory.getListDependantRessc(12);
			
			$httpBackend.flush();
		});
		
		
		it("Should get the Swagger def of an apimcId",function(){
			$httpBackend.expectGET('api/apimc/12/swagger').respond(200);
			
			factory.getSwagger(12);
			
			$httpBackend.flush();
		});
		
		it("Should Search for Apimc's",function(){
			$httpBackend.expectPOST('api/apimc/').respond(200);
			
			factory.search();
			
			$httpBackend.flush();
		});
		
		it("Should patch an Apimc",function(){
			$httpBackend.expectPATCH('api/apimc/12').respond(200);
			
			factory.save({id:12,status:"NOUVEAU", commentaire:"Ah !"});
			
			$httpBackend.flush();
		});
		
		it("Should search for dependant environnement", function(){
			$httpBackend.expectGET('api/apimc/2/environnements').respond(200);
			
			factory.getListEnv(2);
			
			$httpBackend.flush();
		});
		
	});
});