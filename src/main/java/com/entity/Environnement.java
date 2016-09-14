package com.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="ENVIRONNEMENT")
public class Environnement implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8442496267567721613L;

	@Id
	@Column(name="CODE_ADABO")
	private String codeAdabo;
	
	@Column(name="DESCRIPTION")
	private String description;
	
	@Column(name="URL_API_STORE")
	private String urlApiStore;
	
	@Column(name="BRANCHE")
	private String branche;
	
	@Column(name="NIVEAU")
	private String niveau;
	
	@Column(name="DATE_CREATION")
	private Date dtCreation;
	
	@Column(name="DATE_MODIFICATION")
	private Date dtModification;

	@JsonIgnore
	@OneToMany(mappedBy="environnement")
	private List<EnvApimcRelation> apimcs;
	
	protected Environnement(){};
	
	public Environnement(String codeAdabo, String description, String urlApiStore, String branche, String niveau,
			Date dtCreation, Date dtModification) {
		super();
		this.codeAdabo = codeAdabo;
		this.description = description;
		this.urlApiStore = urlApiStore;
		this.branche = branche;
		this.niveau = niveau;
		this.dtCreation = dtCreation;
		this.dtModification = dtModification;
	}

	public String getCodeAdabo() {
		return codeAdabo;
	}

	public void setCodeAdabo(String codeAdabo) {
		this.codeAdabo = codeAdabo;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUrlApiStore() {
		return urlApiStore;
	}

	public void setUrlApiStore(String urlApiStore) {
		this.urlApiStore = urlApiStore;
	}

	public String getBranche() {
		return branche;
	}

	public void setBranche(String branche) {
		this.branche = branche;
	}

	public String getNiveau() {
		return niveau;
	}

	public void setNiveau(String niveau) {
		this.niveau = niveau;
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

	public List<EnvApimcRelation> getApimcs() {
		return apimcs;
	}

	public void setApimcs(List<EnvApimcRelation> apimcs) {
		this.apimcs = apimcs;
	}


}
