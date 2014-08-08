'use strict';

var loadTexts = function(scope, cookieStore, textsServices){
	var language = cookieStore.get('ss_lang');
    if(language == undefined || language == ''){
    	language = 0;
    }
    scope.lang = language;
    scope.texts = textsServices.getTexts();
};

angular.module('tbe.controllers', [])
.controller('navController', ['$scope', '$cookieStore', '$timeout', 'services', 'textsServices', function ($scope, $cookieStore, $timeout, services, textsServices) {
	$scope.setLanguage= function(language) {
		$scope.$parent.lang=language;
		$scope.showLanguages=false;
		
		$cookieStore.put('ss_lang',language);			
	};  
	
	$scope.toggleLanguageMenu= function() {		
		$scope.showLanguages=!$scope.showLanguages;
		
		if($scope.laguageTimeout != undefined){
			$timeout.cancel($scope.laguageTimeout);
		}
		$scope.laguageTimeout = $timeout(
			function(){
				$scope.showLanguages=false;
			}, 5000);
	};  
	
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
	
	loadTexts($scope.$parent, $cookieStore, textsServices);
	
	getConnectedUser();
	getLogoutUrl();
	  
}]);

