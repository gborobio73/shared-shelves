'use strict';

angular.module('tbe.directives', [])

.directive('navMenu',[ function() {
    return {
      templateUrl: 'shared/nav-menu.html'
    };
}])

.directive('bookInfo', [function() {
    return {
      templateUrl: 'shared/book-info.html'
    };
}])

.directive('errorLabels', [function() {
    return {
      templateUrl: 'shared/error-labels.html'
    };
}])

.directive('books', [function() {
    return {
      templateUrl: 'shared/books.html',
      controller: ['$scope', '$location', '$sessionStorage', 'scrollServices',	
                   function ($scope, $location, $sessionStorage, scrollServices) {
    	  $scope.showBookDetails= function(book, index){
  	    	scrollServices.setScroll(index);
  	    	$location.hash('');
  	        $scope.loadingBook=true;
  	    	$scope.loading= false;
  	    	$sessionStorage.book =book;    	
  	    	$location.path('/Book');
  	    	$scope.loadingBook=false;
    	  };  
      }],
    };
}])

.directive('faqDetails', [function() {
    return {
      templateUrl: 'shared/faq-details.html'
    };
}])
;
