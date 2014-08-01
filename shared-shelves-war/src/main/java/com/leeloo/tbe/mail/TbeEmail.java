package com.leeloo.tbe.mail;

import com.leeloo.tbe.TbeUser;
import com.leeloo.tbe.book.Book;

public class TbeEmail {

	private TbeUser currentUser;
	private Book book;
	
	public TbeEmail(TbeUser currentUser, Book book) {
		this.currentUser = currentUser ;
		this.book = book;
	}

	public String getFrom() {
		return this.currentUser.getEmail();		
	}

	public String getMessage() {
		StringBuilder message = new StringBuilder(255);
		
		message.append(String.format("Hello %s,",book.owner.getName()));
		message.append(System.lineSeparator());
		message.append(System.lineSeparator());
		message.append(String.format("I am contacting you regarding your book '%s' with the price of %s euros.", book.title, book.price));
		message.append(System.lineSeparator());
		message.append(System.lineSeparator());
		message.append(String.format("Please, contact me by replying to this email."));
		message.append(System.lineSeparator());
		message.append(System.lineSeparator());
		message.append(String.format("Thank you,"));
		message.append(System.lineSeparator());
		message.append(System.lineSeparator());
		message.append(String.format("%s (via Shared Shelves)", currentUser.getName()));
		
		return message.toString();
	}

	public String getTo() {
		return this.book.owner.getEmail();
	}
	
	public String getCC() {		
		return this.currentUser.getEmail();
	}

	public String getSubject() {
		return String.format("Shared Shelves: '%s'", book.title);
	}
}
