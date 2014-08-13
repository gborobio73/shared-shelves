package com.leeloo.tbe.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.leeloo.tbe.TbeUser;
import com.leeloo.tbe.TbeUserService;
import com.leeloo.tbe.common.TbeLogger;
import com.leeloo.tbe.isbn.EsLookupService;
import com.leeloo.tbe.isbn.FiLookupService;
import com.leeloo.tbe.isbn.ILookupService;
import com.leeloo.tbe.isbn.LookupServiceRunner;
import com.leeloo.tbe.isbn.LookupServiceRunnerFactory;
import com.leeloo.tbe.rest.jsonpojos.UiBook;


@Path("books")
public class SearchBooksApi {
	private  Gson gson = new Gson();	
	private TbeUserService userService= new TbeUserService();
	
	@GET
    @Path("/search/{lang}/{isbn}")
    @Produces({ MediaType.APPLICATION_JSON })
    public Response searchBook(@PathParam("lang") String lang, @PathParam("isbn") String isbn) {
		if (!userService.isUserLoggedIn()) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		} 
		
		LookupServiceRunner lookupServiceRunner = new LookupServiceRunnerFactory().build(userService.getCurrentUser(), lang); 		
		UiBook book = lookupServiceRunner.runSearch(isbn);
		
		if(book.title!= null && book.title.length()>0){
			return Response.ok().entity(gson.toJson(book)).build();
		}else{
			return Response.status(Response.Status.NOT_FOUND).build();
		}
    }
    /*
    @GET
    @Path("/search/fi/{isbn}")
    @Produces({ MediaType.APPLICATION_JSON })
    public Response searchFinnishBook(@PathParam("isbn") String isbn) {
    	if (!userService.isUserLoggedIn()) {
             return Response.status(Response.Status.UNAUTHORIZED).build();
        } 
    	return searchBook(isbn, new FiLookupService());    		       
    }

	@GET
    @Path("/search/es/{isbn}")
    @Produces({ MediaType.APPLICATION_JSON })
    public Response searchSpanishBook(@PathParam("isbn") String isbn) {
    	if (!userService.isUserLoggedIn()) {
             return Response.status(Response.Status.UNAUTHORIZED).build();
        } 
        
    	return searchBook(isbn, new EsLookupService());    		    		
    }
	
	private Response searchBook(String isbn, ILookupService lookupService){
		try{
	
			UiBook uiBook = lookupService.findBook(isbn);		
			return Response.ok().entity(gson.toJson(uiBook)).build();
		}
    	catch(Exception e){
    		TbeUser user = userService.getCurrentUser();
    		String header = String.format("%s: error searching for book %s",lookupService.getClass().getSimpleName(), isbn );
    		new TbeLogger().severe(header, user, e);
    		
    		return Response.status(Response.Status.NOT_FOUND).build();
    	}
	}*/
}
