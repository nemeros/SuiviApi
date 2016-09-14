package com.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pojo.PathSearchResponse;
import com.repository.RequeteRepository;

@RestController
@RequestMapping("api/requete/")
public class RequeteController {

	@Autowired
	RequeteRepository requeteService;
	
	
	@RequestMapping(produces="application/json", method=RequestMethod.GET)
	public ResponseEntity<List<PathSearchResponse>> searchPath(@RequestParam(value="path") String path){
		
		return new ResponseEntity<List<PathSearchResponse>>(requeteService.searchByPath("%" + path + "%", new PageRequest(0, 50)), HttpStatus.OK);
	}
}
