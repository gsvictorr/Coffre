package br.com.coffre.exception.notification;

public class EmailException extends RuntimeException {
    public EmailException(String error){
        super(error);
    }
}
