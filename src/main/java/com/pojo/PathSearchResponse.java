package com.pojo;

/**
 * Pojo used ofr the response of Path Search
 * @author etp6110
 *
 */
public class PathSearchResponse {

	private Long id;
	private String verb;
	private String path;
	private String summary;
	private Long ressourceId;
	private String artifactId;
	private String version;
	
	
	public PathSearchResponse(){};	
	
	public PathSearchResponse(Long id, String verb, String path, String summary, Long ressourceId, String artifactId,
			String version) {
		this.id = id;
		this.verb = verb;
		this.path = path;
		this.summary = summary;
		this.ressourceId = ressourceId;
		this.artifactId = artifactId;
		this.version = version;
	}
	
	
	public String getVerb() {
		return verb;
	}
	public void setVerb(String verb) {
		this.verb = verb;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public Long getRessourceId() {
		return ressourceId;
	}
	public void setRessourceId(Long ressourceId) {
		this.ressourceId = ressourceId;
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}
	
	
}
