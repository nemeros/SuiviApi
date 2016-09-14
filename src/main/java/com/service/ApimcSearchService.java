package com.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.entity.Apim;
import com.entity.ApimComposant;
import com.pojo.GenericSearchPojo;


/**
 * Service to handle complex search
 * @author abilbaut
 *
 */
@Service
public class ApimcSearchService {
	
	@Autowired
	private EntityManager em;
	
	/**
	 * Advanced criterion search for ApimComposant
	 * @param gsp
	 * @return List<ApimComposant>
	 */
	public List<ApimComposant> searchApimc(GenericSearchPojo gsp){
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<ApimComposant> query = builder.createQuery(ApimComposant.class);
		
		Root<ApimComposant>	apimComposant = query.from(ApimComposant.class);
		List<Predicate> apimcPredicate = new ArrayList<Predicate>();

		// WHERE EXISTS (SELECT 1 FROM APIM WHERE ....)
		if(gsp.getArtifactId() != null){
			Subquery<Apim> subQuery = query.subquery(Apim.class);
			Root<Apim> apim = subQuery.from(Apim.class);
			List<Predicate> apimPredicate = new ArrayList<Predicate>();
			subQuery.select(apim);
			
			apimPredicate.add(builder.equal(apim.get("id"), apimComposant.get("apim")));
			apimPredicate.add(builder.like(apim.<String>get("artifactId"), "%" + gsp.getArtifactId() + "%"));
			
			subQuery.where(apimPredicate.toArray(new Predicate[]{}));
			
			apimcPredicate.add(builder.exists(subQuery));
		}
		
		if(gsp.getListStatutSelected() != null && gsp.getListStatutSelected().size() > 0){
			Expression<String> expression = apimComposant.get("statut").get("id");
			apimcPredicate.add(expression.in(gsp.getListStatutSelected()));
		}
		
		if(!StringUtils.isEmpty(gsp.getCodeApplication())){
			apimcPredicate.add(builder.like(apimComposant.<String>get("codeApplication"), "%" + gsp.getCodeApplication() + "%"));
		}
		
		if(!StringUtils.isEmpty(gsp.getBasePath())){
			apimcPredicate.add(builder.like(apimComposant.<String>get("basePath"), "%" + gsp.getBasePath() + "%"));
		}
		
		// Fetch to avoid n nested query
		apimComposant.fetch("apim", JoinType.INNER);
		
		query.where(apimcPredicate.toArray(new Predicate[]{}));
		
		return em.createQuery(query.select(apimComposant)).setMaxResults(50).getResultList();
	}
}
