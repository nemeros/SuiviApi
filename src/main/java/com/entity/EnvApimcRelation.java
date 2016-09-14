package com.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="ENVIRONNEMENT_HAS_APIM_COMPOSANT")
@IdClass(EnvApimcRelationId.class)
public class EnvApimcRelation implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5522813746028694651L;

	@Id
	@Column(name="APIM_COMPOSANT_ID")
	private Long apimcId;
	
	@Id
	@Column(name="CODE_ADABO")
	private String codeAdabo;
	
	@Column(name="DATE_CREATION")
	private Date dtCreation;
	
	@Column(name="DATE_MODIFICATION")
	private Date dtModification;
	
	@Column(name="LAST_MODIFIED")
	private Date lastModified;
	
	@Column(name="LATEST")
	private Boolean latest;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="APIM_COMPOSANT_ID", referencedColumnName="ID", insertable=false, updatable=false)
	private ApimComposant apimComposant;
	
	@ManyToOne
	@JoinColumn(name="CODE_ADABO", referencedColumnName="CODE_ADABO", insertable=false, updatable=false)
	private Environnement environnement;

	
	protected EnvApimcRelation(){};
	
	
	public EnvApimcRelation(Long apimcId, String codeAdabo, Date dtCreation, Date dtModification, Date lastModified,
			Boolean latest, ApimComposant apimComposant, Environnement environnement) {
		super();
		this.apimcId = apimcId;
		this.codeAdabo = codeAdabo;
		this.dtCreation = dtCreation;
		this.dtModification = dtModification;
		this.lastModified = lastModified;
		this.latest = latest;
		this.apimComposant = apimComposant;
		this.environnement = environnement;
	}

	public Long getApimcId() {
		return apimcId;
	}

	public void setApimcId(Long apimcId) {
		this.apimcId = apimcId;
	}

	public String getCodeAdabo() {
		return codeAdabo;
	}

	public void setCodeAdabo(String codeAdabo) {
		this.codeAdabo = codeAdabo;
	}

	public Date getDtCreation() {
		return dtCreation;
	}

	public void setDtCreation(Date dtCreation) {
		this.dtCreation = dtCreation;
	}

	public Date getDtModification() {
		return dtModification;
	}

	public void setDtModification(Date dtModification) {
		this.dtModification = dtModification;
	}

	public Date getLastModified() {
		return lastModified;
	}

	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}

	public ApimComposant getApimComposant() {
		return apimComposant;
	}

	public void setApimComposant(ApimComposant apimComposant) {
		this.apimComposant = apimComposant;
	}

	public Environnement getEnvironnement() {
		return environnement;
	}

	public void setEnvironnement(Environnement environnement) {
		this.environnement = environnement;
	}


	public Boolean isLatest() {
		return latest;
	}

	public void setLatest(Boolean latest) {
		this.latest = latest;
	}
}
