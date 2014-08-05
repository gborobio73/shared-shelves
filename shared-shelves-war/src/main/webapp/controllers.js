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

angular.module('tbeControllers').controller(
  'bookshelfController', function ($scope, $location, $cookieStore,services,textsServices) {

    var getAllBooks = function() {
      $scope.loading= true;
      services.getAllBooks().then(
        function(result) {
          $scope.loading= false;
          $scope.books = result;          
          }); 
    };
    
    $scope.getAllBooks = function() {
  		$scope.b='';
      	getAllBooks();
    };
    
	$scope.getUserBooks = function() {
  		$scope.loading= true;
      	services.getUserBooks().then(
    	          function(result) {
    	        	  $scope.loading= false;
    	              $scope.books = result;
    	          });
    };
    loadTexts($scope, $cookieStore, textsServices);
    getAllBooks();    
  });

angular.module('tbeControllers').controller(
		  'mybooksController', function ($scope, $location, $cookieStore,services,textsServices) {

	var getUserBooks = function() {
		$scope.loading= true;
	  	services.getUserBooks().then(
		          function(result) {
		        	  $scope.loading= false;
		              $scope.books = result;
		          });
    };
    
    loadTexts($scope, $cookieStore, textsServices);
	getUserBooks();	 
  });


angular.module('tbeControllers')
	.controller('addBookController', function ($scope, $location, $cookieStore, services, isbnSearchServices,textsServices) {
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
	    	services.addToBookshelf(book).then(
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
	    
	    loadTexts($scope, $cookieStore, textsServices);
	    resetAddButton();
	}
);

angular.module('tbeControllers')
	.controller('bookController', function ($scope, $stateParams, $cookieStore, services,textsServices) {
			
		var getBook = function(bookId) {
			$scope.loading= true;
	    	services.getBook(bookId).then(
				function(book) {
					var locatedInIdx = $.inArray(book.location, cities);
					var priceIdx = $.inArray(book.price, prices);
					$scope.book= book;
					$scope.bookLocation =cities[locatedInIdx];					  
					$scope.bookPrice=prices[priceIdx];
					$scope.loading = false;
	        }); 
	    };
		    
		var bookId = $stateParams.bookId;
		
		$scope.removeBook = function(bookId) {
			$scope.startedRemoving = true;
			$scope.removingInProcess = true;
			services.removeBook(bookId).then(
		        function(result) {
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
			services.saveBook(book).then(
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
			services.sendMessageToOwner(bookId).then(
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

	    loadTexts($scope, $cookieStore, textsServices);
	    
	    getBook(bookId);
	}
);


angular.module('tbeControllers')
.controller('faqController', function ($scope, $stateParams, $cookieStore, services,textsServices) {
	loadTexts($scope, $cookieStore, textsServices);
});

angular.module('tbeControllers')
.controller('languageController', function ($scope, $cookieStore) {
	$scope.setLanguage= function(language) {
		$scope.$parent.lang=language;
		$scope.$parent.showLanguages=false;
		
		$cookieStore.put('ss_lang',language);			
	};    
});

