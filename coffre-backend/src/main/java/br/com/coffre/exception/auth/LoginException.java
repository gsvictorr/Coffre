package br.com.coffre.exception.auth;

public class LoginException extends RuntimeException {
    public LoginException(String error) {
        super(error);
    }
}
