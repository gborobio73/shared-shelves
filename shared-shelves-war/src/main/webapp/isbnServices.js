angular.module('tbeServices').factory('isbnSearchServices', function($http, $http) {
    var isbnSearchServices = new Object();
    
    function removeHtml(description)
    {
    	if(description == undefined){
    		return "";
    	}else{
			var tmp = document.createElement("DIV");
			tmp.innerHTML = description;
			return tmp.textContent || tmp.innerText || "";
    	}
    }
    
    isbnSearchServices.searchBookInfoByISBN = function(isbn){
             isbnNoHyphens = isbn.replace(/-/g,"");
             var isbnUrlSearch = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbnNoHyphens;
             return $http.get(isbnUrlSearch)
                       .then(function(result) {
                            console.log('isbnUrlSearch -> ' + JSON.stringify(result.data));
                            var book = {
                              "title":"",
                              "subtitle":"",
                              "description":"",
                              "authors":[],
                              "publisherDate":"",
                              "language":"",
                              "pageCount":"",
                              "categories":[],
                              "hasImage":"",
                              "imageUrl":"",
                              "isbn":"",
                              "amazonLink":"",
                              "price":"",
                              "location":""
                            	  
                            };
                            if (result.data.totalItems== 1)
                            {
                              var selfLink = result.data.items[0].selfLink;
                              return $http.get(selfLink)
                                .then(function(result) {
                                  var volumeInfo = result.data.volumeInfo;
                                  book.title = volumeInfo.title;
                                  book.subtitle = volumeInfo.subtitle;
                                  book.description = removeHtml(volumeInfo.description);
                                  book.authors = volumeInfo.authors;
                                  book.publisherDate = volumeInfo.publisherDate;
                                  book.language = volumeInfo.language;
                                  book.pageCount = volumeInfo.pageCount;
                                  book.categories = volumeInfo.categories;
                                  if (volumeInfo.imageLinks) {
                                	  book.hasImage = true;
                                	  book.imageUrl = volumeInfo.imageLinks.thumbnail;
                                  }
                                  else{
                                	  book.hasImage = false;
                                	  book.imageUrl= "http://books.google.fi/googlebooks/images/no_cover_thumb.gif";
                                  }
                                  
                                  if (volumeInfo.industryIdentifiers[1]) {
                                    book.isbn = volumeInfo.industryIdentifiers[1].identifier;
                                  }
                                  else{
                                    book.isbn = volumeInfo.industryIdentifiers[0].identifier;
                                  }
                                  book.amazonLink="http://www.amazon.co.uk/gp/search?index=books&linkCode=qs&keywords="+book.isbn; 
                                  //console.log('returning book -> ' + JSON.stringify(book));
                                  return book;
                                });
                            }
                            return book;
                        });
        };

    return isbnSearchServices; 
});
