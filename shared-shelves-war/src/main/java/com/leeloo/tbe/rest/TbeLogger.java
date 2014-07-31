package com.leeloo.tbe.rest;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.logging.Logger;

import com.leeloo.tbe.TbeUser;

public class TbeLogger {

	private static final Logger log = Logger.getLogger(BookshelfApi.class.getName());
	
	public void severe( String header, TbeUser user, Exception e)	{
		StringBuilder errorMessage = new StringBuilder(255);		
		errorMessage.append(String.format("%s. User %s",header, user.getEmail()));
		errorMessage.append(System.lineSeparator());
		errorMessage.append(String.format("Error: %s",e.getMessage()));
		errorMessage.append(System.lineSeparator());		
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		e.printStackTrace(pw);
		errorMessage.append(String.format("Stacktrace: %s",sw.toString()));		
        log.severe(errorMessage.toString().substring(0, 1024));
	}
}
