package com.leeloo.tbe.rest;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

@Path("images")
public class ImagesApi {
	@Context HttpServletRequest requestContext;
	
	@GET
    @Path("/{url}")
	@Produces("image/png")
    public Response getImageUrl(@PathParam("url") String url) throws IOException {
    	try {
    		
    		byte[] image = getImage(url); 
		    return Response.ok(new ByteArrayInputStream(image)).build();		
			
		} catch (IOException e) {			
			String noImageCoverUrl = new URL(requestContext.getScheme(), 
					requestContext.getServerName(),
					requestContext.getServerPort(), 
					"/img/no_cover.png").toString();
			return Response.ok(new ByteArrayInputStream(getImage(noImageCoverUrl))).build();			
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
