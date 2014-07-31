package com.leeloo.tbe.book;

import java.util.Date;
import java.util.List;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.leeloo.tbe.TbeUser;

@Entity
public class Book {

	@Id public Long id;
	public TbeUser owner;
	public String title;
	public String subtitle;
	public String description;
	public List<String> authors;
	public String language;
	public String pageCount;
	public List<String> categories;
	public boolean hasImage;
	public String imageUrl;
	public String isbn;	
	@Index public Date created;
	public String location;
	public int price;	
	
	public Book(){	}
	
	public Book(Date created)
	{
		this.created= created;		
	}

	public void setOwner(TbeUser user) {
		this.owner = user;
	}

	public boolean isItOwnedBy(TbeUser user) {
		return this.owner.getEmail().equals(user.getEmail());
	}
}

