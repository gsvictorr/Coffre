package br.com.coffre.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import br.com.coffre.exception.notification.EmailException;
import freemarker.template.Configuration;
import freemarker.template.TemplateException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

     @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private Configuration fmConfiguration;

    @Value("${spring.mail.username}")
    private String sender;

    public String templateNotification(Map<String, Object> model) throws IOException, TemplateException {
        StringBuffer content = new StringBuffer();

        try {
            content.append(FreeMarkerTemplateUtils
                    .processTemplateIntoString(fmConfiguration.getTemplate("notification.flth"), model));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return content.toString();
    }
    

    public void sendEmailNotification(String receiver, String tittle, Map<String, Object> properties) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            if (tittle != null && receiver != null && sender != null) {
                mimeMessageHelper.setSubject(tittle);
                mimeMessageHelper.setTo(receiver);
                mimeMessageHelper.setFrom(receiver, "Coffre");
                mimeMessageHelper.setText(templateNotification(properties), true);
                javaMailSender.send(mimeMessageHelper.getMimeMessage());
            } else {
                throw new EmailException("Falha ao enviar email.");
            }

        } catch (Exception e) {
            throw new EmailException(e.getMessage());
        }

    }

}
