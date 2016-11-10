package com.leeloo.tbe.common;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.logging.Logger;

import com.leeloo.tbe.TbeUser;
import com.leeloo.tbe.rest.BookshelfApi;

public class TbeLogger {

	private static final Logger log = Logger.getLogger(BookshelfApi.class.getName());
	
	public void severe( String header, TbeUser user, Exception e)	{
		StringBuilder errorMessage = buildErrorMessage(header, user, e);		
        log.severe(errorMessage.toString().substring(0, 1024));
	}

	public void severe( String header, Exception e)	{
		StringBuilder errorMessage = buildErrorMessage(header, null, e);		
        log.severe(errorMessage.toString().substring(0, 1024));
	}

	public void warning( String header, TbeUser user, Exception e)	{
		StringBuilder errorMessage = buildErrorMessage(header, user, e);		
        log.warning(errorMessage.toString().substring(0, 1024));
	}
	
	public void warning( String header, Exception e)	{
		StringBuilder errorMessage = buildErrorMessage(header, null, e);		
        log.warning(errorMessage.toString().substring(0, 1024));
	}
	
	public void info( String message)	{		
        log.info(message);
	}
	
	private StringBuilder buildErrorMessage(String header, TbeUser user, Exception e) {
		StringBuilder errorMessage = new StringBuilder(255);
		String userEmail = user !=null? user.getEmail(): "no-user";
		errorMessage.append(String.format("%s. User %s",header, userEmail));
		errorMessage.append(System.lineSeparator());		
		errorMessage.append(String.format("Error: %s",e.getMessage()));
		errorMessage.append(System.lineSeparator());		
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		e.printStackTrace(pw);
		errorMessage.append(String.format("Stacktrace: %s",sw.toString()));
		return errorMessage;
	}
}
