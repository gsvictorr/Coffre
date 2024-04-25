package br.com.coffre.exception.auth;

public class SecurityException extends RuntimeException {
    public SecurityException(String error) {
        super(error);
    }
}
