package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.entity.ApimComposant;
import com.pojo.IdVersionPojo;

@Repository
public interface ApimComposantRepository extends JpaRepository<ApimComposant, Long> {

	@Query("SELECT apimc FROM ApimComposant apimc JOIN FETCH apimc.apim")
	List<ApimComposant> findAllWithJoin();
	
	@Query("SELECT new com.pojo.IdVersionPojo(apimc.id, apimc.version) FROM ApimComposant apimc WHERE EXISTS (SELECT 1 FROM ApimComposant b WHERE b.apim = apimc.apim and b.id = :id)")
	List<IdVersionPojo> findAllAssociatedVersion(@Param("id") Long id);
	
	List<ApimComposant> findTop3ByOrderByLastModifiedDesc();
	
	@Query("SELECT apimc.swagger FROM ApimComposant apimc WHERE apimc.id = :id")
	String getSwaggerForOne(@Param("id") Long id);
	
	@Query("SELECT ressc.apimComposants FROM RessComposant ressc WHERE ressc.id = :resscId")
	List<ApimComposant> findAssociatedApim(@Param("resscId") Long resscId);
	
}
