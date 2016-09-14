package com.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
@Table(name="REQUETE")
public class Requete implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 850636456437536509L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="DATE_CREATION")
	private Date dtCreation;
	
	@Column(name="DATE_MODIFICATION")
	private Date dtModification;
	
	@Column(name="SUMMARY")
	private String summary;
	
	@Column(name="PATH")
	private String path;
	
	@Column(name="VERB")
	private String verb;
	
	@Column(name="TAGS")
	private String tags;
	
	@ManyToOne
	@JoinColumn(name="RESS_COMPOSANT_ID", referencedColumnName="id")
	@Fetch(FetchMode.JOIN)
	private RessComposant ressComposant;
	
	
	protected Requete(){}

	public Requete(Long id, Date dtCreation, Date dtModification, String summary, String path, String verb,
			String tags) {
		super();
		this.id = id;
		this.dtCreation = dtCreation;
		this.dtModification = dtModification;
		this.summary = summary;
		this.path = path;
		this.verb = verb;
		this.tags = tags;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getVerb() {
		return verb;
	}

	public void setVerb(String verb) {
		this.verb = verb;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	};
}
