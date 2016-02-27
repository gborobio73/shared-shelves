* Clean and install (package)
Macgon:shared-shelves Gon$ ~/Documents/Tools/apache-maven-3.2.1/bin/mvn clean install

* Upload to GAE
Macgon:shared-shelves-ear Gon$ ~/Documents/Tools/apache-maven-3.2.1/bin/mvn appengine:update

* source in shared-shelves-war





Maven 
~/Documents/Tools/apache-maven-3.2.1/bin/mvn archetype:generate -DarchetypeArtifactId=jersey-quickstart-grizzly2 \
-DarchetypeGroupId=org.glassfish.jersey.archetypes -DinteractiveMode=false \
-DgroupId=com.leeloo -DartifactId=virtual-is-viral -Dpackage=com.leeloo \
-DarchetypeVersion=2.8 

Clean:
~/Documents/Tools/apache-maven-3.2.1/bin/mvn clean

Run:
~/Documents/Tools/apache-maven-3.2.1/bin/mvn jetty:run

~/Documents/Tools/apache-maven-3.2.1/bin/mvn jetty:run-war

inspect angular scope
angular.element($0).scope()

debug in (check which ip has the laptop assigned)
--address=192.168.0.10 --port=8080 --disable_update_check /Users/Gon/Projects/.metadata/.plugins/org.eclipse.wst.server.core/tmp0/virtual-is-viral-war

angular route with params:
  .state('Book', {
      //url: '/Book/:bookId',
      templateUrl: 'partials/Book.html',
      controller: 'bookController'
  })
      
  var getBook = function(bookId) {
      $scope.loading= true;
        services.getBook(bookId).then(
        function(book) {
          [...]
          }); 
      };
        
  var bookId = $stateParams.bookId;
    