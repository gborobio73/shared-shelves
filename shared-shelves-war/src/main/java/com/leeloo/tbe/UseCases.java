package com.leeloo.tbe;

import com.leeloo.tbe.book.Book;
import com.leeloo.tbe.mail.MailService;
import com.leeloo.tbe.mail.TbeEmail;
import com.leeloo.tbe.repository.BookshelfRepository;
import com.leeloo.tbe.rest.jsonpojos.UiBook;

public class UseCases {
	private BookshelfRepository repo = new BookshelfRepository();
	
	public void addToBookshelf(Book book, TbeUser user) {
		if (book.imageUrl.trim().isEmpty())
		{
			book.imageUrl = "http://books.google.fi/googlebooks/images/no_cover_thumb.gif";
		}
		book.hasImage = true;
		book.setOwner(user);		
		repo.save(book);		
	}

	public void deleteBook(Long bookId, TbeUser user) {
		Book book = repo.get(bookId);
		
		if(book != null)
		{
			if(book.isItOwnedBy(user)){
				repo.delete(book);
			}
		}
		
	}

	public void updateBook(String bookId, String description, String location,int price, TbeUser user) {
		Book book = repo.get(Long.parseLong(bookId));
		
		if(book != null)
		{
			if(book.isItOwnedBy(user)){
				book.description = description;
				book.location = location;
				book.price = price;
				repo.save(book);
			}
		}		
	}
	
	public void sendMessageToOwner(TbeUser currentUser, String bookId) throws Exception {
		Book book = repo.get(Long.parseLong(bookId));
		
		if(book != null)
		{
			if(!book.isItOwnedBy(currentUser)){
				TbeEmail email = new TbeEmail(currentUser, book);
				new MailService().send(email);
			}
		}
		
	}

	
}
