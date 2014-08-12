package test.com.leeloo.tbe.isbn;

import static org.junit.Assert.*;

import org.junit.Test;

import com.leeloo.tbe.isbn.FiLookupService;
import com.leeloo.tbe.rest.jsonpojos.UiBook;

public class LookupServiceTests {

	@Test
	public void findBook_bookInFinnish_findsBook()
	{
		FiLookupService service = new FiLookupService();
		String isbn = "9524831635";
		try {
			UiBook book = service.findBook(isbn );
			
			assertEquals("Nauravat vainajat", book.title);
			assertEquals("Pablo Tusset",book.authors.get(0));
			assertTrue(book.categories.size() == 0);
			assertNotNull(book.description);
			assertTrue(book.hasImage);
			assertNotNull(book.imageUrl);
			assertEquals("9524831635", book.isbn);
			assertEquals("fi", book.language);
			assertEquals("207", book.pageCount);
			assertEquals(0, book.price);
			assertTrue(book.subtitle.isEmpty());
			assertTrue(book.ownedByCurrentUser);
		} catch (Exception e)		{
			fail(e.getMessage());
		}
	}
	@Test
	public void findBook_bookNoImageAndSubtitle_findsBook()
	{
		FiLookupService service = new FiLookupService();
		String isbn = "9788408094173";
		try {
			UiBook book = service.findBook(isbn );
			
			assertEquals("Nido vacio", book.title);
			assertEquals("Alicia Giménez-Bartlett",book.authors.get(0));
			assertTrue(book.categories.size() == 0);
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
		}
	}
	@Test
	public void findBook_DoesNotFindTheBook()
	{
		FiLookupService service = new FiLookupService();
		String isbn = "9788497597210";
		try {
			service.findBook(isbn );
			fail("Should have thrown book not found exception");
			
		} catch (Exception e)		{
			
		}
	}
	
}
