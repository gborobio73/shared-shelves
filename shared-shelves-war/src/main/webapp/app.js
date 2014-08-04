var tbeApp = angular.module('tbe', 
  ['ui.router', 'ui.bootstrap', 'ngCookies', 
  'tbeControllers', 'tbeServices', 'tbeDirectives',
  ]);

angular.module('tbeControllers', []);
angular.module('tbeServices', []);
angular.module('tbeDirectives', []);

tbeApp.config(function($stateProvider, $urlRouterProvider) {
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
      url: '/Book/:bookId',
      templateUrl: 'partials/Book.html',
      controller: 'bookController'
    })
  	.state('FAQ', {
      url: '/FAQ',
      templateUrl: 'partials/faq.html',
      controller: 'faqController'
    });
});

tbeApp.factory('httpRequestInterceptor', function ($location, $q) {
  
  return {
        responseError: function(rejection) {
          if (rejection.status === 401) {
                window.location = "/login";
            }
            return $q.reject(rejection);
        }
      };

});
 
tbeApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});
