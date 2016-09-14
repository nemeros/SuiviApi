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

import com.entity.Ress;
import com.entity.RessComposant;
import com.pojo.GenericSearchPojo;

/**
 * Service to handle complex search
 * @author abilbaut
 *
 */
@Service
public class ResscSearchService {
	
	@Autowired
	private EntityManager em;
	
	
	/**
	 * Advanced criterion search for RessComposant
	 * @param gsp
	 * @return List<ApimComposant>
	 */
	public List<RessComposant> searchRessc(GenericSearchPojo gsp){
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<RessComposant> query = builder.createQuery(RessComposant.class);
		
		Root<RessComposant>	ressComposant = query.from(RessComposant.class);
		List<Predicate> resscPredicate = new ArrayList<Predicate>();

		// WHERE EXISTS (SELECT 1 FROM RESS WHERE ....)
		if(gsp.getArtifactId() != null){
			Subquery<Ress> subQuery = query.subquery(Ress.class);
			Root<Ress> ress = subQuery.from(Ress.class);
			List<Predicate> ressPredicate = new ArrayList<Predicate>();
			subQuery.select(ress);
			
			ressPredicate.add(builder.equal(ress.get("id"), ressComposant.get("ress")));
			ressPredicate.add(builder.like(ress.<String>get("artifactId"), "%" + gsp.getArtifactId() + "%"));
			
			subQuery.where(ressPredicate.toArray(new Predicate[]{}));
			
			resscPredicate.add(builder.exists(subQuery));
		}
		
		if(gsp.getListStatutSelected() != null && gsp.getListStatutSelected().size() > 0){
			Expression<String> expression = ressComposant.get("statut").get("id");
			
			resscPredicate.add(expression.in(gsp.getListStatutSelected()));
		}
		
		if(!StringUtils.isEmpty(gsp.getCodeApplication())){
			resscPredicate.add(builder.like(ressComposant.<String>get("codeApplication"), "%" + gsp.getCodeApplication() + "%"));
		}
		
		if(!StringUtils.isEmpty(gsp.getTags())){
			resscPredicate.add(builder.like(ressComposant.<String>get("tags"), "%" + gsp.getTags() + "%"));
		}
		
		// Fetch to avoid n nested query
		ressComposant.fetch("ress", JoinType.INNER);
		
		query.where(resscPredicate.toArray(new Predicate[]{}));
		
		return em.createQuery(query.select(ressComposant)).setMaxResults(50).getResultList();
	}
}
