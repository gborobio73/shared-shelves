package com.leeloo.tbe.rest;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import com.leeloo.tbe.TbeUser;
import com.leeloo.tbe.TbeUserService;
import com.leeloo.tbe.rest.jsonpojos.UiUser;

@Path("user")
public class UserApi {

	private TbeUserService userService= new TbeUserService();
	
    @Context
    HttpServletResponse response;
    @Context
    HttpServletRequest request;

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    public Response getCurrentUser() throws IOException {
        
        TbeUser currentUser = userService.getCurrentUser();
        UiUser tbeUser;
        if (currentUser != null) {
            
            tbeUser = new UiUser(currentUser.getNickname());
        } else {
        	tbeUser = new UiUser("guest");
        }
        Gson gson = new Gson();
        return Response.ok().entity(gson.toJson(tbeUser)).build();
        
    }   
}
