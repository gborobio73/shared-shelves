package test.com.leeloo.tbe;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.Arrays;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.leeloo.tbe.TbeUser;
import com.leeloo.tbe.UseCases;
import com.leeloo.tbe.book.Book;
import com.leeloo.tbe.repository.BookshelfRepository;

public class UseCaseTests {
	
	static LocalServiceTestHelper localService =  new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
	UseCases useCases = new UseCases();
	BookshelfRepository repository = new BookshelfRepository();
	
	@Before
	public void setUp() {
		localService.setUp();   
    }
	
	@After 
	public void tearDown() {
		localService.tearDown();
	}
	
	@Test
	public void UseCase_addBook() {
		Book book = new Book();
		List<String> authors =Arrays.asList("Stephen King", "Arturo Perez");
		book.authors = authors ;
		List<String> categories = Arrays.asList("Horror", "Sci-fi");;
		book.categories = categories ;
		String description ="Oh my they are here!";
		book.description = description ;
		book.hasImage = true;
		String imageUrl = "http://someUrl";
		book.imageUrl = imageUrl;
		String isbn = "9780297848585";
		book.isbn= isbn;
		String language = "es";
		book.language = language;
		String location = "Helsinki";
		book.location=location;
		String pageCount = "456";
		book.pageCount = pageCount;
		int price = 5;
		book.price = price;
		String subtitle = "The worst!";
		book.subtitle = subtitle ;
		String title = "Alahorror";
		book.title = title;
		
		String userEmail ="me@goops.de";
		String userName ="Me";
		TbeUser user = new TbeUser("12", userName, userEmail, "nickname");
		useCases.addToBookshelf(book, user );	
		
		Book savedBook= repository.getAll().get(0);
		assertEquals(authors, savedBook.authors);
		assertEquals(categories, savedBook.categories);
		assertEquals(description, savedBook.description);
		assertTrue(savedBook.hasImage);
		assertEquals(imageUrl, savedBook.imageUrl);
		assertEquals(isbn, savedBook.isbn);
		assertEquals(language, savedBook.language);
		assertEquals(location, savedBook.location);
		assertEquals(pageCount, savedBook.pageCount);
		assertEquals(price, savedBook.price);
		assertEquals(subtitle, savedBook.subtitle);
		assertEquals(title, savedBook.title);
		
		assertEquals(userName, savedBook.owner.getName());
		assertEquals(userEmail, savedBook.owner.getEmail());		
	}	
}
