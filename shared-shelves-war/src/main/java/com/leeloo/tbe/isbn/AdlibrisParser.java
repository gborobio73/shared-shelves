package com.leeloo.tbe.isbn;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class AdlibrisParser implements IHtmlParser {
	private String title="", description="", pageCount = "", language ="", imageLink="", subtitle="", isbn;
	private List<String> authors = new ArrayList<String>(), categories = new ArrayList<String>();
	private boolean hasImage = false;
	private Document doc;
	
	public AdlibrisParser(Document doc, String isbn) {
		this.isbn = isbn;
		this.doc = doc;
	}

	public void parseHtml() throws Exception{
		
		parseTitle();	
		parseAuthor();
		parseDescription();
		parseLanguage();
		parsePageCount();
		parseImageLink();	
		parseSubtitle();
	}

	public String getTitle() {		
		return title;
	}
	
	public List<String> getAuthors() {
		return authors;
	}
	
	public String getDescription() {
		return description;
	}

	public String getPageCount() {
		return pageCount;
	}

	public String getLanguage() {
		return language;
	}
	
	public String getImageLink() {
		return imageLink;
	}
	
	public boolean hasImage() {
		return hasImage;
	}
	
	public List<String> getCategories() {		
		return categories;
	}

	public String getSubtitle() {
		return subtitle;
	}

	public String getIsbn() {
		return isbn;
	}
	
	private void parseSubtitle() {
		Element subtitleHtml = doc.getElementById("ctl00_main_frame_ctrlproduct_lblSubtitle");
		if (subtitleHtml!= null){
			subtitle = subtitleHtml.text().trim();
		}
	}

	private void parseImageLink() {
		Element imageLinkHtml = doc.getElementById("ctl00_main_frame_ctrlproduct_imgProduct_ProductImageNotLinked");
		if(imageLinkHtml.attr("src").trim().contains("noimage"))
		{
			imageLink = "http://books.google.fi/googlebooks/images/no_cover_thumb.gif";
			hasImage=false;
		}else{
			imageLink = imageLinkHtml.attr("src").trim();
			hasImage=true;
		}
	}

	private void parsePageCount() {
		Element pageCountHtml = doc.getElementById("ctl00_main_frame_ctrlproduct_lblPages");
		pageCount = pageCountHtml.text().trim();
	}

	private void parseLanguage() {
		Element languageHtml = doc.getElementById("ctl00_main_frame_ctrlproduct_lblLanguage");
		if(languageHtml.text().trim().equals("espanja")){
			language="es";
		}
		else if(languageHtml.text().trim().equals("suomi")){
			language="fi";
		}			
		else if(languageHtml.text().trim().equals("englanti")){
			language="en";
		}
		else {
			language=languageHtml.text().trim();
		}
	}

	private void parseDescription() {
		Elements container = doc.getElementsByClass("productDescription");
		description = container.text().trim();
		if(description.substring(0, 7).equals("Kuvaus:"))
		{
			description = description.substring(description.indexOf("Kuvaus:") + 7).trim();
		}
	}

	private void parseAuthor() {
		Element author = doc.getElementById("ctl00_main_frame_ctrlproduct_rptAuthor_ctl00_linkAuthor");
		if(author == null){
			authors = Arrays.asList();
		}else{
			authors = Arrays.asList(author.text().trim());
		}
	}

	private void parseTitle() throws Exception {
		Element titleHtml = doc.getElementsByAttributeValue("itemprop", "name").first();
		if ( titleHtml == null){
			throw new Exception(String.format("Adlibris does not have the book isbn %s", isbn));
		}
		title = titleHtml.text().trim();
	}
}
