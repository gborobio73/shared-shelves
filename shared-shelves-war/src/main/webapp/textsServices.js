angular.module('tbeServices').factory('textsServices', function($http, $http) {
    var textsServices = new Object();
    
    textsServices.getTexts = function(){             
             return texts;
        };

    return textsServices; 
});

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
    		couldNotFindCover:["Could not find an proper cover","Sopivaa kansikuvaa ei löytynyt", "No encontré ninguna portada adecuada"],
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

