'use strict';

var userBooks = [{"id":"2","ownedByCurrentUser":true,"created":"Aug 8, 2014 12:22:08 PM","title":"Zero","description":"some description","authors":["Gon"],"language":"English","pageCount":"210","categories":["Fiction / Classics"],"hasImage":true,"imageUrl":"http:...","isbn":"9781847492586","location":"Turku","price":3}];

function mockRestServices($q, restServices){
	spyOn(restServices, 'getUserBooks').andCallFake(function() {	    	  
		var deferred = $q.defer();
	    deferred.resolve(userBooks);
	    return deferred.promise;   
	});		
};

function injectController($scope, $controller, $q, _$timeout_, $location, $sessionStorage, restServices){
	
	var ctrl = $controller('mybooksController', {
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

describe('MyBooksController tests', function() {
	  var $scope;	  

	  beforeEach(function (){
	    module('tbe.controllers', 'ui.router', 'ui.bootstrap', 'ngCookies', 'ngStorage', 'tbe.services');
	    
	  });	 
	 
	 it('should get user books', function() {		  
		 inject(function($rootScope, $controller, $q, _$timeout_, $location, $sessionStorage, restServices) {
				$scope = $rootScope.$new();
				
				mockRestServices($q, restServices);
				  
				ctrl = $controller('mybooksController', {
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
