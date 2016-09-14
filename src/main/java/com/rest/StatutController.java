package com.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Statut;
import com.repository.StatutRepository;

@RestController
@RequestMapping(value="api/statut/")
public class StatutController {

	@Autowired
	private StatutRepository statutService;
	
	@RequestMapping(method=RequestMethod.GET, produces="application/json")
	public ResponseEntity<List<Statut>> getAllStatut(){
		return new ResponseEntity<List<Statut>>(statutService.findAll(), HttpStatus.OK);
	}
}
