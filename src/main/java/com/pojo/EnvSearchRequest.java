package com.pojo;

import java.util.List;


/**
 * Pojo used for the Environnement Search
 * @author abilbaut
 *
 */
public class EnvSearchRequest {
	private List<String> listEnv;
	private Boolean lastDeployed;
	private String artifactId;
	private List<String> listStatut;
	 
	public EnvSearchRequest(){};
	
	public EnvSearchRequest(List<String> listEnv, Boolean lastDeployed, String artifactId, List<String> listStatut) {
		this.listEnv = listEnv;
		this.lastDeployed = lastDeployed;
		this.artifactId = artifactId;
		this.listStatut = listStatut;
	}
	
	
	public List<String> getListEnv() {
		return listEnv;
	}
	public void setListEnv(List<String> listEnv) {
		this.listEnv = listEnv;
	}
	public Boolean getLastDeployed() {
		return lastDeployed;
	}
	public void setLastDeployed(Boolean lastDeployed) {
		this.lastDeployed = lastDeployed;
	}
	public String getArtifactId() {
		return artifactId;
	}
	public void setArtifactId(String artifactId) {
		this.artifactId = artifactId;
	}

	public List<String> getListStatut() {
		return listStatut;
	}

	public void setListStatut(List<String> listStatut) {
		this.listStatut = listStatut;
	}
}
