package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Environnement;

@Repository
public interface EnvironnementRepository extends JpaRepository<Environnement, String> {

}
