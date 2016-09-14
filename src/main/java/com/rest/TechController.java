package com.rest;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * BackEnd Tech service
 * 
 * @author abilbaut
 *
 */
@RestController
@RequestMapping(value="api/tech/")
public class TechController {

	private final static Logger log = Logger.getLogger(TechController.class);
	
	/**
	 * Log the front-end errors
	 * 
	 * @param msg
	 */
	@RequestMapping(value="logError", consumes="text/plain", method=RequestMethod.PUT)
	@ResponseStatus(value=HttpStatus.OK)
	public void logTechnicalError(@RequestBody String msg){
		log.error(msg);
	}
}
