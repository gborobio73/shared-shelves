package test.com.leeloo.tbe.isbn;

import static org.junit.Assert.*;

import org.junit.Test;

import com.leeloo.tbe.isbn.EsLookupService;
import com.leeloo.tbe.rest.jsonpojos.UiBook;

public class EsLookupServiceTests {

	@Test
	public void findBook_bookInSpanish_findsBook()
	{
		EsLookupService service = new EsLookupService();
		String isbn = "9788466316927";
		try {
			UiBook book = service.findBook(isbn );
			
			assertEquals("EL MAESTRO DE ESGRIMA (PDL ED. 6E)", book.title);
			assertEquals("ARTURO PEREZ-REVERTE",book.authors.get(0));
			assertNotNull(book.categories);
			assertNotNull(book.description);
			assertTrue(book.hasImage);
			assertNotNull(book.imageUrl);
			assertEquals("9788466316927", book.isbn);
			assertEquals("es", book.language);
			assertEquals("320", book.pageCount);
			assertEquals(0, book.price);
			assertNull(book.subtitle);
			assertTrue(book.ownedByCurrentUser);
		} catch (Exception e)		{
			fail(e.getMessage());
		}
	}
	
	@Test
	public void findBook_bookWithoutImage_findsBook()
	{
		EsLookupService service = new EsLookupService();
		String isbn = "9788420660851";
		try {
			UiBook book = service.findBook(isbn );
			
			assertEquals("EL GUARDIAN ENTRE EL CENTENO", book.title);
			assertEquals("J.D. SALINGER",book.authors.get(0));
			assertNotNull(book.categories);
			assertNotNull(book.description);
			assertFalse(book.hasImage);
			assertNotNull(book.imageUrl);
			assertEquals("9788420660851", book.isbn);
			assertEquals("es", book.language);
			assertEquals("272", book.pageCount);
			assertEquals(0, book.price);
			assertNull(book.subtitle);
			assertTrue(book.ownedByCurrentUser);
		} catch (Exception e)		{
			fail(e.getMessage());
		}
	}
	
	@Test
	public void findBook_DoesNotFindTheBook()
	{
		EsLookupService service = new EsLookupService();
		String isbn = "9788408094173";
		try {
			service.findBook(isbn );
			fail("Should have thrown book not found exception");
			
		} catch (Exception e)		{
			
		}
	}	
}
