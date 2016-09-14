package com.conf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Main application bootstraping
 * run that class in an IDE to lauch the app 
 * 
 * @author abilbaut
 *
 */
@Configuration
@ComponentScan("com.*")
@EnableAutoConfiguration
public class Application extends SpringBootServletInitializer{
	
	/**
	 * Configuration for tomcat
	 */
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }
	
	public static void main(String[] args){
		SpringApplication.run(Application.class, args);
	}
	
}