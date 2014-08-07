describe('Bookshelf controller tests', function() {
  var $scope, ctrl, $timeout, $sessionStorage, $location;
  
  /* declare our mocks out here
   * so we can use them through the scope 
   * of this describe block.
   */
  var servicesMock;
  
 
  // This function will be called before every "it" block.
  // This should be used to "reset" state for your tests.
  beforeEach(function (){
    // Create a "spy object" for our someService.
    // This will isolate the controller we're testing from
    // any other code.
    // we'll set up the returns for this later 
	  servicesMock = jasmine.createSpyObj('services', ['getAllBooks']);
    
    // load the module you're testing.
    module('tbe', 
    		  'ui.router', 'ui.bootstrap', 'ngCookies', 'ngStorage',
    		   'tbeControllers', 'tbeServices', 'tbeDirectives'
    		   );
    

    
    // INJECT! This part is critical
    // $rootScope - injected to create a new $scope instance.
    // $controller - injected to create an instance of our controller.
    // $q - injected so we can create promises for our mocks.
    // _$timeout_ - injected to we can flush unresolved promises.
    inject(function($rootScope, $controller, $q, _$timeout_, $sessionStorage, $location) {
      // create a scope object for us to use.
      $scope = $rootScope.$new();
  
      // set up the returns for our someServiceMock
      // $q.when('weee') creates a resolved promise to "weee".
      // this is important since our service is async and returns
      // a promise.
      var books = [{"id":"5433686740697088","ownedByCurrentUser":true,"created":"Aug 4, 2014 2:20:08 PM","title":"Ãngel y el troll","description":"desc","authors":["Johanna Sinisalo"],"language":"Spanish","pageCount":"334","hasImage":true,"imageUrl":"http://ecx.images-amazon.com/images/I/51OFZvaLoPL._SY300_.jpg","isbn":"9788496071551","location":"Turku","price":5}];
      servicesMock.getAllBooks.andReturn($q.when(books));
      
      // assign $timeout to a scoped variable so we can use 
      // $timeout.flush() later. Notice the _underscore_ trick
      // so we can keep our names clean in the tests.
      $timeout = _$timeout_;
      
      // now run that scope through the controller function,
      // injecting any services or other injectables we need.
      // **NOTE**: this is the only time the controller function
      // will be run, so anything that occurs inside of that
      // will already be done before the first spec.
      ctrl = $controller('bookshelfController', {
        $scope: $scope,
        $location: $location, 
        $sessionStorage: $sessionStorage,
        services: servicesMock
      });
    });
  });
 
 
  /* Test 1: The simplest of the simple.
   * here we're going to test that some things were 
   * populated when the controller function whas evaluated. */
  it('should load all books', function() {
    
    //just assert. $scope was set up in beforeEach() (above)
    expect($scope.books).toEqual(books);
    expect($scope.loading).toBeFalsy();
  });
  
  /* Test 4: Testing an asynchronous service call.
     Since we've mocked the service to return a promise
     (just like the original service did), we need to do a little
     trick with $timeout.flush() here to resolve our promise so the
     `then()` clause in our controller function fires. 
     
     This will test to see if the `then()` from the promise is wired up
     properly. */
  /*it('should update fizz asynchronously when test2() is called', function (){
    // just make the call
    $scope.test2();
    
    // asser that it called the service method.
    expect(servicesMock.someAsyncCall).toHaveBeenCalled();  
    
    // call $timeout.flush() to flush the unresolved dependency from our
    // someServiceMock.
    $timeout.flush();
    
    // assert that it set $scope.fizz
    expect($scope.fizz).toEqual('weee');    
  });*/
});