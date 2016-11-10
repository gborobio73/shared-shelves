package com.leeloo.tbe.servlet;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Enumeration;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.common.net.UrlEscapers;
import com.leeloo.tbe.common.TbeLogger;

/***
 * 
 * @author Gon
 * Implementation extracted from https://github.com/Tomucha/gae-java-proxy/tree/master/src/main/java/cz/tomucha/gae/proxy
 * 
 */

@SuppressWarnings("serial")
public class ImagesServlet extends HttpServlet {

	/**
	 * Which headers from the original client request we want to send to our proxy target?
	 */
	private static String[] REQUEST_HEADERS_TO_COPY = new String[]{
			HttpRequest.HEADER_ACCEPT,
			HttpRequest.HEADER_CONTENT_TYPE,
			HttpRequest.HEADER_CONTENT_LENGTH,
			HttpRequest.HEADER_CONTENT_ENCODING,
			HttpRequest.HEADER_ACCEPT_CHARSET,
			HttpRequest.HEADER_ACCEPT_ENCODING,
			HttpRequest.HEADER_AUTHORIZATION,
			HttpRequest.HEADER_REFERER,
			HttpRequest.HEADER_USER_AGENT,
			"Cookie"
	};
	/**
	 * Which headers from the original server response we want to send to client?
	 */
	private static String[] RESPONSE_HEADERS_TO_COPY = new String[]{
			HttpRequest.HEADER_CONTENT_TYPE,
			HttpRequest.HEADER_CONTENT_LENGTH,
			HttpRequest.HEADER_CONTENT_ENCODING,
			HttpRequest.HEADER_CACHE_CONTROL,
			HttpRequest.HEADER_DATE,
			HttpRequest.HEADER_ETAG,
			HttpRequest.HEADER_EXPIRES,
			HttpRequest.HEADER_LAST_MODIFIED,
			"Set-Cookie",
			"Pragma",
			"Transfer-Encoding",
			"Vary"
	};
	
	// some configuration
	static {
		HttpRequest.setConnectionFactory(new HttpRequest.ConnectionFactory() {

			public HttpURLConnection create(URL url) throws IOException {
				HttpURLConnection u = (HttpURLConnection) url.openConnection();
				u.setReadTimeout(30 * 1000);
				return u;
			}

			public HttpURLConnection create(URL url, java.net.Proxy proxy) throws IOException {
				HttpURLConnection u = (HttpURLConnection) url.openConnection(proxy);
				u.setReadTimeout(30 * 1000);
				return u;
			}
		});
	}
	
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse rsp) throws IOException {
    	
    	String queryString = req.getQueryString();
        if(queryString!=null && queryString.length() > 0)
        {
        	String escapedUrl = UrlEscapers.urlFragmentEscaper().escape(queryString);
        	try {
        		
            	HttpRequest proxyRequest = HttpRequest.get(escapedUrl);
        		doProxy(req, rsp, proxyRequest);    

            } catch (Exception e) {
                //e.printStackTrace(rsp.getWriter());
                String header = String.format("Error fetching image url %s",escapedUrl );
    			new TbeLogger().warning(header, e);
//    			rsp.sendError(HttpServletResponse.SC_NOT_FOUND);
    			HttpRequest proxyRequest = HttpRequest.get(getNoCoverImageUrl(req));
        		doProxy(req, rsp, proxyRequest);    
            }        	            	
        }
    }
    
    private String getNoCoverImageUrl(HttpServletRequest req) throws IOException{
		return new URL(req.getScheme(), 
				req.getServerName(),
				req.getServerPort(), 
				"/img/no_cover.png").toString();
	}

    private void doProxy(HttpServletRequest clientRequest, HttpServletResponse proxyResponse, HttpRequest proxyRequest) throws IOException {
		// let's copy some of the client's header
		copyRequestHeaders(clientRequest, proxyRequest);

		if (proxyRequest.code() == 200) {
			// server response status
			proxyResponse.setStatus(proxyRequest.code());

			// let's copy some of the response headers to our response
			copyResponseHeaders(proxyRequest, proxyResponse);

			// copy the response stream
			proxyRequest.receive(proxyResponse.getOutputStream());

			// and we are done
			proxyResponse.getOutputStream().flush();
		}
		else{
			throw new IOException(String.format("URL request returns error code %d.", proxyRequest.code()));
		}
		
	}

	private void copyResponseHeaders(HttpRequest targetResponse, HttpServletResponse proxyResponse) {
		for (int i = 0; i < RESPONSE_HEADERS_TO_COPY.length; i++) {
			String header = RESPONSE_HEADERS_TO_COPY[i];
			String[] values = targetResponse.headers(header.toLowerCase());
			if (values != null && values.length > 0) {
				for (int j = 0; j < values.length; j++) {
					String value = values[j];
					// log.info("Response header: "+header+"="+value);
					proxyResponse.addHeader(header, value);
				}
			}
		}
	}

	private void copyRequestHeaders(HttpServletRequest clientRequest, HttpRequest proxyRequest) {
		for (int i = 0; i < REQUEST_HEADERS_TO_COPY.length; i++) {
			String header = REQUEST_HEADERS_TO_COPY[i];
			Enumeration<String> values = clientRequest.getHeaders(header);
			if (values != null && values.hasMoreElements()) {
				while (values.hasMoreElements()) {
					String value = values.nextElement();
					// log.info("Request header: "+header+"="+value);
					proxyRequest.header(header, value);
				}
			}
		}
	}

}