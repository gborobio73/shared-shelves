package com.leeloo.tbe.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.leeloo.tbe.TbeUser;
import com.leeloo.tbe.TbeUserService;
import com.leeloo.tbe.UseCases;
import com.leeloo.tbe.book.Book;
import com.leeloo.tbe.isbn.LookupService;
import com.leeloo.tbe.repository.BookshelfRepository;
import com.leeloo.tbe.rest.jsonpojos.NewBook;
import com.leeloo.tbe.rest.jsonpojos.UiBook;
import com.leeloo.tbe.rest.jsonpojos.UiBookMapper;


@Path("books")
public class BookshelfApi {
	private  Gson gson = new Gson();	
	private TbeUserService userService= new TbeUserService();
	private BookshelfRepository repository = new BookshelfRepository();
	
    @GET
    @Path("/all")
    @Produces({ MediaType.APPLICATION_JSON })
    public Response getAllBooks() {
        if (!userService.isUserLoggedIn()) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        } 
        
        List<UiBook> books = new UiBookMapper().map(repository.getAll(), userService.getCurrentUser());
        
        return Response.ok().entity(gson.toJson(books)).build();
    }

    @POST
    @Path("/add")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addBook(NewBook newBook) {
    	if (!userService.isUserLoggedIn()) {
	        return Response.status(Response.Status.UNAUTHORIZED).build();
	    } 
    	
    	TbeUser user = userService.getCurrentUser();
    	try{
	    	Book book = new UiBookMapper().map(newBook);
	    	new UseCases().addToBookshelf(book, user);
		    return Response.ok().build();
    	}
    	catch(Exception e){
    		String header = String.format("Error adding book %s",gson.toJson(newBook) );
    		new TbeLogger().severe(header, user, e);
    		return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    	}
    }
    
    @GET
    @Path("/user")
    @Produces({ MediaType.APPLICATION_JSON })
    public Response getUserBooks() {
        if (!userService.isUserLoggedIn()) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        } 

        TbeUser currentUser = userService.getCurrentUser();

        List<UiBook> books =  new UiBookMapper().map(repository.getFromUser(currentUser), currentUser);
        return Response.ok().entity(gson.toJson(books)).build();
    }

    @POST
    @Path("/delete")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response removeBook(String bookId) {
    	if (!userService.isUserLoggedIn()) {
	        return Response.status(Response.Status.UNAUTHORIZED).build();
	    } 
    	
    	TbeUser user = userService.getCurrentUser();
    	try{
    		new UseCases().deleteBook(Long.parseLong(bookId), user);
    		return Response.ok().build();
    	}
		catch(Exception e){
			String header = String.format("Error removing bookId %s",bookId);
			new TbeLogger().severe(header, user, e);
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}	    
    }    
    
    @GET
    @Path("/{id}")
    @Produces({ MediaType.APPLICATION_JSON })
    public Response getBook(@PathParam("id") String bookId) {
    	 if (!userService.isUserLoggedIn()) {
             return Response.status(Response.Status.UNAUTHORIZED).build();
         } 
        
    	Book book = repository.get(Long.parseLong(bookId));
    	if(book == null){
    		return Response.status(Response.Status.NOT_FOUND).build();
    	}
        UiBook uiBook =  new UiBookMapper().map(book, userService.getCurrentUser());
        return Response.ok().entity(gson.toJson(uiBook)).build();
    }
    
    @POST
    @Path("/save")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveBook(UiBook book) {
    	if (!userService.isUserLoggedIn()) {
	        return Response.status(Response.Status.UNAUTHORIZED).build();
	    } 
    	
    	TbeUser user = userService.getCurrentUser();
    	try{
    		new UseCases().updateBook(book.id, book.description, book.location, book.price, user);
    		return Response.ok().build();
	    }
		catch(Exception e){
			String header = String.format("Error saving bookId %s with %s, %s, %s.",book.id,book.description, book.location, book.price);
			new TbeLogger().severe(header, user, e);
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}	    
    }
    
    @POST
    @Path("/message")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response messageOwner(String bookId) {
    	
    	if (!userService.isUserLoggedIn()) {
	        return Response.status(Response.Status.UNAUTHORIZED).build();
	    }     	
    	TbeUser user = userService.getCurrentUser();
    	try{
    		new UseCases().sendMessageToOwner(user, bookId);
    	    return Response.ok().build();    	    
    	}
    	catch(Exception e){
    		String header = String.format("Error sending message to owner: book id %s",bookId );
    		new TbeLogger().severe(header, user, e);
    		return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    	}
    }
    
    @GET
    @Path("/search/{isbn}")
    @Produces({ MediaType.APPLICATION_JSON })
    public Response searchBook(@PathParam("isbn") String isbn) {
    	if (!userService.isUserLoggedIn()) {
             return Response.status(Response.Status.UNAUTHORIZED).build();
        } 
        
    	try{
    		LookupService service = new LookupService();
    		UiBook uiBook = service.findBook(isbn);
    		
    		return Response.ok().entity(gson.toJson(uiBook)).build();    		
    	}
    	catch(Exception e){
    		TbeUser user = userService.getCurrentUser();
    		String header = String.format("Error searching for book %s",isbn );
    		new TbeLogger().severe(header, user, e);
    		
    		return Response.status(Response.Status.NOT_FOUND).build();
    	}
    	        
    }
    
}
