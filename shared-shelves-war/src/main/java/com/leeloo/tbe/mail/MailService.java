package com.leeloo.tbe.mail;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class MailService {

	public void send(TbeEmail email) throws Exception {
		
		Properties props = new Properties();
        Session session = Session.getDefaultInstance(props, null);

        Message msg = new MimeMessage(session);
        
        msg.setFrom(new InternetAddress(email.getFrom()));
        
        msg.addRecipient(Message.RecipientType.TO,new InternetAddress(email.getTo()));
        
        msg.setSubject(email.getSubject());
        
        msg.setContent(email.getMessage(), "text/html");
        
        Transport.send(msg);
	}

}
