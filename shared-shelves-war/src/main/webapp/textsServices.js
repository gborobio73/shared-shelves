angular.module('tbeServices').factory('textsServices', function($http, $http) {
    var textsServices = new Object();
    
    textsServices.getTexts = function(){             
             return texts;
        };

    return textsServices; 
});

var texts = {
		menu:{
			addBook:["Add book", "Lisää kirja", ""],
			myBooks:["My books", "Omat kirjat", ""],
		},
    	errorLabels:{
    		somethingWentWrong:["Wops! Something went wrong", "Oops! Jokin meni vikaan", ""],
    		tryAgailLater:["Please, try again later or contact me", "Olehyvä ja yritä myöhemmin uudelleen tai ota yhteyttä", ""]
    	},
    	addBook:{
			findBook:["Find book", "Etsi kirjaa", ""],
			couldNotFindBook:["Sorry, could not find the book", "Kirjaa ei löytynyt", ""],
			improvingSearch:["I am constantly improving the search", "Palvelua parannetaan jatkuvasti", ""],
			tryAgainFewDays:["Please try again in a few days, thanks", "Olehyvä ja yritä muutaman päivän kuluttua uudelleen. Kiitos!", ""],
			addToBookshelf:["Add to bookshelf", "Lisää kirjahyllyyn", ""],
			addedToBookshelf:["Added to bookshelf", "Lisätty kirjahyllyyn", ""],
		},
    	book:{
    		title:["Title", "Nimi", ""],
    		cover:["Cover", "Kansikuva", ""],
    		couldNotFindCover:["Could not find an proper cover","Sopivaa kansikuvaa ei löytynyt", ""],
    		search:["Search","Etsi", ""],
    		forACoverAndCopyImage:["for a cover and copy image URL here","kansikuva ja kopioi kuvan url-osoite tähän", ""],
    		authors:["Authors", "Kirjoittajat", ""],
    		subtitle:["Subtitle", "Alaotsikko", ""],
    		description:["Description", "Kuvaus", ""],
    		language:["Language", "Kieli", ""],
    		pageCount:["Page count", "Sivujen lukumäärä", ""],
    		categories:["Categories", "Kategoriat", ""],
    		location:["Location", "Sijainti", ""],
    		price:["Price", "Hinta", ""],
    		saveChangesBtn:["Save changes", "Tallenna muutokset", ""],
    		changesSaved: ["Changes saved", "Muutokset tallennettu", ""],
    		removeBtn: ["Remove", "Poista", ""],
    		removedFromBookshelf:["Removed from bookshelf", "Poistettu kirjahyllystä", ""],
    		letOwnerKnowBtn:["Let the owner know!", "Kerro omistajalle!", ""],
    		emailSentToOwner:["Email sent to book's owner", "Kirjan omistajalle on lähetetty sähköposti", ""],
    		checkInboxForCopy: ["Check your inbox for a copy", "Löydät kopion sähköpostistasi", ""]
    	},
    	bookshelf:{
			more:["more", "lisää", ""],			
		}
 };

