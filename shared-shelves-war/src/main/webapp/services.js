angular.module('tbeServices').factory('services', function($http, $http) {
    var services = new Object();

    services.getAllBooks = function() {
             //return the promise directly.
             return $http.get('/rest/books/all')
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        };

    services.getUserBooks = function() {
             //return the promise directly.
             return $http.get('/rest/books/user')
                       .then(function(result) {
                            //resolve the promise as the data
                            return result.data;
                        });
        };

    services.getUser = function(){
             return $http.get('/rest/user')
                       .then(function(result) {
                            return result.data;
                        });
        };

    services.getLogoutUrl = function(){
             return $http.get('/rest/url')
                       .then(function(result) {
                            return result.data;
                        });
        };
        
    services.addToBookshelf = function(book){
            return $http.post('/rest/books/add', book)
                      .then(function(result) {
                           return result;
                       });
       };
    services.removeBook = function(bookId){
           return $http.post('/rest/books/delete', bookId)
                     .then(function(result) {
                          return result;
                      });
      };
    services.saveBook = function(book){
          return $http.post('/rest/books/save', book)
                    .then(function(result) {
                         return result;
                     });
     };
    services.getBook = function(bookId){
	    	return $http.get('/rest/books/' + bookId)
	    		.then(function(result) {
	    			return result.data;
	         });
     };
     
     services.sendMessageToOwner = function(bookId){
    	 return $http.post('/rest/books/message', bookId)
         	.then(function(result) {
         		return result;
         	});
     };
    return services; 
});
