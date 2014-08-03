angular.module('tbeServices').factory('textsServices', function($http, $http) {
    var textsServices = new Object();
    
    textsServices.getTexts = function(language){             
             return englishTexts;
        };

    return textsServices; 
});

var englishTexts = {
    	errorLabels:{
    		somethingWentWrong:"Wops! Something went wrong.",
    		tryAgailLater:"Please, try again later or contact me."
    	},
    	book:{
    		saveChangesBtn:"Save changes",
    		changesSaved: "Changes saved",
    		removeBtn: "Remove",
    		removedFromBookshelf:"Removed from bookshelf",
    		letOwnerKnowBtn:"Let the owner know!",
    		emailSentToOwner:"Email sent to book's owner",
    		checkInboxForCopy: "Check your inbox for a copy"
    	}
     };
