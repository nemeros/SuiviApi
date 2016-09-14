package com.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name="APIM")
@JsonInclude(Include.NON_NULL)
public class Apim extends AbstractMavenResource implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@JsonIgnore
	@OneToMany(mappedBy="apim")
	private List<ApimComposant> apimComposants;
	
	public Apim(){};
	
	public Apim(Long id, String groupId, String artifactId, Date dtCreation, Date dtModification){
		this.id = id;
		this.groupId = groupId;
		this.artifactId = artifactId;
		this.dtCreation = dtCreation;
		this.dtModification = dtModification;
	}
	
	
	public List<ApimComposant> getApimComposants(){
		return apimComposants;
	}
}
