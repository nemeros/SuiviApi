package com.pojo;

import java.util.List;

/**
 * Pojo to handle the advanced search of apimc / ressc
 * @author abilbaut
 *
 */
public class GenericSearchPojo {
	
	private String codeApplication;
	private List<String> listStatutSelected;
	private String artifactId;
	private String basePath;
	private String tags;
	
		
	public String getCodeApplication() {
		return codeApplication;
	}
	public void setCodeApplication(String codeApplication) {
		this.codeApplication = codeApplication;
	}
	public List<String> getListStatutSelected() {
		return listStatutSelected;
	}
	public void setListStatutSelected(List<String> listStatutSelected) {
		this.listStatutSelected = listStatutSelected;
	}
	public String getArtifactId() {
		return artifactId;
	}
	public void setArtifactId(String artifactId) {
		this.artifactId = artifactId;
	}
	public String getBasePath() {
		return basePath;
	}
	public void setBasePath(String basePath) {
		this.basePath = basePath;
	}
	public String getTags() {
		return tags;
	}
	public void setTags(String tags) {
		this.tags = tags;
	}	
}
