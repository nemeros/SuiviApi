package com.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.entity.ApimComposant;
import com.entity.Requete;
import com.entity.RessComposant;
import com.entity.Statut;
import com.pojo.GenComposantToSave;
import com.pojo.GenericSearchPojo;
import com.repository.ApimComposantRepository;
import com.repository.RequeteRepository;
import com.repository.RessComposantRepository;
import com.repository.StatutRepository;
import com.service.ResscSearchService;

/**
 * BackEnd Rest Service for the RESSC resource
 * 
 * @author abilbaut
 *
 */
@RestController
@RequestMapping("api/ressc/")
public class RessComponentController {
	
	@Autowired
	RessComposantRepository resscService;
	
	@Autowired
	ApimComposantRepository apimcService;
	
	@Autowired
	RequeteRepository requeteService;
	
	@Autowired
	ResscSearchService advSearchService;
	
	@Autowired
	StatutRepository statutService;
	
	
	@RequestMapping(produces="application/json", method=RequestMethod.POST)
	public ResponseEntity<List<RessComposant>> search(@RequestBody(required=true) GenericSearchPojo gsp){
		return new ResponseEntity<List<RessComposant>>(advSearchService.searchRessc(gsp), HttpStatus.OK);
	}
	
	@RequestMapping(value="{id}", produces="application/json", method=RequestMethod.GET)
	public ResponseEntity<RessComposant> getSpecificRessc(@PathVariable("id") Long apimcId){
		return new ResponseEntity<RessComposant>(resscService.findOne(apimcId), HttpStatus.OK);
	}
	
	@RequestMapping(value="{id}", produces="application/json", method=RequestMethod.PATCH)
	@ResponseStatus(value=HttpStatus.OK)
	public void patchRessc(@PathVariable("id") Long resscId, @RequestBody(required=true) GenComposantToSave gcts){
		
		RessComposant entityToSave = resscService.findOne(resscId);
		Statut statutSelected = statutService.findOne(gcts.getStatut());
		entityToSave.setStatut(statutSelected);
		entityToSave.setAuteur(gcts.getAuteur());
		entityToSave.setCommentaire(gcts.getCommentaire());
		entityToSave.setResponsableValidation(gcts.getResponsableValidation());
		
		resscService.saveAndFlush(entityToSave);
	}
	
	@RequestMapping(value="{id}/swagger", produces="application/json", method=RequestMethod.GET)
	public ResponseEntity<String> getSwagger(@PathVariable("id") Long resscId){
		return new ResponseEntity<String>(resscService.getSwaggerForOne(resscId), HttpStatus.OK);
	}
	
	@RequestMapping(value="{id}/versions", produces="application/json", method=RequestMethod.GET)
	public ResponseEntity<List<RessComposant>> getListVersion(@PathVariable("id") Long apimcId){
		return new ResponseEntity<List<RessComposant>>(resscService.findAllAssociatedVersion(apimcId), HttpStatus.OK);
	}
	
	@RequestMapping(value="{id}/ressources", produces="application/json", method=RequestMethod.GET)
	public ResponseEntity<List<ApimComposant>> getDependantApimc(@PathVariable("id") Long resscId){
		return new ResponseEntity<List<ApimComposant>>(apimcService.findAssociatedApim(resscId), HttpStatus.OK);
	}
	
	@RequestMapping(value="{id}/paths", produces="application/json", method=RequestMethod.GET)
	public ResponseEntity<List<Requete>> getPathsForRessource(@PathVariable("id") Long resscId){
		return new ResponseEntity<List<Requete>>(requeteService.findByRessComposantId(resscId), HttpStatus.OK);
	}
	
	@RequestMapping(value="latest", produces="application/json", method=RequestMethod.GET)
	public ResponseEntity<List<RessComposant>> getLatest(){
		return new ResponseEntity<List<RessComposant>>(resscService.findTop3ByOrderByLastModifiedDesc(), HttpStatus.OK);
	}	
}
