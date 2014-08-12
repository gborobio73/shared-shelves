package com.leeloo.tbe.isbn;

import com.leeloo.tbe.rest.jsonpojos.UiBook;

public interface ILookupService {
	public UiBook findBook(String isbn) throws Exception;
}
