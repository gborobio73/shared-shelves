package com.leeloo.tbe.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;

@Path("url")
public class UrlApi {
    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    public Response getUrl() {

        String loginURL="";
        String logoutURL="";
        UserService userService = UserServiceFactory.getUserService();
        
        loginURL = userService.createLoginURL("/#/Bookshelf");
        logoutURL = userService.createLogoutURL("/#/Bookshelf");
      
        return Response.ok().entity(new Gson().toJson(new Url(loginURL, logoutURL))).build();

    }

    private class Url
    {
        String loginURL;
        String logoutURL;
        
        public Url(String loginURL, String logoutURL)
        {
            this.loginURL = loginURL;
            this.logoutURL = logoutURL;
        }
    }
}
