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

        restServices.getLogInAndOutUrl = function(){
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
     
     restServices.isUserLoggedIn = function(bookId){
    	 return $http.get('/rest/user')
         	.then(function(result) {
              return result.data.name != 'guest';
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

.factory('scrollServices',[ function() {
    var scrollServices = new Object();
    var index =0;
    scrollServices.setScroll = function(idx){             
             index = idx;
        };
    scrollServices.getScroll = function(){             
            return index;
       };
    return scrollServices; 
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
             var isbnClean = isbn.replace(/-/g,"").replace(/\s+/g, '');
             var isbnUrlSearch = 'https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbnClean;
             return $http.get(isbnUrlSearch)
				   .then(function(result) {                            
				        if (result.data.totalItems== 1)
				        {                              
							  var selfLink = result.data.items[0].selfLink;
							  return $http.get(selfLink)
							  	.then(function(result) {                                    	
									  var volumeInfo = result.data.volumeInfo;
									  if(volumeInfo.description!=null && volumeInfo.description.length >0 && 
											  volumeInfo.imageLinks != null && volumeInfo.authors != null){
										  //gbooks has it!
									  return buildWithGBooks(volumeInfo);											  											  
								  }else{
									  var searchUrl ="/rest/books/search/"+volumeInfo.language+"/"+isbnClean;
									  return $http.get(searchUrl).then(
							      			function(result) {
							      				return result.data;
							      			},
							      			function (error){
							      				//Whatever google has
												return buildWithGBooks(volumeInfo);											  														
							  			});											  
								  };
							});
					    }
					    else{
					    	//could not find the book, lets try search
					    	var searchUrl ="/rest/books/search/fi/"+isbnClean;
					    	return $http.get(searchUrl).then(
								function(result) {
									return result.data;
								},
								function (error){
									return createBook();                                    	
								}); 
					    }                            
				});
        };

    return isbnSearchServices; 
}]);

function buildWithGBooks(volumeInfo){
	var book = createBook();
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
		book.imageUrl= ".//img/no_cover.png";
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

function createBook(){
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
	return book;
}

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
var texts = {
		menu:{
			addBook:["Add book", "Lisää kirja", "Añadir libro"],
			myBooks:["My books", "Omat kirjat", "Mis libros"],
			lang:["Lang", "Kieli", "Idioma"],
			bookshelf:["Bookshelf", "Kirjahylly", "Librería"],
			login:["Log In", "Kirjaudu sisään", "Iniciar sesión"],
		},
    	errorLabels:{
    		somethingWentWrong:["Wops! Something went wrong.", "Oops! Jokin meni vikaan.", "Vaya! Algo falló."],
    		tryAgailLater:["Please, try again later or contact me.", "Olehyvä ja yritä myöhemmin uudelleen tai ota yhteyttä.", "Por favor, inténtalo de nuevo más tarde o contacta conmigo."]
    	},
    	addBook:{
			findBook:["Find book", "Etsi kirjaa", "Buscar libro"],
			couldNotFindBook:["Sorry, could not find the book.", "Kirjaa ei löytynyt.", "Lo siento pero no encontré ningún libro."],
			improvingSearch:["I am constantly improving the search.", "Palvelua parannetaan jatkuvasti.", "Estoy constantemente mejorando la búsqueda."],
			tryAgainFewDays:["Please try again in a few days, thanks.", "Olehyvä ja yritä muutaman päivän kuluttua uudelleen. Kiitos!", "Por favor, inténtalo de nuevo pasados unos días."],
			addToBookshelf:["Add to bookshelf", "Lisää kirjahyllyyn", "Añadir a la libería"],
			addedToBookshelf:["Added to bookshelf.", "Lisätty kirjahyllyyn.", "Añadido a la librería."],
		},
    	book:{
    		title:["Title", "Nimi", "Título"],
    		cover:["Cover", "Kansikuva", "Portada"],
    		couldNotFindCover:["Could not find an proper cover.","Sopivaa kansikuvaa ei löytynyt.", "No se encontró ninguna portada adecuada."],
    		search:["Search","Etsi", "Busca"],
    		forACoverAndCopyImage:["for a cover and copy image URL here:","kansikuva ja kopioi kuvan url-osoite tähän:", "una portada y copia aquí la URL de la imagen:"],
    		authors:["Authors", "Kirjoittajat", "Autores"],
    		subtitle:["Subtitle", "Alaotsikko", "Subtítulo"],
    		description:["Description", "Kuvaus", "Descripción"],
    		language:["Language", "Kieli", "Idioma"],
    		pageCount:["Page count", "Sivujen lukumäärä", "Número páginas"],
    		categories:["Categories", "Kategoriat", "Categorías"],
    		location:["Location", "Sijainti", "Lugar"],
    		price:["Price", "Hinta", "Precio"],
    		saveChangesBtn:["Save", "Tallenna", "Guardar"],
    		changesSaved: ["Changes saved.", "Muutokset tallennettu.", "Cambios guardados."],
    		removeBtn: ["Remove", "Poista", "Eliminar"],
    		removedFromBookshelf:["Removed from bookshelf.", "Poistettu kirjahyllystä.", "Eliminado de la librería."],
    		interested:["Interested?", "Kiinnostunut?", "Interesado?"],
    		letOwnerKnowBtn:["Let the owner know!", "Kerro omistajalle!", "Díselo al dueño!"],
    		emailSentToOwner:["Email sent to book's owner.", "Kirjan omistajalle on lähetetty sähköposti.", "Email enviado al dueño."],
    		checkInboxForCopy: ["Check your inbox for a copy.", "Löydät kopion sähköpostistasi.", "Hay una copia en tu buzón de entrada."],
    		contactOwnerNeedToBe: ["To contact the book owner you need to be", "Ottaaksesi yhteyttä kirjan omistajaan sinun tulee olla", "Para contactar con el dueño del libro necesitas estar"],
    		loggedIn: ["logged in", "kirjautuneena sisään", "conectado"],
    	},
    	bookshelf:{
			more:["more", "lisää", "más"],			
		},
    	faq:{
    		whyHeader:["Why this app?", "Miksi tämä sovellus?", "¿Porqué esta app?"],
			whyText:["I think books are to be read. As I have a lot of them, someone else might want to read those same books as well. Books are expensive here in Finland and the selection of, for example, Spanish books is small. I also think this is a nice way to meet other people.", "Minusta kirjat on tarkoitettu luettavaksi. Koska minulla on niitä aika paljon, joku muukin voisi haluta lukea ne. Suomessa kirjat ovat kalliita ja valikoima suppea esimerkiksi espanjankielisten kirjojen kohdalla. Lisäksi tämä on minusta kiva tapa tavata muita ihmisiä.", "Soy de la opinión que los libros son para ser leídos y me gustaría que los míos fueran leídos por otras personas. Otro motivo es que los libros son caros aquí en Finlandia y es difícil encontrar libros en otros idiomas."],
			howDoesWorkHeader:["How does this work?", "Miten tämä toimii?", "¿Cómo funciona?"],
			howDoesWorkTextPart1:["You can add your books to the bookshelf by clicking \"Add book\". Insert the", "Voit lisätä haluamasi kirjat hyllyyn painamalla \"Lisää kirja\". Kirjoita", "Puedes añadir tus libros a la librería haciendo click en \"Añadir Libro\". Introduce el"],
			howDoesWorkTextPart2:["(with or without hyphens) and the book information will be imported. Sometimes the information cannot be found but I am constantly working to improve the search.", "(väliviivoilla tai ilman) ja kirjan tiedot lisätään automaattisesti. Välillä tietoja ei löydy, mutta työskentelen jatkuvasti haun parantamiseksi.", "(con o sin guiones) y se importará la información sobre el libro. A veces no se encuentra información, pero estoy mejorando la búsqueda constantemente."],
			whatIfInterestedHeader:["What if I am interested in a book?", "Mitä jos olen kiinnostunut tietystä kirjasta?", "¿Y si me interesa algún libro?"],
			whatIfInterestedText:["Just click the button \"Let the owner know!\" and an email will be sent to both you and the owner. You can take it from there.", "Paina vain \"Kerro omistajalle!\" -nappia ja sähköposti lähetetään sekä sinulle että omistajalle. Voitte sopia jatkosta itse.", "Solo tienes que hacer click en \"Díselo al dueño!\" y se os enviará un email a los dos. A partir de ahí depende de vosotros."],
			whatSoldBookHeader:["What do I do once I have sold a book?", "Mitä teen, kun olen myynyt kirjan?", "¿Qué hago una vez he vendido un libro?"],
			whatSoldBookText:["Please remove it from the bookshelf, as it is not available anymore.", "Koska kirjaa ei ole saatavilla enää, ole ystävällinen ja poista se hyllyltä.", "Por favor, elimínalo de la librería ya que no está disponible."],
			whatGoogleAccHeader: ["What do you do with my Google account?","Mihin Google-tiliäni käytetään?","¿Qué haces con mi cuenta de Google?"],
			whatGoogleAccText: ["It provides a secure way to identify you and to send you emails. Nothing else.","Se tarjoaa turvallisen tavan tunnistaa sinut ja lähettää sinulle sähköpostia. Ei mitään muuta.","Me permite identificarte de manera segura y enviarte emails. Nada más."],
			isItFreeHeader:["Is this app for free?","Onko tämä sovellus ilmainen?","¿Es la app gratis?"],
			isItFreeText:["Yep.","Jep.","Sip."],
			iHaveSuggestionsHeader:["What if I have some suggestions?","Mitä jos minulla on sovellukseen liittyviä ehdotuksia?","¿Y si tengo alguna sugerencia?"],
			iHaveSuggestionsText:["Contact me at the email below.","Lähetä viesti alla näkyvään sähköpostiosoitteeseen.","Puedes contactar conmigo en el email más abajo."],
			thanksText:["A big THANK YOU to Erika, Aleksandr, Anri and Lauri for helping me building this app.","ISO KIITOS Erikalle, Aleksanderille, Anrille ja Laurille avusta tämän sovelluksen kanssa.","MUCHAS GRACIAS a Erika, Aleksandr, Anri y Lauri por ayudarme a construir esta  app."]
    	}
 };


