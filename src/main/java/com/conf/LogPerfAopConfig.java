package com.conf;

import org.apache.log4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * If log.perf.enabled then all access to target package classes will be time monitored
 * The result is in ms
 * 
 * @author abilbaut
 *
 */
@Aspect
@Component
public class LogPerfAopConfig {
	
	private final static Logger log = Logger.getLogger(LogPerfAopConfig.class);
	
	
	@Value("${log.perf.enabled}")
	private Boolean logPerfEnabled;
	
	/**
	 * Around advice to monitor dao
	 * 
	 * @param joinPoint
	 * @return
	 * @throws Throwable
	 */
	@Around("execution(* com.repository.*.*(..))")
	private Object logDaoPerf(ProceedingJoinPoint joinPoint) throws Throwable{
		return this.logIt(joinPoint);
	}
	
	/**
	 * Around advice to monitor service
	 * 
	 * @param joinPoint
	 * @return
	 * @throws Throwable
	 */
	@Around("execution(* com.service.*.*(..))")
	private Object logServicePerf(ProceedingJoinPoint joinPoint) throws Throwable{
		return this.logIt(joinPoint);
	}
	
	/**
	 * log timer
	 * 
	 * @param joinPoint
	 * @return
	 * @throws Throwable
	 */
	private Object logIt(ProceedingJoinPoint joinPoint) throws Throwable{
		long delta = System.currentTimeMillis();
		
		try{
			return joinPoint.proceed();
		}catch(Throwable t){
			throw t;
		}finally{
			if(logPerfEnabled){
				delta = System.currentTimeMillis() - delta;
				log.info("{\"method\":\"" + joinPoint.getSignature() + "\", \"temps\":" + delta + "}");
			}			
		}		
	}
}
