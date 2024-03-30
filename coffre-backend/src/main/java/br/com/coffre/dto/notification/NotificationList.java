package br.com.coffre.dto.notification;

import java.util.List;

public record NotificationList (List<NotificationResponse> notifications) {
    
}
