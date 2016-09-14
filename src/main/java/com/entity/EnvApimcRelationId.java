package com.entity;

import java.io.Serializable;

public class EnvApimcRelationId implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2070356218093245418L;

	private Long apimcId;
	private String codeAdabo;
	
	
	protected EnvApimcRelationId(){};
	
	public EnvApimcRelationId(Long apimcId, String codeAdabo) {
		super();
		this.apimcId = apimcId;
		this.codeAdabo = codeAdabo;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((apimcId == null) ? 0 : apimcId.hashCode());
		result = prime * result + ((codeAdabo == null) ? 0 : codeAdabo.hashCode());
		return result;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EnvApimcRelationId other = (EnvApimcRelationId) obj;
		if (apimcId == null) {
			if (other.apimcId != null)
				return false;
		} else if (!apimcId.equals(other.apimcId))
			return false;
		if (codeAdabo == null) {
			if (other.codeAdabo != null)
				return false;
		} else if (!codeAdabo.equals(other.codeAdabo))
			return false;
		return true;
	}

	public Long getApimcId() {
		return apimcId;
	}

	public void setApimcId(Long apimcId) {
		this.apimcId = apimcId;
	}

	public String getCodeAdabo() {
		return codeAdabo;
	}

	public void setCodeAdabo(String codeAdabo) {
		this.codeAdabo = codeAdabo;
	}
}
