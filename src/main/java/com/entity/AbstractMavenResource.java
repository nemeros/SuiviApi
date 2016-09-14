package com.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * shared column name between the tables RESS and APIM
 * @author abilbaut
 *
 */
@MappedSuperclass
public abstract class AbstractMavenResource {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	protected Long id;
	
	@Column(name="GROUP_ID")
	protected String groupId;
	
	@Column(name="ARTIFACT_ID")
	protected String artifactId;
	
	@Column(name="DATE_CREATION")
	protected Date dtCreation;
	
	@Column(name="DATE_MODIFICATION")
	protected Date dtModification;
	
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public String getArtifactId() {
		return artifactId;
	}

	public void setArtifactId(String artifactId) {
		this.artifactId = artifactId;
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
}
