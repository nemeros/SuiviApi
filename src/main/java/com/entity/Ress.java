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
@Table(name="RESS")
@JsonInclude(Include.NON_NULL)
public class Ress extends AbstractMavenResource implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7067597831491254865L;
	
	@JsonIgnore
	@OneToMany(mappedBy="ress")
	private List<RessComposant> ressComposants;
	
	
	protected Ress(){};
	
	public Ress(Long id, String groupId, String artifactId, Date dtCreation, Date dtModification){
		this.id = id;
		this.groupId = groupId;
		this.artifactId = artifactId;
		this.dtCreation = dtCreation;
		this.dtModification = dtModification;
	}
}
