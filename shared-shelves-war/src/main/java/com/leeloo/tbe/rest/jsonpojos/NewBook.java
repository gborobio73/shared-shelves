package com.leeloo.tbe.rest.jsonpojos;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class NewBook {
    public String title;
    public String subtitle;    
    public String description;
    public List<String> authors;
    public String language;
    public String pageCount;
    public List<String> categories;
    public boolean hasImage;
    public String imageUrl =".//img/no_cover.png";
    public String isbn;
    public String location;
    public int price;

    public NewBook() {
    }  

}

