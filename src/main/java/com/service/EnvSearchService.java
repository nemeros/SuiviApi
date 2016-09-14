package com.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mysql.jdbc.StringUtils;
import com.pojo.EnvSearchRequest;
import com.pojo.EnvSearchResponse;

/**
 * Service to handle complex search
 * @author abilbaut
 *
 */
@Service
public class EnvSearchService {

	@Autowired
	EntityManager em;
	
	
	public List<EnvSearchResponse> searchEnv(EnvSearchRequest pojo, boolean limited){
		StringBuilder query = new StringBuilder(200);
		
		query.append("SELECT new com.pojo.EnvSearchResponse(rel.apimcId, rel.codeAdabo, apim.artifactId, apimc.version, apimc.codeApplication, ");
		query.append("rel.lastModified, rel.latest, sta.id, sta.classe) ");
		query.append("FROM EnvApimcRelation rel ");
		query.append("JOIN rel.apimComposant apimc ");
		query.append("JOIN apimc.apim apim ");
		query.append("JOIN apimc.statut sta ");
		query.append("WHERE 1 = 1 ");
		
		Map<String, Object> paramMap = new HashMap<String, Object>();
		
		if(pojo.getListEnv() != null && pojo.getListEnv().size() > 0){
			query.append("AND rel.codeAdabo IN :listenvs ");
			paramMap.put("listenvs", pojo.getListEnv());
		}
		if(!StringUtils.isNullOrEmpty(pojo.getArtifactId())){
			query.append("AND apim.artifactId LIKE :artifactId ");
			paramMap.put("artifactId", "%" + pojo.getArtifactId() + "%");
		}
		if(Boolean.TRUE.equals(pojo.getLastDeployed())){
			query.append("AND rel.latest = TRUE ");
		}
		if(pojo.getListStatut() != null && pojo.getListStatut().size() > 0){
			query.append("AND sta.id IN :listStatuts ");
			paramMap.put("listStatuts", pojo.getListStatut());
		}
		
		TypedQuery<EnvSearchResponse> tq = em.createQuery(query.toString(), EnvSearchResponse.class);
	
		if(paramMap.size() > 0){	
			
			for(Entry<String, Object> entry : paramMap.entrySet()){
				tq.setParameter(entry.getKey(), entry.getValue());
			}
		}
		
		if(limited){
			return tq.setMaxResults(50).getResultList();
		}
		
		return tq.getResultList();
	}
	
}
