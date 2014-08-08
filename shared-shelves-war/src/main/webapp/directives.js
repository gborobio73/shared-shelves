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
      templateUrl: 'shared/books.html'
    };
}])

.directive('faqDetails', [function() {
    return {
      templateUrl: 'shared/faq-details.html'
    };
}]);
