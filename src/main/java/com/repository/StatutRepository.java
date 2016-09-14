package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Statut;

@Repository
public interface StatutRepository extends JpaRepository<Statut, String>{

}
