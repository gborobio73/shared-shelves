package com.leeloo.tbe.isbn;

import java.util.Arrays;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

import com.leeloo.tbe.rest.jsonpojos.UiBook;

public class LookupService {

	public UiBook findBook(String isbn) throws Exception
	{
		
		String url = "http://www.adlibris.com/fi/product.aspx?isbn="+isbn;
		 
		Document doc = Jsoup.connect(url)
				  .data("query", "Java")
				  .userAgent("Mozilla")
				  .cookie("auth", "token")
				  .timeout(7000)
				  .post();			
		
		UiBook uiBook = new UiBook();
		uiBook.ownedByCurrentUser=true;
		
		Element title = doc.getElementsByAttributeValue("itemprop", "name").first();
		if ( title == null){
			throw new Exception(String.format("Adlibris does not have the book isbn %s", isbn));
		}
		uiBook.title = title.text().trim();
		
		Element author = doc.getElementById("ctl00_main_frame_ctrlproduct_rptAuthor_ctl00_linkAuthor");
		uiBook.authors = Arrays.asList(author.text().trim());
		
		Element desc = doc.getElementsByAttributeValue("itemprop", "description").first();
		uiBook.description = desc.text().trim();
		
		Element language = doc.getElementById("ctl00_main_frame_ctrlproduct_lblLanguage");
		if( language.text().trim().equals("espanja")){
			uiBook.language="es";
		}
		else if( language.text().trim().equals("suomi")){
			uiBook.language="fi";
		}			
		else if( language.text().trim().equals("englanti")){
			uiBook.language="en";
		}
		else {
			uiBook.language=language.text().trim();
		}
		
		Element pageCount = doc.getElementById("ctl00_main_frame_ctrlproduct_lblPages");
		uiBook.pageCount = pageCount.text().trim();
				
		Element image = doc.getElementById("ctl00_main_frame_ctrlproduct_imgProduct_ProductImageNotLinked");
		if(image.attr("src").trim().contains("noimage"))
		{
			uiBook.imageUrl = "http://books.google.fi/googlebooks/images/no_cover_thumb.gif";
			uiBook.hasImage=false;
		}else{
			uiBook.imageUrl = image.attr("src").trim();
			uiBook.hasImage=true;
		}	
		uiBook.isbn = isbn;
		
		Element subtitle = doc.getElementById("ctl00_main_frame_ctrlproduct_lblSubtitle");
		if (subtitle!= null){
			uiBook.subtitle = subtitle.text().trim();
		}
				
		return uiBook;
	}
}
