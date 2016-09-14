package com.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * shared column name between the tables RESS_COMPOSANT and APIM_COMPOSANT
 * @author abilbaut
 *
 */
@MappedSuperclass
public abstract class AbstractComposant {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	protected long id;
	
	@Column(name="DATE_CREATION")
	protected Date dtCreation;
	
	@Column(name="DATE_MODIFICATION")
	protected Date dtModification;
	
	@Column(name="VERSION")
	protected String version;
	
	@Column(name="LAST_MODIFIED")
	protected Date lastModified;
	
	@Column(name="SWAGGER")
	@JsonIgnore
	protected String swagger;
	
	@Column(name="CODE_APPLICATION")
	protected String codeApplication;
	
	@Column(name="VAL_COMMENTAIRE")
	protected String commentaire;
	
	@Column(name="VAL_AUTEUR")
	protected String auteur;
	
	@Column(name="VAL_DATE")
	protected Date dtValidation;
	
	@Column(name="VAL_RESPONSABLE")
	protected String responsableValidation;
	
	
	@ManyToOne
	@JoinColumn(name="VAL_STATUT", referencedColumnName="ID")
	@Fetch(FetchMode.JOIN)
	protected Statut statut;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public Date getLastModified() {
		return lastModified;
	}

	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}

	public String getSwagger() {
		return swagger;
	}

	public void setSwagger(String swagger) {
		this.swagger = swagger;
	}

	public String getCodeApplication() {
		return codeApplication;
	}

	public void setCodeApplication(String codeApplication) {
		this.codeApplication = codeApplication;
	}

	public String getCommentaire() {
		return commentaire;
	}

	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public String getAuteur() {
		return auteur;
	}

	public void setAuteur(String auteur) {
		this.auteur = auteur;
	}

	public Date getDtValidation() {
		return dtValidation;
	}

	public void setDtValidation(Date dtValidation) {
		this.dtValidation = dtValidation;
	}

	public Statut getStatut() {
		return statut;
	}

	public void setStatut(Statut statut) {
		this.statut = statut;
	}

	public String getResponsableValidation() {
		return responsableValidation;
	}

	public void setResponsableValidation(String responsableValidation) {
		this.responsableValidation = responsableValidation;
	}
}
