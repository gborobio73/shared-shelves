package test.com.leeloo.tbe.isbn;

import static org.junit.Assert.*;

import org.junit.Test;

import com.leeloo.tbe.isbn.LookupService;
import com.leeloo.tbe.rest.jsonpojos.UiBook;

public class LookupServiceTests {

	@Test
	public void findBook_bookInFinnish_findsBook()
	{
		LookupService service = new LookupService();
		String isbn = "9524831635";
		try {
			UiBook book = service.findBook(isbn );
			
			assertEquals("Nauravat vainajat", book.title);
			assertEquals("Pablo Tusset",book.authors.get(0));
			//assertNotNull(book.categories);
			assertNotNull(book.description);
			assertTrue(book.hasImage);
			assertNotNull(book.imageUrl);
			assertEquals("9524831635", book.isbn);
			assertEquals("fi", book.language);
			assertEquals("207", book.pageCount);
			assertEquals(0, book.price);
			assertNull(book.subtitle);
			assertTrue(book.ownedByCurrentUser);
		} catch (Exception e)		{
			fail(e.getMessage());
			//System.out.println(e.getMessage());
		}
	}
	@Test
	public void findBook_bookNoImageAndSubtitle_findsBook()
	{
		LookupService service = new LookupService();
		String isbn = "9788408094173";
		try {
			UiBook book = service.findBook(isbn );
			
			assertEquals("Nido vacio", book.title);
			assertEquals("Alicia Giménez-Bartlett",book.authors.get(0));
			//assertNotNull(book.categories);
			assertNotNull(book.description);
			assertFalse(book.hasImage);
			assertEquals("http://books.google.fi/googlebooks/images/no_cover_thumb.gif", book.imageUrl);
			assertEquals("9788408094173", book.isbn);
			assertEquals("es", book.language);
			assertEquals("395", book.pageCount);
			assertEquals(0, book.price);
			assertEquals("Un caso de Petra Delicado", book.subtitle);
		} catch (Exception e)		{
			fail(e.getMessage());
			//System.out.println(e.getMessage());
		}
	}
	
}
