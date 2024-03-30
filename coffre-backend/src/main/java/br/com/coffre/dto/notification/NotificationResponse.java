package br.com.coffre.dto.notification;

import br.com.coffre.model.Notification;

public record NotificationResponse (Long id, String tittle, String description, String date){
    
    public NotificationResponse(Notification notification){
        this(notification.getId(), notification.getTittle(), notification.getDescription(), notification.getDate());
    }
}
