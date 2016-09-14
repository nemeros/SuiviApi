package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.entity.RessComposant;

@Repository
public interface RessComposantRepository extends JpaRepository<RessComposant, Long> {
	
	@Query("SELECT ressc FROM RessComposant ressc JOIN FETCH ressc.ress")
	List<RessComposant> findAllWithJoin();
	
	@Query("SELECT new com.pojo.IdVersionPojo(ressc.id, ressc.version) FROM RessComposant ressc WHERE EXISTS (SELECT 1 FROM RessComposant b WHERE b.ress = ressc.ress and b.id = :id)")
	List<RessComposant> findAllAssociatedVersion(@Param("id") Long id);
	
	List<RessComposant> findTop3ByOrderByLastModifiedDesc();
	
	@Query("SELECT ressc.swagger FROM RessComposant ressc WHERE ressc.id = :id")
	String getSwaggerForOne(@Param("id") Long id);
	
	@Query("SELECT apimc.ressComposants FROM ApimComposant apimc WHERE apimc.id = :apimcId")
	List<RessComposant> findAssociatedRessource(@Param("apimcId") Long apimcId);
}
