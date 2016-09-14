/*jslint node: true */
'use strict';

describe('Ressc Service factory', function(){
	beforeEach(module('suiviApiApp'));
	
	// Fix ui-rooter & jasmine interaction
	beforeEach(module(function($urlRouterProvider){
		$urlRouterProvider.deferIntercept();
	}));
	
	
	var factory, $httpBackend;
	
	beforeEach(inject(function(resscService, _$httpBackend_){
		factory = resscService;
		$httpBackend = _$httpBackend_;
	}))	;
	
	
	it('test the structure of the Ressc Service factory', function(){
		expect(factory).toBeDefined();
		expect(factory.getLatest).toEqual(jasmine.any(Function));
		expect(factory.getRessc).toEqual(jasmine.any(Function));
		expect(factory.getListVersion).toEqual(jasmine.any(Function));
		expect(factory.getListDependantApimc).toEqual(jasmine.any(Function));
		expect(factory.getSwagger).toEqual(jasmine.any(Function));
		expect(factory.getRequestPath).toEqual(jasmine.any(Function));
		expect(factory.search).toEqual(jasmine.any(Function));
		expect(factory.save).toEqual(jasmine.any(Function));
	});
	
	
	afterEach(function() {
	     $httpBackend.verifyNoOutstandingExpectation();
	     $httpBackend.verifyNoOutstandingRequest();
	   });
			
	describe('testing functions', function(){
		it('Should get the latest ressc',function(){
			$httpBackend.expectGET('api/ressc/latest').respond(200);
			
			factory.getLatest();
			
			$httpBackend.flush();
		});
		
		it("Should get The specific ressc", function(){
			$httpBackend.expectGET('api/ressc/12').respond(200);
			
			factory.getRessc(12);
			
			$httpBackend.flush();
		});
			
		it("Should get the List of version for an resscId",function(){
			$httpBackend.expectGET('api/ressc/12/versions').respond(200);
			
			factory.getListVersion(12);
			
			$httpBackend.flush();
		});
		
		it("Should get the List of Ress Dependencies for an resscId",function(){
			$httpBackend.expectGET('api/ressc/12/ressources').respond(200);
			
			factory.getListDependantApimc(12);
			
			$httpBackend.flush();
		});
		
		
		it("Should get the Swagger def of an resscId",function(){
			$httpBackend.expectGET('api/ressc/12/swagger').respond(200);
			
			factory.getSwagger(12);
			
			$httpBackend.flush();
		});
		
		it("Should Search for paths of an Ressc",function(){
			$httpBackend.expectGET('api/ressc/12/paths').respond(200);
			
			factory.getRequestPath(12);
			
			$httpBackend.flush();
		});
		
		it("Should Search Ressc's", function(){
			$httpBackend.expectPOST('api/ressc/').respond(200);
			
			factory.search({});
			
			$httpBackend.flush();
		});
		
		it("Should patch a Ressc",function(){
			$httpBackend.expectPATCH('api/ressc/12').respond(200);
			
			factory.save({id:12,status:"NOUVEAU", commentaire:"Ah !"});
			
			$httpBackend.flush();
		});
	});
});