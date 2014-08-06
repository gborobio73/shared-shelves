package com.leeloo.tbe.servlet;

import java.io.IOException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

public class LogoutServlet extends HttpServlet {
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		Cookie acsid = new Cookie("ACSID", "");
		acsid.setMaxAge(0);
        resp.addCookie(acsid);
        
        Cookie sacsid = new Cookie("ACSID", "");
        sacsid.setMaxAge(0);
        resp.addCookie(sacsid);
        
        resp.sendRedirect("/login.html");   
	}

}