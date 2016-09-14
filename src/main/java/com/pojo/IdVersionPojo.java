package com.pojo;

/**
 * pojo used in ApimComposantRepository and RessComposantRepository
 * 
 * @author abilbaut
 *
 */
public class IdVersionPojo {
	private Long id;
	private String version;
	
	public IdVersionPojo(){};
	
	public IdVersionPojo(Long id, String version) {
		super();
		this.id = id;
		this.version = version;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}
	
	
}
