package br.com.coffre.exception.notification;

public class NotificationException extends RuntimeException{
    public NotificationException(String error){
        super(error);
    }
}
