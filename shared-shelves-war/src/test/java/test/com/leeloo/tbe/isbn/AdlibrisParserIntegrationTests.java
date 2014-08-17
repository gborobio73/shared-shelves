package test.com.leeloo.tbe.isbn;

import static org.junit.Assert.*;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.Test;

import com.leeloo.tbe.isbn.AdlibrisParser;

public class AdlibrisParserIntegrationTests {

	@Test
	public void AdlibrisParser_parse_shouldParseOneLineDescriptionAndAuthor() {
		String isbn = "9789524831635";
		try {
			AdlibrisParser parser = parseHtml(isbn);
			
			String description = parser.getDescription();
			
			assertTrue(description.contains(" Sakamuran ja Corralesin tutkimuksia? Hän jopa lähettää uhkein eroottisin asein varustetun agentti 69:n sekoittamaan terävän japanilaiskomisarion pasmoja.Samaan aikaan Madrizin keskushallinnon johtaja pääministeri Paquito "));
			assertTrue(parser.getAuthors().get(0).equals("Pablo Tusset"));			
		} catch (Exception e) {
			fail(e.getMessage());
		}			
	}

	@Test
	public void AdlibrisParser_parse_shouldParseOneLineDescriptionAnotheTest() {
		String isbn = "9781576875926";
		try {
			AdlibrisParser parser = parseHtml(isbn);
			
			String description = parser.getDescription();
			
			assertTrue(description.equals("Tämän kirjan kuvaus puuttuu tietokannastamme toistaiseksi, mutta voit löytää lisätietoja teoksesta sen kustantajan verkkosivuilta. Jos teosta ei ole vielä julkaistu, kuvaus toimitetaan todennäköisesti meille myöhemmin."));
						
		} catch (Exception e) {
			fail(e.getMessage());
		}			
	}
	
	@Test
	public void AdlibrisParser_parse_shouldParseSeveralAuthors() {
		String isbn = "9781576875926";
		try {
			AdlibrisParser parser = parseHtml(isbn);
			
			assertTrue(parser.getAuthors().get(0).equals("Ari Seth Cohen"));
			//assertTrue(parser.getAuthors().get(1).equals("Maira Kalman"));
			//assertTrue(parser.getAuthors().get(2).equals("Dita Von Teese"));
						
		} catch (Exception e) {
			fail(e.getMessage());
		}			
	}
	
	@Test
	public void AdlibrisParser_parse_shouldParseMultipleLineDescription() {
		String isbn = "9789524590525";
		
		try {
			AdlibrisParser parser = parseHtml(isbn);
			
			String description = parser.getDescription();
			
			assertTrue(description.contains("Ajan kulumisessa Hlynuria huolettaa ainoastaan käyttämättömien ja kohta vanhentuvien kondomien huomattava lukumäärä. Pikku-Björninsä tarkkailun laiminlyömisestä häntä ei tosin voi syyttää."));
		} catch (Exception e) {
			fail(e.getMessage());
		}			
	}
	
	private AdlibrisParser parseHtml(String isbn) throws IOException, Exception {
		String url = "http://www.adlibris.com/fi/product.aspx?isbn="+isbn;
		Document doc;
		doc = Jsoup.connect(url)
				  .data("query", "Java")
				  .userAgent("Mozilla")
				  .cookie("auth", "token")
				  .timeout(7000)
				  .post();
		AdlibrisParser parser = new AdlibrisParser(doc, isbn);
		
		parser.parseHtml();
		return parser;
	}

}
