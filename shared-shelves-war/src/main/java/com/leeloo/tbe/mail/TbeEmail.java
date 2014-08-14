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
		addContentInEnglish(message);
		message.append("<hr align=\"left\" width=\"50%\">");
		addContentInFinnish(message);
		message.append("<hr align=\"left\" width=\"50%\">");
		addContentInSpanish(message);
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
	
	private void addContentInEnglish(StringBuilder message) {
		message.append(String.format("<p>Hello %s,</p>",book.owner.getName()));		
		message.append(String.format("<p>I am contacting you regarding your book '%s' with the price of %s €.</p>", book.title, book.price));
		message.append("<p>Please, contact me by replying to this email.</p>");
		message.append("<p>Thank you,</p>");
		message.append(String.format("<p>%s (via <a href=\"http://www.sharedshelves.net\">Shared Shelves</a>)</p>", currentUser.getName()));
	}
	
	private void addContentInFinnish(StringBuilder message) {
		message.append(String.format("<p>Hei %s,</p>",book.owner.getName()));		
		message.append(String.format("<p>Otan yhteyttä koskien kirjaasi '%s', jonka hinta on %s €.</p>", book.title, book.price));
		message.append("<p>Ole hyvä ja ota minuun yhteyttä vastaamalla tähän sähköpostiin.</p>");
		message.append("<p>Kiitos,</p>");
		message.append(String.format("<p>%s (via <a href=\"http://www.sharedshelves.net\">Shared Shelves</a>)</p>", currentUser.getName()));
	}
	
	private void addContentInSpanish(StringBuilder message) {
		message.append(String.format("<p>Hola %s,</p>",book.owner.getName()));		
		message.append(String.format("<p>Me pongo en contacto contigo por el libro '%s' con precio %s €.</p>", book.title, book.price));
		message.append("<p>Por favor, contacta conmigo respondiendo a este email.</p>");
		message.append("<p>Gracias,</p>");
		message.append(String.format("<p>%s (via <a href=\"http://www.sharedshelves.net\">Shared Shelves</a>)</p>", currentUser.getName()));
	}
}
