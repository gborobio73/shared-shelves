package com.leeloo.tbe.isbn;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import com.leeloo.tbe.rest.jsonpojos.UiBook;

public class FiLookupService implements ILookupService{
	
	public UiBook findBook(String isbn) throws Exception
	{
		String url = "http://www.adlibris.com/fi/product.aspx?isbn="+isbn;
		 
		Document doc = Jsoup.connect(url)
				  .data("query", "Java")
				  .userAgent("Mozilla")
				  .cookie("auth", "token")
				  .timeout(7000)
				  .post();			
		
		UiBookBuilder builder = new UiBookBuilder(new AdlibrisParser(doc,  isbn));
		
		return builder.build();
	}
}
