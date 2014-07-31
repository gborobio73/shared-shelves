package com.leeloo.tbe.repository;

import static com.googlecode.objectify.ObjectifyService.ofy;
import static com.googlecode.objectify.ObjectifyService.register;

import java.util.List;

import com.leeloo.tbe.TbeUser;
import com.leeloo.tbe.book.Book;

public class BookshelfRepository {
	public BookshelfRepository(){
		register(Book.class);
		register(TbeUser.class);
	}
	public List<Book> getAll()	{
		return ofy().load().type(Book.class).order("-created").list();
	}

	public List<Book> getFromUser(TbeUser user)	{
		return ofy().load().type(Book.class).filter("owner.email", user.getEmail()).order("-created").list();
	}
	
	public void save(Book book) {
    	ofy().save().entity(book).now();		
	}
	
	public Book get(Long bookId) {
		Book b= ofy().load().type(Book.class).id(bookId).now();
		
		return b;
	}
	public void delete(Book book) {
		 ofy().delete().entities(book).now();
	}
}
