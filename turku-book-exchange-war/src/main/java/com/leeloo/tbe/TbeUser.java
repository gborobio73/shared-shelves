package com.leeloo.tbe;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class TbeUser {

	@Id private String userId;
	private String name;
	@Index private String email;
	
	public TbeUser(){}
	
	public TbeUser(String userId, String name, String email) {
		this.userId = userId;
		this.name= name;
		this.email= email;
	}

	public String getName(){
		return this.name;
	}
	
	public String getEmail(){
		return this.email;
	}
}
