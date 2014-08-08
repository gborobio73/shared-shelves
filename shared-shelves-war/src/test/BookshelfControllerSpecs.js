'use strict';

var books = [{"id":"5418393301680128","ownedByCurrentUser":true,"created":"Aug 8, 2014 12:22:08 PM","title":"The Great Gatsby","description":"some description","authors":["F. Scott Fitzgerald"],"language":"English","pageCount":"210","categories":["Fiction / Classics"],"hasImage":true,"imageUrl":"http:...","isbn":"9781847492586","location":"Turku","price":3}];
var userBooks = [{"id":"2","ownedByCurrentUser":true,"created":"Aug 8, 2014 12:22:08 PM","title":"Zero","description":"some description","authors":["Gon"],"language":"English","pageCount":"210","categories":["Fiction / Classics"],"hasImage":true,"imageUrl":"http:...","isbn":"9781847492586","location":"Turku","price":3}];
function mockRestServices($q, restServices){
	spyOn(restServices, 'getUserBooks').andCallFake(function() {	    	  
		var deferred = $q.defer();
	    deferred.resolve(userBooks);
	    return deferred.promise;   
	});
	spyOn(restServices, 'getAllBooks').andCallFake(function() {
		var deferred = $q.defer();
	    deferred.resolve(books);
	    return deferred.promise;   
	});	
};

function injectController($scope, $controller, $q, _$timeout_, $location, $sessionStorage, restServices){
	
	var ctrl = $controller('bookshelfController', {
	    $scope: $scope,
	    $location: $location, 
	    $sessionStorage: $sessionStorage,
	    restServices: restServices
	    
	});
	return ctrl;
};

function resolvePromises($rootScope){
	$rootScope.$digest();
}

describe('Controller tests', function() {
	  var $scope;	  

	  beforeEach(function (){
	    module('tbe.controllers', 'ui.router', 'ui.bootstrap', 'ngCookies', 'ngStorage', 'tbe.services');
	  });	 

	  
	  
	  it('should load all books', function() {
		  inject(function($rootScope, $controller, $q, _$timeout_, $location, $sessionStorage, restServices) {
		      $scope = $rootScope.$new();
		      
		      mockRestServices($q, restServices)

		      injectController($scope, $controller, $q, _$timeout_, $location, $sessionStorage, restServices);
		  
		      resolvePromises($rootScope);		      
		  });
		  
		  expect($scope.loading).toBe(false);	    
		  expect($scope.books).toBe(books);
	  });
	  	  
	  
	  it('should set book in session storage', function() {
		  var sessionStorage={};
		  var selectedBook = {"id":"4792528117170176","ownedByCurrentUser":false,"created":"Aug 3, 2014 4:33:44 PM","title":"Lasisilmä","description":"Taru tahtoo ...","authors":["Johanna Sinisalo"],"language":"Finnish","pageCount":"329","hasImage":true,"imageUrl":"http:....jpg","isbn":"9518511020","location":"Turku","price":3};
		  inject(function($rootScope, $controller, $q, _$timeout_, $location, $sessionStorage, restServices) {
				$scope = $rootScope.$new();
				
				mockRestServices($q, restServices);
				  
				injectController($scope, $controller, $q, _$timeout_, $location, $sessionStorage, restServices);
				  
				
				
				sessionStorage = $sessionStorage;				 
		  });
		  
		  $scope.showBookDetails(selectedBook);
		  
		  expect($scope.loading).toBe(false);	    
		  expect(sessionStorage.book).toBe(selectedBook);		  
	  });
	  
	  it('should get user books', function() {		  
			 inject(function($rootScope, $controller, $q, _$timeout_, $location, $sessionStorage, restServices) {
					$scope = $rootScope.$new();
					
					mockRestServices($q, restServices);
					//inject controller  
					$controller('mybooksController', {
					    $scope: $scope,
					    $location: $location, 
					    $sessionStorage: $sessionStorage,
					    restServices: restServices
					    
					});
					  
					resolvePromises($rootScope);
			    });
			  
			  expect($scope.loading).toBe(false);	    
			  expect($scope.books).toBe(userBooks);		  
		  });	
});

