package com.pojo;

import java.util.Date;

public class EnvSearchResponse {
	private Long id;
	private String environnement;
	private String artifactId;
	private String version;
	private String codeApplication;
	private Date lastModified;
	private Boolean lastDeployed;
	private String statut;
	private String classe;
	
	public EnvSearchResponse(){};
	
	public EnvSearchResponse(Long id, String environnement, String artifactId, String version, String codeApplication,
			Date lastModified, Boolean lastDeployed, String statut, String classe) {
		this.id = id;
		this.environnement = environnement;
		this.artifactId = artifactId;
		this.version = version;
		this.codeApplication = codeApplication;
		this.lastModified = lastModified;
		this.lastDeployed = lastDeployed;
		this.statut = statut;
		this.classe = classe;
	}
	
	public String getEnvironnement() {
		return environnement;
	}
	public void setEnvironnement(String environnement) {
		this.environnement = environnement;
	}
	public String getArtifactId() {
		return artifactId;
	}
	public void setArtifactId(String artifactId) {
		this.artifactId = artifactId;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getCodeApplication() {
		return codeApplication;
	}
	public void setCodeApplication(String codeApplication) {
		this.codeApplication = codeApplication;
	}
	public Date getLastModified() {
		return lastModified;
	}
	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}
	public Boolean getLastDeployed() {
		return lastDeployed;
	}
	public void setLastDeployed(Boolean lastDeployed) {
		this.lastDeployed = lastDeployed;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

	public String getClasse() {
		return classe;
	}

	public void setClasse(String classe) {
		this.classe = classe;
	}
	
	
}
