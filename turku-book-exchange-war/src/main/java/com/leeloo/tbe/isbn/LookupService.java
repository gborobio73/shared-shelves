package com.leeloo.tbe.isbn;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.google.gson.Gson;
import com.leeloo.tbe.rest.jsonpojos.UiBook;

public class LookupService {

	public UiBook findBook(String isbn)
	{
		
		//String responseEntity = ClientBuilder.newClient()
	    //        .target("https://www.googleapis.com").path("/books/v1/volumes").queryParam("q", isbn)
	    //                    .request().get(String.class);
		
		try {
			String url = "http://www.adlibris.com/fi/product.aspx?isbn="+isbn;
			 
			URL obj = new URL(url);
			HttpURLConnection con = (HttpURLConnection) obj.openConnection();
	 
			// optional default is GET
			con.setRequestMethod("GET");
	 
			//add request header
			con.setRequestProperty("User-Agent", "Mozilla/5.0");
	 
			int responseCode = con.getResponseCode();
			System.out.println("\nSending 'GET' request to URL : " + url);
			System.out.println("Response Code : " + responseCode);
	 
			BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
			String inputLine;
			StringBuffer response = new StringBuffer();	 
			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
			in.close();
			
			System.out.println(response.toString());
			
			Document doc = Jsoup.parse(response.toString());
			Element element = doc.getElementById("ctl00_main_frame_ctrlproduct_rptAuthor_ctl00_liAuthor");
			
			System.out.println("title ->" + element.attr("value"));
			
		} catch (Exception e)		{
			System.out.println(e.getMessage());
		}
		return new UiBook();
	}
	
}
