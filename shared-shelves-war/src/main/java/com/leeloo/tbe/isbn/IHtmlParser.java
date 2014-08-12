package com.leeloo.tbe.isbn;

import java.util.List;

public interface IHtmlParser {
	
	public void parseHtml() throws Exception;
	
	public String getTitle();	
	public List<String> getAuthors();	
	public String getDescription();
	public String getPageCount();
	public String getLanguage();
	public String getImageLink();	
	public boolean hasImage();	
	public List<String> getCategories();
	public String getSubtitle();
	public String getIsbn();

}
