package br.com.coffre.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.coffre.dto.notification.NotificationList;
import br.com.coffre.dto.notification.NotificationResponse;
import br.com.coffre.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public ResponseEntity<NotificationList> getAllNotifications(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String jwtToken = token.substring(7);
        List<NotificationResponse> notifications = notificationService.listAllNotifications(jwtToken);
        NotificationList notificationList = new NotificationList(notifications);
        return ResponseEntity.status(HttpStatus.OK).body(notificationList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable("id") Long id) {
        notificationService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

}
