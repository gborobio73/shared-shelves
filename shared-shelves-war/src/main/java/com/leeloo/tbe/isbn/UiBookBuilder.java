package com.leeloo.tbe.isbn;

import com.leeloo.tbe.rest.jsonpojos.UiBook;

public class UiBookBuilder {
	
	private IHtmlParser parser;

	public UiBookBuilder(IHtmlParser parser){
		this.parser=parser;
	}
	
	public UiBook build() throws Exception
	{
		parser.parseHtml();
		
		UiBook uiBook = new UiBook();
		uiBook.ownedByCurrentUser=true;
		
		uiBook.title = parser.getTitle();
		uiBook.authors = parser.getAuthors();
		uiBook.description = parser.getDescription();
		uiBook.language=parser.getLanguage();
		uiBook.pageCount = parser.getPageCount();
		uiBook.imageUrl = parser.getImageLink();
		uiBook.hasImage= parser.hasImage();		
		uiBook.isbn = parser.getIsbn();
		uiBook.subtitle = parser.getSubtitle();
		uiBook.categories = parser.getCategories();
		return uiBook;
	}

}
