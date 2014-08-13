package com.leeloo.tbe.isbn;

import java.util.List;

import com.leeloo.tbe.TbeUser;
import com.leeloo.tbe.common.TbeLogger;
import com.leeloo.tbe.rest.jsonpojos.UiBook;

public class LookupServiceRunner {

	private List<ILookupService> searchServices;
	private TbeUser user;
	
	public LookupServiceRunner(List<ILookupService> searchServices, TbeUser user)	{
		this.searchServices = searchServices;
		this.user = user;
	}
	
	public UiBook runSearch(String isbn)
	{
		boolean notFound = true;
		UiBook book  = new UiBook();
		
		for(int i = 0; i < searchServices.size() && notFound; i++) {
			ILookupService service = searchServices.get(i);
			try {
				book = service.findBook(isbn);
				notFound=false;
			} catch (Exception e) {				
				logNotFoundError(isbn, service, e);
			}
		}
		if(notFound) return new UiBook();
		else return book;
	}

	private void logNotFoundError(String isbn, ILookupService service, Exception e) {
		String header = String.format("%s: error searching for book %s",service.getClass().getSimpleName(), isbn );
		new TbeLogger().warning(header, user, e);
	}
	
}
