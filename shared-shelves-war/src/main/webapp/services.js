angular.module('tbe.services', []).factory('restServices',['$http',  function($http) {
    var restServices = new Object();

    restServices.getAllBooks = function() {
             //return the promise directly.    		
             return $http.get('/rest/books/all')
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        };

        restServices.getUserBooks = function() {
             //return the promise directly.
             return $http.get('/rest/books/user')
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        };

        restServices.getUser = function(){
             return $http.get('/rest/user')
                       .then(function(result) {
                            return result.data;
                        });
        };

        restServices.getLogoutUrl = function(){
             return $http.get('/rest/url')
                       .then(function(result) {
                            return result.data;
                        });
        };
        
        restServices.addToBookshelf = function(book){
            return $http.post('/rest/books/add', book)
                      .then(function(result) {
                           return result;
                       });
       };
       restServices.removeBook = function(bookId){
           return $http.post('/rest/books/delete', bookId)
                     .then(function(result) {
                          return result;
                      });
      };
      restServices.saveBook = function(book){
          return $http.post('/rest/books/save', book)
                    .then(function(result) {
                         return result;
                     });
     };
     restServices.getBook = function(bookId){
	    	return $http.get('/rest/books/' + bookId)
	    		.then(function(result) {
	    			return result.data;
	         });
     };
     
     restServices.sendMessageToOwner = function(bookId){
    	 return $http.post('/rest/books/message', bookId)
         	.then(function(result) {
         		return result;
         	});
     };
    return restServices; 
}])

.factory('textsServices',['$http', function( $http) {
    var textsServices = new Object();
    
    textsServices.getTexts = function(){             
             return texts;
        };

    return textsServices; 
}])

.factory('isbnSearchServices', [ '$http', function($http) {
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
										  if(volumeInfo.language == 'fi'){
											  var searchUrl ="/rest/books/search/fi/"+isbnNoHyphens;
											  return $http.get(searchUrl).then(
				                          			function(result) {
				                          				return result.data;
				                          			},
				                          			function (error){
				                          				return book;
			                          			});
										  }else{
											  //Whatever google has
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
											  book.ownedByCurrentUser = true;
											  return book;
										  }										  
		                            });
                            }
                            else{
                            	//could not find the book
                            	var searchUrl ="/rest/books/search/fi/"+isbnNoHyphens;
                            	return $http.get(searchUrl).then(
                        			function(result) {
                        				return result.data;
                        			},
                        			function (error){
                        				return book;
                        			}); 
                            }                            
                        });
        };

    return isbnSearchServices; 
}]);

var texts = {
		menu:{
			addBook:["Add book", "Lisää kirja", "Añadir libro"],
			myBooks:["My books", "Omat kirjat", "Mis libros"],
			lang:["Lang", "Kieli", "Idioma"],
		},
    	errorLabels:{
    		somethingWentWrong:["Wops! Something went wrong", "Oops! Jokin meni vikaan", "Vaya! Algo falló."],
    		tryAgailLater:["Please, try again later or contact me", "Olehyvä ja yritä myöhemmin uudelleen tai ota yhteyttä", "Por favor, inténtelo de nuevo más tarde"]
    	},
    	addBook:{
			findBook:["Find book", "Etsi kirjaa", "Buscar libro"],
			couldNotFindBook:["Sorry, could not find the book", "Kirjaa ei löytynyt", "Lo siento pero no encontré ningún libro"],
			improvingSearch:["I am constantly improving the search", "Palvelua parannetaan jatkuvasti", "Estoy constantemente mejorando la búsqueda"],
			tryAgainFewDays:["Please try again in a few days, thanks", "Olehyvä ja yritä muutaman päivän kuluttua uudelleen. Kiitos!", "Por favor, inténtalo de nuevo pasados unos días"],
			addToBookshelf:["Add to bookshelf", "Lisää kirjahyllyyn", "Añadir a la libería"],
			addedToBookshelf:["Added to bookshelf", "Lisätty kirjahyllyyn", "Añadido a la librería"],
		},
    	book:{
    		title:["Title", "Nimi", "Título"],
    		cover:["Cover", "Kansikuva", "Portada"],
    		couldNotFindCover:["Could not find an proper cover","Sopivaa kansikuvaa ei löytynyt", "No se encontró ninguna portada adecuada"],
    		search:["Search","Etsi", "Busca"],
    		forACoverAndCopyImage:["for a cover and copy image URL here","kansikuva ja kopioi kuvan url-osoite tähän", "una portada y copia aquí la URL de la imagen"],
    		authors:["Authors", "Kirjoittajat", "Autores"],
    		subtitle:["Subtitle", "Alaotsikko", "Subtítulo"],
    		description:["Description", "Kuvaus", "Descripción"],
    		language:["Language", "Kieli", "Idioma"],
    		pageCount:["Page count", "Sivujen lukumäärä", "Número páginas"],
    		categories:["Categories", "Kategoriat", "Categorías"],
    		location:["Location", "Sijainti", "Lugar"],
    		price:["Price", "Hinta", "Precio"],
    		saveChangesBtn:["Save changes", "Tallenna muutokset", "Guardar cambios"],
    		changesSaved: ["Changes saved", "Muutokset tallennettu", "Cambios guardados"],
    		removeBtn: ["Remove", "Poista", "Eliminar"],
    		removedFromBookshelf:["Removed from bookshelf", "Poistettu kirjahyllystä", "Eliminado de la librería"],
    		interested:["Interested?", "Kiinnostunut?", "Interesado?"],
    		letOwnerKnowBtn:["Let the owner know!", "Kerro omistajalle!", "Díselo al dueño!"],
    		emailSentToOwner:["Email sent to book's owner", "Kirjan omistajalle on lähetetty sähköposti", "Email enviado al dueño"],
    		checkInboxForCopy: ["Check your inbox for a copy", "Löydät kopion sähköpostistasi", "Hay una copia en tu buzón de entrada"]
    	},
    	bookshelf:{
			more:["more", "lisää", "más"],			
		}
 };
