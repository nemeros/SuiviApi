package com.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
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
@Table(name="RESS_COMPOSANT")
@JsonInclude(Include.NON_NULL)
public class RessComposant extends AbstractComposant implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -8968184737280013512L;

	@Column(name="MODALITE")
	private Integer modalite;
	
	@Column(name="TAGS")
	private String tags;
	
	@Column(name="PATHS")
	private String paths;
	
	
	@ManyToOne
	@JoinColumn(name="RESS_ID", referencedColumnName="id")
	@Fetch(FetchMode.JOIN)
	private Ress ress;
	
	@OneToMany(mappedBy="ressComposant")
	@JsonIgnore
	private List<Requete> requetes;
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(name="APIM_COMPOSANT_HAS_RESS_COMPOSANT",
		joinColumns= @JoinColumn(name="RESS_COMPOSANT_ID", referencedColumnName="id"),
		inverseJoinColumns = @JoinColumn(name="APIM_COMPOSANT_ID", referencedColumnName="id"))
	@JsonIgnore
	private List<ApimComposant> apimComposants;
	
	
	protected RessComposant(){};
	
	public RessComposant(long id, String version, Statut statut, Date dtCreation, Date dtModification,
			String codeApplication, String commentaire, Date lastModified,	String auteur, String responsableValidation,
			Ress ress, Integer modalite, String tags, String paths) {
		this.id = id;
		this.version = version;
		this.statut = statut;
		this.dtCreation = dtCreation;
		this.dtModification = dtModification;
		this.codeApplication = codeApplication;
		this.commentaire = commentaire;
		this.lastModified = lastModified;
		this.auteur = auteur;
		this.responsableValidation = responsableValidation;
		this.ress = ress;
		this.modalite = modalite;
		this.tags = tags;
		this.paths = paths;
	}

	public Integer getModalite() {
		return modalite;
	}

	public void setModalite(Integer modalite) {
		this.modalite = modalite;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public String getPaths() {
		return paths;
	}

	public void setPaths(String paths) {
		this.paths = paths;
	}

	public Ress getRess() {
		return ress;
	}

	public void setRess(Ress ress) {
		this.ress = ress;
	}

	public List<Requete> getRequetes() {
		return requetes;
	}	
}
