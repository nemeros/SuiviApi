/*jslint node: true */
'use strict';

describe("Search Filter Service", function(){
	beforeEach(module('suiviApiApp'));
	
	var factory = null;
	
	beforeEach(inject(function(searchFilterService){
		factory = searchFilterService;
	}));
	
	
	it("test existance of the factory", function(){			
		expect(factory).toBeDefined();
		expect(factory.getApicParam).toEqual(jasmine.any(Function));
		expect(factory.setApicParam).toEqual(jasmine.any(Function));
		expect(factory.getResscParam).toEqual(jasmine.any(Function));
		expect(factory.setResscParam).toEqual(jasmine.any(Function));
		expect(factory.isEmpty).toEqual(jasmine.any(Function));
	});
	
	it("test the getter / setter of searchApicParam",function(){
		var jsonSearch = {"code":"aaa", "number":12};
		
		factory.setApicParam(jsonSearch);
		expect(factory.getApicParam().code).toEqual("aaa");
		expect(factory.getApicParam().number).toEqual(12);
	});
	
	it("test the getter / setter of searchResscParam",function(){
		var jsonSearch = {"code":"bbb", "number":13};
		
		factory.setResscParam(jsonSearch);
		expect(factory.getResscParam().code).toEqual("bbb");
		expect(factory.getResscParam().number).toEqual(13);
	});
	
	it("Test that the object is empty", function(){
		expect(true).toEqual(factory.isEmpty({}));
	});
	
	it("Test that the object is NOT empty", function(){
		expect(false).toEqual(factory.isEmpty({id:12}));
	});
});