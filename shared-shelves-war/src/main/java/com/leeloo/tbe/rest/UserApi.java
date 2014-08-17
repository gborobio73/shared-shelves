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
import com.leeloo.tbe.rest.jsonpojos.UiUser;

@Path("user")
public class UserApi {

    @Context
    HttpServletResponse response;
    @Context
    HttpServletRequest request;

    @GET
    @Produces({ MediaType.APPLICATION_JSON })
    public Response getCurrentUser() throws IOException {
        
        UserService userService = UserServiceFactory.getUserService();
        User currentUser = userService.getCurrentUser();

        if (currentUser != null) {
            Gson gson = new Gson();
            UiUser tbeUser = new UiUser(currentUser.getNickname());

            return Response.ok().entity(gson.toJson(tbeUser)).build();
        } else {

            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }   
}
