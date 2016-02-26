package com.leeloo.tbe.servlet;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

public class LoginServlet extends HttpServlet {
  @Override
  public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    
    UserService userService = UserServiceFactory.getUserService();
    
    String queryString = req.getQueryString();
    String loginURL ="";
    
    if (queryString == null) {
    	loginURL = userService.createLoginURL("/#/Bookshelf");
    } else {
    	loginURL = userService.createLoginURL("/#/"+queryString);
    }
    resp.sendRedirect(loginURL);
  
  }

}