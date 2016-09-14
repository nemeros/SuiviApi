package com.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.entity.EnvApimcRelation;

@Repository
@Transactional
public interface EnvApimcRelationRepository extends JpaRepository<EnvApimcRelation, Long> {

	@Query("SELECT rel FROM EnvApimcRelation rel JOIN FETCH rel.environnement WHERE rel.apimcId = :id ORDER BY rel.lastModified desc")
	List<EnvApimcRelation> findAllEnvAssociatedWithApimc(@Param("id") Long apimcId);
}
