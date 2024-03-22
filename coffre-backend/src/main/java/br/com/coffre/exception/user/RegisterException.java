package br.com.coffre.exception.user;

public class RegisterException extends RuntimeException{
    public RegisterException(String error){
        super(error);
    }
}
