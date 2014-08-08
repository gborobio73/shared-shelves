'use strict';

var tbeApp = angular.module('tbe', 
  ['ui.router', 'ui.bootstrap', 'ngCookies', 'ngStorage',
  'tbe.controllers', 'tbe.services', 'tbe.directives',
  ])
 
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url
  $urlRouterProvider.otherwise("/Bookshelf");
  //
  // Now set up the states
  $stateProvider
    .state('Bookshelf', {
      url: '/Bookshelf',
      templateUrl: 'partials/Bookshelf.html',
      controller: 'bookshelfController'
    })
    .state('MyBooks', {
      url: '/MyBooks',
      templateUrl: 'partials/MyBooks.html',
      controller: 'mybooksController'
    })
    .state('AddBook', {
      url: '/AddBook',
      templateUrl: 'partials/AddBook.html',
      controller: 'addBookController'
    })
    .state('Book', {
      url: '/Book',
      templateUrl: 'partials/Book.html',
      controller: 'bookController'
    })
  	.state('FAQ', {
      url: '/FAQ',
      templateUrl: 'partials/faq.html',
      controller: ''
    });
}])

.factory('httpRequestInterceptor', function ($location, $q) {
  
  return {
        responseError: function(rejection) {
          if (rejection.status === 401) {
                window.location = "/login";
            }
            return $q.reject(rejection);
        }
      };

}).config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});
