angular.module('tbeDirectives').directive('navMenu', function() {
    return {
      templateUrl: 'shared/nav-menu.html'
    };
});

angular.module('tbeDirectives').directive('bookInfo', function() {
    return {
      templateUrl: 'shared/book-info.html'
    };
});

angular.module('tbeDirectives').directive('errorLabels', function() {
    return {
      templateUrl: 'shared/error-labels.html'
    };
});