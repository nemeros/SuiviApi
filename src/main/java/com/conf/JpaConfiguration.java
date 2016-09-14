package com.conf;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Dummy configuration class for jpa/hibernate specific configuration
 * @author abilbaut
 *
 */
@Configuration
@EnableJpaRepositories(basePackages={"com.repository"})
@EntityScan(basePackages={"com.entity"})
public class JpaConfiguration {

}
