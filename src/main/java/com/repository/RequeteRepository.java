package com.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.entity.Requete;
import com.pojo.PathSearchResponse;

@Repository
public interface RequeteRepository extends JpaRepository<Requete, Long> {
	List<Requete> findByRessComposantId(Long id);
	
	
	@Query("SELECT new com.pojo.PathSearchResponse(r.id, r.verb, r.path, r.summary, ressc.id, ress.artifactId, ressc.version) FROM Requete r JOIN r.ressComposant ressc JOIN ressc.ress ress WHERE r.path LIKE :path")
	List<PathSearchResponse> searchByPath(@Param("path") String path, Pageable pageable);
}
