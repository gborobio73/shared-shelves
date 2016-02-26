'use strict';

var cities = ["Akaa","Alajärvi","Alavus","Espoo","Forssa","Haapajärvi","Haapavesi","Hamina","Hanko","Harjavalta","Haukipudas","Heinola","Helsinki","Huittinen","Hyvinkää","Hämeenlinna","Iisalmi","Ikaalinen","Imatra","Joensuu","Juankoski","Jyväskylä","Jämsä","Järvenpää","Kaarina","Kajaani","Kalajoki","Kankaanpää","Kannus","Karkkila","Kaskinen","Kauhajoki","Kauhava","Kauniainen","Kemi","Kemijärvi","Kerava","Keuruu","Kitee","Kiuruvesi","Kokemäki","Kokkola","Kotka","Kouvola","Kristiinankaupunki","Kuhmo","Kuopio","Kurikka","Kuusamo","Lahti","Laitila","Lappeenranta","Lapua","Lieksa","Lohja","Loimaa","Loviisa","Maarianhamina","Mikkeli","Mänttä-Vilppula","Naantali","Nilsiä","Nivala","Nokia","Nurmes","Närpiö","Orimattila","Orivesi","Oulainen","Oulu","Outokumpu","Paimio","Parainen","Parkano","Pieksämäki","Pietarsaari","Pori","Porvoo","Pudasjärvi","Pyhäjärvi","Raahe","Raasepori","Raisio","Rauma","Riihimäki","Rovaniemi","Saarijärvi","Salo","Sastamala","Savonlinna","Seinäjoki","Siuntio","Somero","Suonenjoki","Tampere","Tornio","Turku","Ulvila","Uusikaarlepyy","Uusikaupunki","Vaasa","Valkeakoski","Vantaa","Varkaus","Viitasaari","Virrat","Ylivieska","Ylöjärvi","Ähtäri","Äänekoski"];
var prices = [1,2,3,5,7,8,9,10];

var loadTexts = function(scope, localStorage, textsServices){
	var language = localStorage.ss_lang;
	
	if(language == undefined || language == ''){
    	language = 0;
    }
    scope.lang = language;
    scope.texts = textsServices.getTexts();
};


angular.module('tbe.controllers', [])
	.controller('bookshelfController',['$scope', '$location', '$sessionStorage', '$anchorScroll','restServices', 'scrollServices',	
	                                   function ($scope, $location, $sessionStorage, $anchorScroll, restServices, scrollServices) {

		var getAllBooks = function() {
	      $scope.loading= true;
	      restServices.getAllBooks().then(
	        function(result) {
	          $scope.loading= false;
	          $scope.books = result;     
	          var scroll = scrollServices.getScroll();
	          $location.hash(scroll);
	          $anchorScroll();
	          }); 
	    };
	   
	   getAllBooks();
	   
  }])

  .controller('bookDetailsController',['$scope', '$location', '$sessionStorage','restServices', 'scrollServices',	
		                                   function ($scope, $location, $sessionStorage, restServices, scrollServices) {

	  $scope.showBookDetails= function(book, index){
	    	scrollServices.setScroll(index);
	    	$location.hash('');
	        $scope.loadingBook=true;
	    	$scope.loading= false;
	    	$sessionStorage.book =book;    	
	    	$location.path('/Book');
	    	$scope.loadingBook=false;
	    };  
  }])
  
  .controller('mybooksController', ['$scope', '$location', '$anchorScroll', 'scrollServices', 'restServices',
                                    function ($scope,$location, $anchorScroll, scrollServices, restServices) {
	
	  restServices.isUserLoggedIn().then(function(result){
	    	if(result !==true){
	    		window.location = "/login";
	    	};
	    });
	  
	  var getUserBooks = function() {		
		$scope.loading= true;		
		restServices.getUserBooks().then(
		          function(result) {
		        	  $scope.loading= false;
		              $scope.books = result;
		              var scroll = scrollServices.getScroll();
			          $location.hash(scroll);
			          $anchorScroll();
		          });
    };
 
	getUserBooks();	 
  }])

  
  .controller('addBookController', ['$scope', '$location', 'restServices', 'isbnSearchServices', function ($scope, $location, restServices, isbnSearchServices) {
		$scope.cities = cities;
		$scope.prices = prices;
		
		restServices.isUserLoggedIn().then(function(result){
	    	if(result !==true){
	    		window.location = "/login";
	    	};
	    });
		
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
				$scope.loading = false;
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
	    
	    restServices.isUserLoggedIn().then(function(result){
	    	$scope.isUserLoggedIn = result;
	    });
	    
	    restServices.getLogInAndOutUrl().then(
	    	function(result) {
	          $scope.logoutURL = result.logoutURL;
	          $scope.loginURL = result.loginURL;
        });
	    
	    getBook();
	}
  ])
  .controller('navController', ['$scope', '$localStorage', '$timeout', '$location','restServices', 'textsServices', function ($scope, $localStorage, $timeout, $location, restServices, textsServices) {
	
	$scope.addBookURL ="#";
	$scope.myBooksURL ="#";  
	  
	$scope.setLanguage= function(language) {
		$scope.$parent.lang=language;
		$scope.showLanguages=false;
		
		$localStorage.ss_lang =language;			
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
		restServices.isUserLoggedIn().then(function(result){
	    	$scope.isUserLoggedIn = result;
	    	if(result === true){
	    		$scope.addBookURL ="/#/AddBook";
	    		$scope.myBooksURL ="/#/MyBooks";
	    	}
	    });
	};
      
	var getLogInAndOutUrl = function(){
		restServices.getLogInAndOutUrl().then(
	        function(result) {
	          $scope.logoutURL = result.logoutURL;
	          $scope.loginURL = result.loginURL;
	        });
	};
	
	loadTexts($scope.$parent, $localStorage, textsServices);
	
	getConnectedUser();
	getLogInAndOutUrl();
	  
  }])
  .controller('standaloneFaqCtrl', ['$scope', '$localStorage', 'textsServices', function ($scope, $localStorage, textsServices) {
	  loadTexts($scope, $localStorage, textsServices);
  }])
  ;