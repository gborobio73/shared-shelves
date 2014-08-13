package test.com.leeloo.tbe.common;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.leeloo.tbe.common.NameHelper;

public class NameHelperTests {

	@Test
	public void test() {
		NameHelper sut = new NameHelper();
		
		String camelCase = sut.toCamelCase("EL MAESTRO DE ESGRIMA (PDL ED. 6E)");
		
		assertEquals("El Maestro De Esgrima (pdl Ed. 6e)", camelCase);
	}

}
