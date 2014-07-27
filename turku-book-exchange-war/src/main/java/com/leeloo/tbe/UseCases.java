package com.leeloo.tbe;

import com.leeloo.tbe.book.Book;
import com.leeloo.tbe.mail.MailService;
import com.leeloo.tbe.mail.TbeEmail;
import com.leeloo.tbe.repository.BookshelfRepository;
import com.leeloo.tbe.rest.jsonpojos.UiBook;

public class UseCases {
	private BookshelfRepository repo = new BookshelfRepository();
	
	public void addToBookshelf(Book book, TbeUser user) {
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

	public void saveBook(UiBook bookToSave, TbeUser user) {
		Book book = repo.get(Long.parseLong(bookToSave.id));
		
		if(book != null)
		{
			if(book.isItOwnedBy(user)){
				book.description = bookToSave.description;
				book.location = bookToSave.location;
				book.price = bookToSave.price;
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
