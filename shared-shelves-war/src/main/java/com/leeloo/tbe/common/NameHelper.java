package com.leeloo.tbe.common;

public class NameHelper {

	public String toCamelCase(String name) {
		String[] parts = name.split(" ");
		String camelCaseString = "";
		for (String part : parts){
			camelCaseString = camelCaseString + " " + toProperCase(part);
		}
		return camelCaseString.trim();
	}

	private String toProperCase(String part) {		
		return part.substring(0, 1).toUpperCase() + part.substring(1).toLowerCase();
	}

}
