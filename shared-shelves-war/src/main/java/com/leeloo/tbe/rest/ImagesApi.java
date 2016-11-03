package com.leeloo.tbe.rest;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

@Path("images")
public class ImagesApi {
	@GET
    @Path("/{url}")
	@Produces("image/png")
    public Response getImageUrl(@Context HttpServletRequest requestContext, @PathParam("url") String url) throws IOException {
    	try {
    		
    		byte[] image = getImage(url); 
		    return Response.ok(new ByteArrayInputStream(image)).build();		
			
		} catch (IOException e) {
			//return default image
			
			String noImageCoverUrl = new URL(requestContext.getScheme(), 
					requestContext.getServerName(),
					requestContext.getServerPort(), 
					"/img/no_cover.png").toString();
			return Response.ok(new ByteArrayInputStream(getImage(noImageCoverUrl))).build();
			//e.printStackTrace();
		}
    }
	
	private byte[] getImage(String url) throws IOException{
		URL decodedUrl = new URL(url);
		
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		final InputStream inputStream = decodedUrl.openStream();
        int read;
        while ((read = inputStream.read()) != -1) {
            baos.write(read);
        }
        return baos.toByteArray();
	}
}
