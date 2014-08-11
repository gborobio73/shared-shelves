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

function resolvePromises($rootScope){
	$rootScope.$digest();
}

describe('Controller tests', function() {
	  var $scope;	  

	  beforeEach(function (){
	    module('tbe.controllers', 'ui.router', 'ui.bootstrap', 'ngCookies', 'ngStorage', 'tbe.services');
	  });	 
	  
	  it('Bookshelf ctrl should load all books', function() {
		  inject(function($rootScope, $controller, $q, _$timeout_, $location, $sessionStorage, restServices) {
		      $scope = $rootScope.$new();
		      
		      mockRestServices($q, restServices)

		      $controller('bookshelfController', {
				    $scope: $scope,
				    $location: $location, 
				    $sessionStorage: $sessionStorage,
				    restServices: restServices
		      });
		  
		      resolvePromises($rootScope);		      
		  });
		  
		  expect($scope.loading).toBe(false);	    
		  expect($scope.books).toBe(books);
	  });
	  
	  it('Bookshelf ctrl should get user books', function() {		  
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
	  
	  it('BookNav ctrl should set book in session storage', function() {
		  var sessionStorage={};
		  var selectedBook = {"id":"4792528117170176","ownedByCurrentUser":false,"created":"Aug 3, 2014 4:33:44 PM","title":"Lasisilmä","description":"Taru tahtoo ...","authors":["Johanna Sinisalo"],"language":"Finnish","pageCount":"329","hasImage":true,"imageUrl":"http:....jpg","isbn":"9518511020","location":"Turku","price":3};
		  inject(function($rootScope, $controller, $q, _$timeout_, $location, $sessionStorage, restServices) {
				$scope = $rootScope.$new();
				
				mockRestServices($q, restServices);
				  
				//inject controller  
				$controller('bookNavController', {
				    $scope: $scope,
				    $location: $location, 
				    $sessionStorage: $sessionStorage,
				    restServices: restServices
				    
				});
				
				sessionStorage = $sessionStorage;				 
		  });
		  
		  $scope.showBookDetails(selectedBook);
		  
		  expect($scope.loading).toBe(false);	    
		  expect(sessionStorage.book).toBe(selectedBook);		  
	  });
	  
	  it('AddBook ctrl should reset add botton', function() {
		  inject(function($rootScope, $controller, $q, _$timeout_, restServices, isbnSearchServices) {
				$scope = $rootScope.$new();
				
				$controller('addBookController', {  $scope: $scope, restServices: restServices, isbnSearchServices: isbnSearchServices	});
		  });
		  
		  expect($scope.searching).toBe(false);
		  expect($scope.startedAdding).toBe(false);
		  expect($scope.inProcess).toBe(false);
		  expect($scope.success).toBe(false);	
	  });
	  
	  it('AddBook ctrl should find book', function() {
		  var book = {"id":"4","ownedByCurrentUser":true,"created":"","title":"The Great Gatsby","description":"some description","authors":["F. Scott Fitzgerald"],"language":"en","pageCount":"210","categories":["Fiction / Classics"],"hasImage":true,"imageUrl":"http:...","isbn":"9781847492586","location":"","price":0};
		  inject(function($rootScope, $controller, $q, _$timeout_, restServices, isbnSearchServices) {
				$scope = $rootScope.$new();
				
				spyOn(isbnSearchServices, 'searchBookInfoByISBN').andCallFake(function() {	    	  
					var deferred = $q.defer();
				    deferred.resolve(book);
				    return deferred.promise;   
				});
				
				$controller('addBookController', {  $scope: $scope, restServices: restServices, isbnSearchServices: isbnSearchServices	});
				
				$scope.searchBookInfoByISBN('9781847492586');
				
				resolvePromises($rootScope);
		  });
		  
		  expect($scope.searching).toBe(false);
		  expect($scope.bookFound).toBe(true);
		  expect($scope.bookLocation).toBe('Turku');
		  expect($scope.book).toBe(book);
		  expect($scope.bookPrice).toBe(3);		  
	  });
	  
	  it('AddBook ctrl should not find book', function() {
		  var notFoundBook = {"title":"", "subtitle":"", "description":"", "authors":[], "publisherDate":"", "language":"", "pageCount":"", "categories":[], "hasImage":"", "imageUrl":"", "isbn":"", "amazonLink":"", "price":"", "location":"" };
		  inject(function($rootScope, $controller, $q, _$timeout_, restServices, isbnSearchServices) {
				$scope = $rootScope.$new();
				
				spyOn(isbnSearchServices, 'searchBookInfoByISBN').andCallFake(function() {	    	  
					var deferred = $q.defer();
				    deferred.resolve(notFoundBook);
				    return deferred.promise;   
				});
				
				$controller('addBookController', {  $scope: $scope, restServices: restServices, isbnSearchServices: isbnSearchServices	});
				
				$scope.searchBookInfoByISBN('9781847492586');
				
				resolvePromises($rootScope);
		  });
		  
		  expect($scope.searching).toBe(false);
		  expect($scope.bookFound).toBe(false);
		  expect($scope.bookLocation).toBe('Turku');
		  expect($scope.book).toBe(notFoundBook);
		  expect($scope.bookPrice).toBe(3);		  
	  });
	  
	  it('AddBook ctrl should add book to bookshelf with location, price', function() {
		  var book = {"id":"4","ownedByCurrentUser":true,"created":"","title":"The Great Gatsby","description":"some description","authors":["F. Scott Fitzgerald"],"language":"en","pageCount":"210","categories":["Fiction / Classics"],"hasImage":true,"imageUrl":"http:...","isbn":"9781847492586","location":"","price":0};
		  var location = 'Rovaniemi';
		  var price = 6;
		  inject(function($rootScope, $controller, $q, _$timeout_, restServices, isbnSearchServices) {
				$scope = $rootScope.$new();
				
				$controller('addBookController', {  $scope: $scope, restServices: restServices, isbnSearchServices: isbnSearchServices	});
				
				spyOn(restServices, 'addToBookshelf').andCallFake(function() {	    	  
					var deferred = $q.defer();
				    deferred.resolve('Ok');
				    return deferred.promise;   
				});
				$scope.bookLocation = location;
				$scope.bookPrice = price;
				$scope.addToBookshelf(book);
				
				resolvePromises($rootScope);
		  });
		  
		  expect($scope.inProcess).toBe(false);
		  expect($scope.success).toBe(true);	
		  expect(book.location).toBe(location);
		  expect(book.price).toBe(price);
	  });
	  
	  it('AddBook ctrl adding book fails', function() {

		  inject(function($rootScope, $controller, $q, _$timeout_, restServices, isbnSearchServices) {
				$scope = $rootScope.$new();
				
				$controller('addBookController', {  $scope: $scope, restServices: restServices, isbnSearchServices: isbnSearchServices	});
				
				spyOn(restServices, 'addToBookshelf').andCallFake(function() {	    	  
					var deferred = $q.defer();
				    deferred.reject('Something went wrong');
				    return deferred.promise;   
				});
				
				var book = {};
				$scope.addToBookshelf(book);
				resolvePromises($rootScope);
		  });
		  
		  expect($scope.inProcess).toBe(false);
		  expect($scope.addFailed).toBe(true);	
	  });
});

