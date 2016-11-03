package com.leeloo.tbe.rest.jsonpojos;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.leeloo.tbe.TbeUser;
import com.leeloo.tbe.book.Book;

public class UiBookMapper {
	
	public List<UiBook> map (List<Book> books, TbeUser user)
	{
		List<UiBook> uiBooks = new ArrayList<UiBook>();
		for(Book book : books)
		{
			uiBooks.add(map(book, user));
		}
		return uiBooks ;
	}
	
	public UiBook map (Book book, TbeUser user)
	{
		UiBook uiBook = new  UiBook();
		uiBook.id = book.id.toString();
		uiBook.title= book.title;
		uiBook.subtitle = book.subtitle;
		uiBook.authors = book.authors;		
		uiBook.description =book.description; 
		uiBook.hasImage = book.hasImage;
		uiBook.imageUrl = encodeURL(book.imageUrl);	
		uiBook.isbn = book.isbn;
		uiBook.created = book.created;
		uiBook.language=getLanguage(book);		
		uiBook.ownedByCurrentUser = book.isItOwnedBy(user); 
		uiBook.location= book.location;
		uiBook.price= book.price;
		uiBook.pageCount= book.pageCount;
		uiBook.categories = book.categories;
		return uiBook;
	}	

	public Book map (NewBook newBook)
	{
		Book book = new Book(new Date());
		
		book.title= newBook.title;
		book.subtitle= newBook.subtitle;
		book.description= newBook.description;
		book.authors= newBook.authors;
		book.language= newBook.language;
		book.pageCount= newBook.pageCount;
		book.categories= newBook.categories;
		book.hasImage = newBook.hasImage;
		book.imageUrl= newBook.imageUrl;
		book.isbn= newBook.isbn;
		book.location= newBook.location;
		book.price= newBook.price;		
		return book;
	}
	
	private String getLanguage(Book book) {
		if(book.language.toUpperCase().equals("EN")) return "English";
		if(book.language.toUpperCase().equals("ES")) return "Spanish";
		if(book.language.toUpperCase().equals("FI")) return "Finnish";
		if(book.language.toUpperCase().equals("SV") || 
				book.language.toUpperCase().equals("RUOTSI")) return "Swedish";
		
		return book.language;
	
	}
	
	private String encodeURL(String imageUrl) {
		return imageUrl;
//		try {
//			String encoded =  URLEncoder.encode(imageUrl, "UTF-8");
//			return "/rest/images/"+ encoded;
//		} catch (UnsupportedEncodingException e) {
//			return "";
//		}
	}
}
