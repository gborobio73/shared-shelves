package com.leeloo.tbe;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class TbeUser {

	@Id private String userId;
	private String name;
	@Index private String email;
	private String nickname;
	
	public TbeUser(){}
	
	public TbeUser(String userId, String name, String email, String nickname) {
		this.userId = userId;
		this.name= name;
		this.email= email;
		this.nickname= nickname;
	}

	public String getName(){
		return this.name;
	}
	
	public String getEmail(){
		return this.email;
	}

	public String getNickname() {
		return this.nickname;
	}
}
