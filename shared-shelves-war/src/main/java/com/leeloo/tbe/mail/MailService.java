package com.leeloo.tbe.mail;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import com.leeloo.tbe.common.TbeLogger;

public class MailService {

	public void send(TbeEmail email) throws Exception {
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);
		
		Message msg = new MimeMessage(session);
		
	    msg.setFrom(new InternetAddress(email.getFrom()));
	    msg.addRecipient(Message.RecipientType.TO,
	     new InternetAddress(email.getTo()));
	    
	    new TbeLogger().info(String.format("(5) About to send email from %s to %s body %s", email.getFrom(), email.getTo(), email.getMessage()));
	    
	    Multipart mp = new MimeMultipart();

        MimeBodyPart htmlPart = new MimeBodyPart();
        htmlPart.setContent(email.getMessage(), "text/html");
        mp.addBodyPart(htmlPart);
	    
	    msg.setSubject(email.getSubject());
	    msg.setContent(mp);
	    Transport.send(msg);
	    new TbeLogger().info(String.format("(5) Email sent."));
	}

}
