package com.leeloo.tbe.isbn;

import java.util.Arrays;
import java.util.List;

import com.leeloo.tbe.TbeUser;

public class LookupServiceRunnerFactory {

	public LookupServiceRunner build(TbeUser user, String language){
		List<ILookupService> services =  Arrays.asList(new FiLookupService(), new EsLookupService());
		
		if(language.equals("es")){
			services =  Arrays.asList(new EsLookupService(), new FiLookupService());
		}
		
		return new LookupServiceRunner(services, user);
	}
}
