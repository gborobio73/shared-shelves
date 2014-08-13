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
		message.append("<html><head><title>Shared Shelves</title></head>");
		message.append("<body style =\"font:14px 'Lucida Sans', sans-serif;\">");
		message.append(String.format("<p>Hello %s,</p>",book.owner.getName()));		
		message.append(String.format("<p>I am contacting you regarding your book '%s' with the price of %s euros.</p>", book.title, book.price));
		message.append(String.format("<p>Please, contact me by replying to this email.</p>"));
		message.append(String.format("<p>Thank you,</p>"));
		message.append(String.format("<p>%s (via <a href=\"http://www.sharedshelves.net\">Shared Shelves</a>)</p>", currentUser.getName()));
		message.append("</body></html>");
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
