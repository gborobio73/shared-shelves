package test.com.leeloo.tbe.repository;

import static org.junit.Assert.assertEquals;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.leeloo.tbe.TbeUser;
import com.leeloo.tbe.book.Book;
import com.leeloo.tbe.repository.BookshelfRepository;

public class RepositoryTests {

	static LocalServiceTestHelper helper =  new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
	BookshelfRepository repository = new BookshelfRepository();
	
	@BeforeClass 
	public static void setUp() {
		helper.setUp();   
    }
	
	@AfterClass 
	public static void tearDown() {
		helper.tearDown();
	}
	
	@Test
	public void Repository_save_savesBookWithOwner() {
		String userEmail ="a@goops.de";
		String userName ="Me";
		TbeUser user = new TbeUser("12", userName, userEmail, "nickname");
		
		Book book = new Book();
		book.setOwner(user);
		
		repository.save(book);
		
		Book savedBook = repository.get(book.id);
		
		assertEquals(user.getEmail(), savedBook.owner.getEmail());
		assertEquals(user.getName(), savedBook.owner.getName());
	}
	
	@Test
	public void Repository_getFromUser() {
		String userEmail ="me@domain.de";
		String userName ="Me";
		String userId = "34";
		TbeUser user = new TbeUser(userId, userName, userEmail, "nickname");
		
		Book book = new Book();
		book.setOwner(user);		
		repository.save(book);
		
		user = new TbeUser("56", "another user", "anotherUser@doamin.com", "nickname");
		book = new Book();
		book.setOwner(user);
		repository.save(book);
		
		user = new TbeUser("78", "yet another user", "yetAnotherUser@doamin.com", "nickname");
		book = new Book();
		book.setOwner(user);
		repository.save(book);
		
		int userBooks = repository.getFromUser(new TbeUser(userId, userName, userEmail, "nickname")).size();
		
		assertEquals(1, userBooks);		
	}
	
}
