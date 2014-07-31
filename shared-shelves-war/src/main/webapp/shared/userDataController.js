angular.module('tbeControllers').controller(
  'userDataController', function ($scope, $location, services) {
	  var getConnectedUser = function(){
	        services.getUser().then(
	          function(result) {
	            $scope.user = result;
	          });
	      };

	    var getLogoutUrl = function(){
	        services.getLogoutUrl().then(
	          function(result) {
	            $scope.logoutURL = result.logoutURL;
	          });
	      };

      getConnectedUser();
	  getLogoutUrl();
  });