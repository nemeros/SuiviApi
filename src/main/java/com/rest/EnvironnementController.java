package com.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.entity.Environnement;
import com.pojo.EnvSearchRequest;
import com.pojo.EnvSearchResponse;
import com.repository.EnvironnementRepository;
import com.service.EnvSearchService;
import com.utils.Constant;

@RestController
@RequestMapping("api/env/")
public class EnvironnementController {
	
	@Autowired
	EnvSearchService envSearchService;
	
	@Autowired
	EnvironnementRepository envService;
	
	
	@RequestMapping(produces="application/json", method=RequestMethod.GET)
	public ResponseEntity<List<Environnement>> listAll(){
		return new ResponseEntity<List<Environnement>>(envService.findAll(), HttpStatus.OK);
	}

	@RequestMapping(consumes="application/json", produces="application/json", method=RequestMethod.POST)
	public ResponseEntity<List<EnvSearchResponse>> searchEnv(@RequestBody(required=true) EnvSearchRequest params){
		
		return new ResponseEntity<List<EnvSearchResponse>>(envSearchService.searchEnv(params, true), HttpStatus.OK);
	}
	
	@RequestMapping(value="file", method=RequestMethod.GET)
	public void getAllInFile(HttpServletResponse response) throws IOException{
		final Object [] FILE_HEADER = {"apimcId","environnement","artifactId","version","codeApplication","lastModified","lastDeployed","statut"};
		
		response.setContentType(Constant.CSV_CONTENT_TYPE);
		
		String headerKey = "Content-Disposition";
        String headerValue = String.format("attachment; filename=\"%s\"", "API_par_Environnement.csv");
        response.setHeader(headerKey, headerValue);
        
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
        response.setHeader("Pragma", "no-cache"); // HTTP 1.0
        response.setDateHeader("Expires", 0); // Proxies.
		
		List<EnvSearchResponse> lEnv = envSearchService.searchEnv(new EnvSearchRequest(), false);
		
		CSVFormat format = CSVFormat.DEFAULT
				.withRecordSeparator(Constant.CSV_RECORD_SEPARATOR)
				.withFirstRecordAsHeader()
				.withDelimiter(Constant.CSV_DELIMITER);

		try(CSVPrinter printer = new CSVPrinter(response.getWriter(), format)){
			printer.printRecord(FILE_HEADER);
			
			for(EnvSearchResponse pojo : lEnv){
				List<Object> record = new ArrayList<Object>();
				record.add(pojo.getId());
				record.add(pojo.getEnvironnement());
				record.add(pojo.getArtifactId());
				record.add(pojo.getVersion());
				record.add(pojo.getCodeApplication());
				record.add(pojo.getLastModified());
				record.add(pojo.getLastDeployed());
				record.add(pojo.getStatut());
				
				printer.printRecord(record);
			}
			
			printer.flush();
		}
	}
}
