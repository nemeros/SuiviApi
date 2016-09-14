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
import com.entity.EnvApimcRelation;
import com.entity.RessComposant;
import com.entity.Statut;
import com.pojo.GenComposantToSave;
import com.pojo.GenericSearchPojo;
import com.pojo.IdVersionPojo;
import com.repository.ApimComposantRepository;
import com.repository.EnvApimcRelationRepository;
import com.repository.RessComposantRepository;
import com.repository.StatutRepository;
import com.service.ApimcSearchService;

/**
 * BackEnd Rest Service for the APIMC resource
 * 
 * @author abilbaut
 *
 */
@RestController
@RequestMapping("api/apimc/")
public class ApimComponentController {

	@Autowired
	ApimComposantRepository apimc;
	
	@Autowired
	RessComposantRepository ressc;
	
	@Autowired
	ApimcSearchService searchService;
	
	@Autowired 
	EnvApimcRelationRepository envApimcService;
	
	@Autowired
	StatutRepository statutService;
	
	@RequestMapping(produces="application/json", method=RequestMethod.POST)
	public ResponseEntity<List<ApimComposant>> search(@RequestBody(required=true) GenericSearchPojo gsp){
		return new ResponseEntity<List<ApimComposant>>(searchService.searchApimc(gsp), HttpStatus.OK);
	}
	
	@RequestMapping(value="{id}", produces="application/json", method=RequestMethod.GET)
	public ResponseEntity<ApimComposant> getSpecificApimc(@PathVariable("id") Long apimcId){
		return new ResponseEntity<ApimComposant>(apimc.findOne(apimcId), HttpStatus.OK);
	}
	
	@RequestMapping(value="{id}", produces="application/json", method=RequestMethod.PATCH)
	@ResponseStatus(value=HttpStatus.OK)
	public void patchApimc(@PathVariable("id") Long apimcId, @RequestBody(required=true) GenComposantToSave gcts){
		
		ApimComposant entityToSave = apimc.findOne(apimcId);
		Statut statutSelected = statutService.findOne(gcts.getStatut());
		
		entityToSave.setStatut(statutSelected);
		entityToSave.setAuteur(gcts.getAuteur());
		entityToSave.setCommentaire(gcts.getCommentaire());
		entityToSave.setResponsableValidation(gcts.getResponsableValidation());
		
		apimc.saveAndFlush(entityToSave);
	}
	
	@RequestMapping(value="{id}/swagger", produces="application/json", method=RequestMethod.GET)
	public ResponseEntity<String> getSwagger(@PathVariable("id") Long apimcId){
		return new ResponseEntity<String>(apimc.getSwaggerForOne(apimcId), HttpStatus.OK);
	}
	
	@RequestMapping(value="{id}/versions", produces="application/json", method=RequestMethod.GET)
	public ResponseEntity<List<IdVersionPojo>> getListVersion(@PathVariable("id") Long apimcId){
		return new ResponseEntity<List<IdVersionPojo>>(apimc.findAllAssociatedVersion(apimcId), HttpStatus.OK);
	}
	
	@RequestMapping(value="{id}/ressources", produces="application/json", method=RequestMethod.GET)
	public ResponseEntity<List<RessComposant>> getDependantRessources(@PathVariable("id") Long apimcId){
		return new ResponseEntity<List<RessComposant>>(ressc.findAssociatedRessource(apimcId), HttpStatus.OK);
	}
	
	@RequestMapping(value="{id}/environnements", produces="application/json", method=RequestMethod.GET)
	public ResponseEntity<List<EnvApimcRelation>> getDependantEnvrionnements(@PathVariable("id") Long apimcId){
		return new ResponseEntity<List<EnvApimcRelation>>(envApimcService.findAllEnvAssociatedWithApimc(apimcId), HttpStatus.OK);
	}
	
	@RequestMapping(value="latest", produces="application/json", method=RequestMethod.GET)
	public ResponseEntity<List<ApimComposant>> getLatest(){
		return new ResponseEntity<List<ApimComposant>>(apimc.findTop3ByOrderByLastModifiedDesc(), HttpStatus.OK);
	}	
}
