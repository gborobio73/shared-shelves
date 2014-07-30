package test.com.leeloo.tbe.isbn;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.leeloo.tbe.isbn.LookupService;
import com.leeloo.tbe.rest.jsonpojos.UiBook;

public class LookupServiceTests {

	@Test
	public void findBook_english_book_findsBook()
	{
		LookupService service = new LookupService();
		String isbn = "9524831635";
		//UiBook book = service.findBook(isbn );
		
		/*assertNotNull(book.title);
		assertNotNull(book.authors);
		//assertNotNull(book.categories);
		//assertNotNull(book.description);
		assertTrue(book.hasImage);
		assertNotNull(book.imageUrl);
		assertNotNull(book.isbn);
		assertNotNull(book.language);
		assertNotNull(book.pageCount);
		assertNotNull(book.price);
		//assertNotNull(book.subtitle);
*/		
	}
}
