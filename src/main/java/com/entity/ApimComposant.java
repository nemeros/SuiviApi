package com.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name="APIM_COMPOSANT")
@JsonInclude(Include.NON_NULL)
public class ApimComposant extends AbstractComposant implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3338874993624728505L;
	
		
	@Column(name="BASE_PATH")
	private String basePath;
		
	@Column(name="DESCRIPTION")
	private String description;
	
	@Column(name="CONTEXT")
	private String context;
	
	@Column(name="API_VERSION")
	private String apiVersion;
	
	@Column(name="TITLE")
	private String title;
	
	@ManyToOne
	@JoinColumn(name="APIM_ID", referencedColumnName="id")
	@Fetch(FetchMode.JOIN)
	private Apim apim;
	
	@ManyToMany(mappedBy="apimComposants")
	@JsonIgnore
	private List<RessComposant> ressComposants;
	
	@JsonIgnore
	@OneToMany(fetch=FetchType.LAZY, mappedBy="apimComposant")
	private List<EnvApimcRelation> environnements;
	
	protected ApimComposant(){}

	public ApimComposant(long id, String version, Statut statut, String basePath, Date dtCreation, Date dtModification,
			String description, String context, String codeApplication, String commentaire, Date lastModified,
			String auteur, String responsableValidation, String title, Apim apim) {
		this.id = id;
		this.version = version;
		this.statut = statut;
		this.basePath = basePath;
		this.dtCreation = dtCreation;
		this.dtModification = dtModification;
		this.description = description;
		this.context = context;
		this.codeApplication = codeApplication;
		this.commentaire = commentaire;
		this.lastModified = lastModified;
		this.auteur = auteur;
		this.responsableValidation = responsableValidation;
		this.title = title;
		this.apim = apim;
	}
	
	public ApimComposant(long id, String version){
		this.id = id;
		this.version = version;
	}

	public String getBasePath() {
		return basePath;
	}

	public void setBasePath(String basePath) {
		this.basePath = basePath;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getContext() {
		return context;
	}

	public void setContext(String context) {
		this.context = context;
	}

	public String getApiVersion() {
		return apiVersion;
	}

	public void setApiVersion(String apiVersion) {
		this.apiVersion = apiVersion;
	}

	public Apim getApim() {
		return apim;
	}

	public void setApim(Apim apim) {
		this.apim = apim;
	}

	public List<RessComposant> getRessComposants() {
		return ressComposants;
	}

	public void setRessComposants(List<RessComposant> ressComposants) {
		this.ressComposants = ressComposants;
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<EnvApimcRelation> getEnvironnements() {
		return environnements;
	}

	public void setEnvironnements(List<EnvApimcRelation> environnements) {
		this.environnements = environnements;
	}
}
