package br.com.coffre.exception.user;

public class UserException extends RuntimeException {
    public UserException(String error){
        super(error);
    }
}
