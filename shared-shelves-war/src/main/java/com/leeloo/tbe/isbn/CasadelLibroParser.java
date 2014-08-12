package com.leeloo.tbe.isbn;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class CasadelLibroParser implements IHtmlParser {

	private String title="", description="", pageCount = "", language ="", imageLink="", isbn;
	private List<String> authors = new ArrayList<String>(), categories = new ArrayList<String>();
	private boolean hasImage = false;
	private Document document;
	
	public CasadelLibroParser(Document doc, String isbn) {
		this.isbn = isbn;
		this.document = doc;
	}
	
	public void parseHtml() throws Exception {
		parseTitle();
		parseAuthors();
		parseDescription();			
		parseLanguageAndPageCount();		
		parseImageLink();
		parseCategories();
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
		return "";
	}
	
	public String getIsbn() {
		return isbn;
	}	
	
	private void parseTitle() throws Exception {
		Elements titleElement = document.getElementsByClass("book-header-2-title");		
		if(titleElement.isEmpty()) 
			throw new Exception(String.format("Casadellibro product page does not contain class book-header-2-title; cannot parse TITLE. ISBN %", isbn));		
		title = titleElement.first().ownText().trim();
	}
	
	private void parseAuthors() throws Exception {
		Elements authorContainer = document.getElementsByClass("book-header-2-subtitle");
		if(authorContainer.isEmpty()) throw new Exception(String.format("Casadellibro product page does not contain class book-header-2-subtitle; cannot parse AUTHOR. ISBN %", isbn));
		Element author = authorContainer.select("a[href]").first();
		authors = Arrays.asList(author.text().trim());
	}
	
	private void parseDescription() {
		Elements container = document.getElementsByClass("book-header-2-info");
		Element descriptionHtml = container.select("div.right > p").first();
		
		description = descriptionHtml.text().trim();
				
		if (descriptionHtml.text().indexOf("...") >0 ){
			description = descriptionHtml.text().substring(0, descriptionHtml.text().indexOf("...")).trim();
		}
	}	
	
	private void parseLanguageAndPageCount() {
		Element bookData = document.select("div.left > ul").first();
		Elements li = bookData.select("li");
				
		for (int i = 0; i < li.size(); i++) {
			String field = li.get(i).text();			
			String fieldName = field.split(":")[0];
			if(fieldName.contains("de páginas")){
				pageCount = field.split(":")[1].substring(0, field.indexOf("p") -1).trim();
			}
			if(fieldName.contains("engua")){
				String lang = field.split(":")[1].trim();
				if(lang.equals("CASTELLANO")){
					language = "es";
				}
				else if(lang.contains("CATAL")){
					language = "cat";
				}
				else if(lang.contains("INGL")){
					language = "en";
				}
				else
					language = lang;				
			}			
		}
	}
	
	private void parseImageLink() {
		Element image = document.getElementById("imgPrincipal");	
		
		if(image.attr("src").trim().contains("noimage") || image.attr("src").trim().equals("") || image.attr("src").trim().contains("defecto") )
		{
			imageLink = "http://books.google.fi/googlebooks/images/no_cover_thumb.gif";
			hasImage=false;
		}
		else{
			imageLink = image.attr("src").trim();
			hasImage = true;
		}
	}

	private void parseCategories() {
		Element breadCrumbs = document.getElementById("breadcrumbs");
		if(breadCrumbs != null){
			Elements list = breadCrumbs.getElementsByClass("bread");
			Elements li = list.select("li");			
			categories= Arrays.asList(li.get(li.size()-2).text().trim());
		}
	}	
}
