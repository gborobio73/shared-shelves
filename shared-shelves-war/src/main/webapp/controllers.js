var cities = ["Akaa","Alajärvi","Alavus","Espoo","Forssa","Haapajärvi","Haapavesi","Hamina","Hanko","Harjavalta","Haukipudas","Heinola","Helsinki","Huittinen","Hyvinkää","Hämeenlinna","Iisalmi","Ikaalinen","Imatra","Joensuu","Juankoski","Jyväskylä","Jämsä","Järvenpää","Kaarina","Kajaani","Kalajoki","Kankaanpää","Kannus","Karkkila","Kaskinen","Kauhajoki","Kauhava","Kauniainen","Kemi","Kemijärvi","Kerava","Keuruu","Kitee","Kiuruvesi","Kokemäki","Kokkola","Kotka","Kouvola","Kristiinankaupunki","Kuhmo","Kuopio","Kurikka","Kuusamo","Lahti","Laitila","Lappeenranta","Lapua","Lieksa","Lohja","Loimaa","Loviisa","Maarianhamina","Mikkeli","Mänttä-Vilppula","Naantali","Nilsiä","Nivala","Nokia","Nurmes","Närpiö","Orimattila","Orivesi","Oulainen","Oulu","Outokumpu","Paimio","Parainen","Parkano","Pieksämäki","Pietarsaari","Pori","Porvoo","Pudasjärvi","Pyhäjärvi","Raahe","Raasepori","Raisio","Rauma","Riihimäki","Rovaniemi","Saarijärvi","Salo","Sastamala","Savonlinna","Seinäjoki","Siuntio","Somero","Suonenjoki","Tampere","Tornio","Turku","Ulvila","Uusikaarlepyy","Uusikaupunki","Vaasa","Valkeakoski","Vantaa","Varkaus","Viitasaari","Virrat","Ylivieska","Ylöjärvi","Ähtäri","Äänekoski"];
var prices = [1,2,3,5,7,8,9,10];

angular.module('tbeControllers').controller(
  'bookshelfController', function ($scope, $location, $sessionStorage,services) {

    var getAllBooks = function() {
      $scope.loading= true;
      services.getAllBooks().then(
        function(result) {
          $scope.loading= false;
          $scope.books = result;          
          }); 
    };
    
    $scope.getUserBooks = function() {
  		$scope.loading= true;
      	services.getUserBooks().then(
    	          function(result) {
    	        	  $scope.loading= false;
    	              $scope.books = result;
    	          });
    };
    
    $scope.showBookDetails= function(book){
    	$sessionStorage.book =book;
    	$location.path('/Book');    	
    };

    getAllBooks();    
  });

angular.module('tbeControllers').controller(
		  'mybooksController', function ($scope, $location, $sessionStorage, services) {

	var getUserBooks = function() {
		$scope.loading= true;
	  	services.getUserBooks().then(
		          function(result) {
		        	  $scope.loading= false;
		              $scope.books = result;
		          });
    };
    
    $scope.showBookDetails= function(book){
    	$sessionStorage.book =book;
    	$location.path('/Book');    	
    };
        
	getUserBooks();	 
  });


angular.module('tbeControllers')
	.controller('addBookController', function ($scope, services, isbnSearchServices) {
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
	    
	    resetAddButton();
	}
);

angular.module('tbeControllers')
	.controller('bookController', function ($scope, $sessionStorage, $location, $anchorScroll, services) {
		
		var getBook = function() {
			$scope.loading= true;
			var book = $sessionStorage.book;
			if(book == undefined){
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
	    
	    getBook();
	}
);