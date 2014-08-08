'use strict';

var cities = ["Akaa","Alajärvi","Alavus","Espoo","Forssa","Haapajärvi","Haapavesi","Hamina","Hanko","Harjavalta","Haukipudas","Heinola","Helsinki","Huittinen","Hyvinkää","Hämeenlinna","Iisalmi","Ikaalinen","Imatra","Joensuu","Juankoski","Jyväskylä","Jämsä","Järvenpää","Kaarina","Kajaani","Kalajoki","Kankaanpää","Kannus","Karkkila","Kaskinen","Kauhajoki","Kauhava","Kauniainen","Kemi","Kemijärvi","Kerava","Keuruu","Kitee","Kiuruvesi","Kokemäki","Kokkola","Kotka","Kouvola","Kristiinankaupunki","Kuhmo","Kuopio","Kurikka","Kuusamo","Lahti","Laitila","Lappeenranta","Lapua","Lieksa","Lohja","Loimaa","Loviisa","Maarianhamina","Mikkeli","Mänttä-Vilppula","Naantali","Nilsiä","Nivala","Nokia","Nurmes","Närpiö","Orimattila","Orivesi","Oulainen","Oulu","Outokumpu","Paimio","Parainen","Parkano","Pieksämäki","Pietarsaari","Pori","Porvoo","Pudasjärvi","Pyhäjärvi","Raahe","Raasepori","Raisio","Rauma","Riihimäki","Rovaniemi","Saarijärvi","Salo","Sastamala","Savonlinna","Seinäjoki","Siuntio","Somero","Suonenjoki","Tampere","Tornio","Turku","Ulvila","Uusikaarlepyy","Uusikaupunki","Vaasa","Valkeakoski","Vantaa","Varkaus","Viitasaari","Virrat","Ylivieska","Ylöjärvi","Ähtäri","Äänekoski"];
var prices = [1,2,3,5,7,8,9,10];

var loadTexts = function(scope, cookieStore, textsServices){
	var language = cookieStore.get('ss_lang');
    if(language == undefined || language == ''){
    	language = 0;
    }
    scope.lang = language;
    scope.texts = textsServices.getTexts();
};


angular.module('tbe.controllers', [])
	.controller('bookshelfController',['$scope', '$location', '$sessionStorage','restServices',	function ($scope, $location, $sessionStorage,restServices) {

		var getAllBooks = function() {
	      $scope.loading= true;
	      restServices.getAllBooks().then(
	        function(result) {
	          $scope.loading= false;
	          $scope.books = result;          
	          }); 
	    };
	    
	   getAllBooks();	   
  }])

  .controller('mybooksController', ['$scope', '$location', '$sessionStorage', 'restServices',function ($scope, $location, $sessionStorage, restServices) {

	var getUserBooks = function() {		
		$scope.loading= true;
		$scope.books=[{}];
		restServices.getUserBooks().then(
		          function(result) {
		        	  $scope.loading= false;
		              $scope.books = result;
		          });
    };
    
	getUserBooks();	 
  }])

  .controller('bookNavController',['$scope','$sessionStorage','$location', function ($scope, $sessionStorage, $location) {
	    $scope.showBookDetails= function(book){
	    	$scope.loading= false;
	    	$sessionStorage.book =book;    	
	    	$location.path('/Book');    	
	    };
  }])

  .controller('addBookController', ['$scope', 'restServices', 'isbnSearchServices', function ($scope, restServices, isbnSearchServices) {
		$scope.cities = cities;
		$scope.prices = prices;
		
		var resetAddButton = function(){
			$scope.startedAdding = false;
		    $scope.inProcess = false;
		    $scope.success = false;
		};

	    $scope.searchBookInfoByISBN = function(isbn) {
	    	resetAddButton();
	        if(isbn != undefined && isbn.trim().length > 0){
	        	$scope.bookFound = false;
		    	$scope.searching = true;
		    	$scope.book = {};
		        isbnSearchServices.searchBookInfoByISBN(isbn).then(
			        function(result) {
			          $scope.book = result;
			          $scope.bookLocation ="Turku";					  
					  $scope.bookPrice=prices[2];
			          if ($scope.book.title != "") {
			            $scope.bookFound = true;			            
			          };
			          $scope.searching = false;
			        }); 
	        }
	    };
	
	    $scope.addToBookshelf = function(book) {
	    	$scope.startedAdding= true;
	    	$scope.inProcess = true;
	    	book.location = $scope.bookLocation;
	    	book.price = $scope.bookPrice;
	    	restServices.addToBookshelf(book).then(
				function(result) {
		          $scope.inProcess = false;
		          $scope.success = true;
				},
				function (error){
					$scope.inProcess = false;
					$scope.addFailed = true;
				}); 
	    };
	    $scope.searching = false;
	    
	    resetAddButton();
	}
  ])

  .controller('bookController', ['$scope', '$sessionStorage', '$location', '$anchorScroll', 'restServices', function ($scope, $sessionStorage, $location, $anchorScroll, restServices) {
		
		var getBook = function() {
			$scope.loading= true;
			var book = $sessionStorage.book;
			if(book == undefined || book == ''){
				$location.path('/Bookshelf');
			}
			else{
				var locatedInIdx = $.inArray(book.location, cities);
				var priceIdx = $.inArray(book.price, prices);
				$scope.book= book;
				$scope.bookLocation =cities[locatedInIdx];					  
				$scope.bookPrice=prices[priceIdx];
				$scope.loading = false;
			}
	    };		
		
		$scope.removeBook = function(bookId) {
			$scope.startedRemoving = true;
			$scope.removingInProcess = true;
			restServices.removeBook(bookId).then(
		        function(result) {
		        	$sessionStorage.book ='';
		        	$scope.removingInProcess = false;
			        $scope.removed = true;	        	
		          },
				function (error){
					$scope.removingInProcess = false;
					$scope.updateFailed = true;
				});  
	    };
	    
	    $scope.saveBook = function(book) {
	    	$scope.startedSaving = true;
			$scope.savingInProcess = true;			
			book.location = $scope.bookLocation;
	    	book.price = $scope.bookPrice;
	    	restServices.saveBook(book).then(
		        function(result) {		        	
		        	$scope.savingInProcess = false;
			        $scope.saved = true;	
		          },
				function (error){
					$scope.savingInProcess = false;
					$scope.updateFailed = true;
				}); 
	    };
	    
	    $scope.sendMessageToOwner= function(bookId) {
	    	$scope.startedSending = true;
			$scope.sendingInProcess = true;			
			restServices.sendMessageToOwner(bookId).then(
					function(result) {		        	
						$scope.sendingInProcess = false;
						$scope.sent = true;	
					},
					function (error){
						$scope.sendingInProcess = false;
						$scope.sendFailed = true;
					});	    	
	    };
	    
	    $scope.cities = cities;
		$scope.prices = prices;
		
	    $scope.loading = true;
	    
	    $scope.startedRemoving = false;
	    $scope.removingInProcess= false;
	    $scope.removed = false;
	    
	    $scope.startedSaving = false;
	    $scope.savingInProcess= false;
	    $scope.saved = false;
	    
	    $scope.startedSending = false;
	    $scope.sendingInProcess= false;
	    $scope.sent = false;
	    
	    getBook();
	}
  ])
  .controller('navController', ['$scope', '$cookieStore', '$timeout', '$location','restServices', 'textsServices', function ($scope, $cookieStore, $timeout, $location, restServices, textsServices) {
	
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
		restServices.getUser().then(
	          function(result) {
	            $scope.user = result;
	          });
	      };
      
	var getLogoutUrl = function(){
		restServices.getLogoutUrl().then(
	        function(result) {
	          $scope.logoutURL = result.logoutURL;
	        });
	};
	
	loadTexts($scope.$parent, $cookieStore, textsServices);
	
	getConnectedUser();
	getLogoutUrl();
	  
  }]);