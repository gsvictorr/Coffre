package br.com.coffre.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.coffre.config.role.UserRole;
import br.com.coffre.dto.notification.NotificationResponse;
import br.com.coffre.exception.company.CompanyException;
import br.com.coffre.exception.notification.NotificationException;
import br.com.coffre.model.Company;
import br.com.coffre.model.Notification;
import br.com.coffre.model.User;
import br.com.coffre.repository.CompanyRepository;
import br.com.coffre.repository.NotificationRepository;
import br.com.coffre.repository.UserRepository;
import br.com.coffre.utils.FormatedDate;
import jakarta.transaction.Transactional;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private CompanyRepository companyRepository;


    public List<NotificationResponse> listAllNotifications(String token){

     Long companyId = tokenService.getCompanyIdFromToken(token);

        if (companyId == null) {
            throw new CompanyException("O ID da empresa não pode ser nulo.");
        }

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanyException("Empresa não encontrada para o ID fornecido."));

        List<NotificationResponse> notifications = notificationsRepository.findAllByCompany(company).stream().map(NotificationResponse::new).toList();
        return notifications;
    }

    @Transactional
    public void sendNotification(String tittle, String description, Map<String, Object> properties, Company company){

        List<User> admins = userRepository.findByRoleAndCompany(UserRole.ADMIN, company);

        for(User admin: admins){
            emailService.sendEmailNotification(admin.getEmail(), tittle, properties);
        }

        FormatedDate formatedDate = new FormatedDate();
        Notification notification = new Notification();
        notification.setTittle(tittle);
        notification.setDescription(description);
        notification.setDate(formatedDate.verifyCompleteDate());
        notification.setCompany(company);
        notificationsRepository.save(notification);
    }


    public void deleteProduct(Long id){
        try {
            if(id == null){
                throw new NotificationException("ID da notificação não pode ser nulo.");
            } else{
                notificationsRepository.deleteById(id);
            }
            
        } catch (NotificationException e) {
            throw new NotificationException("Notificação com esse ID não foi localizada ou já foi excluida.");
        }
    }

}

