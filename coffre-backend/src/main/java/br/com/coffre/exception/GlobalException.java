package br.com.coffre.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.com.coffre.exception.auth.LoginException;
import br.com.coffre.exception.auth.SecurityException;
import br.com.coffre.exception.company.CompanyException;
import br.com.coffre.exception.notification.NotificationException;
import br.com.coffre.exception.product.ProductException;
import br.com.coffre.exception.user.RegisterException;
import br.com.coffre.exception.user.UserException;

@RestControllerAdvice
public class GlobalException {

    // ValidException
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> validException(MethodArgumentNotValidException ex) {
        Map<String, String> error = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((errors) -> {
            String value = ((FieldError) errors).getField();
            String message = errors.getDefaultMessage();
            error.put(value, message);
        });
        return error;
    }

    // LoginException
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(LoginException.class)
    public Map<String, String> loginException(LoginException ex) {
        Map<String, String> errorsMap = new HashMap<String, String>();
        errorsMap.put("error", ex.getMessage());
        return errorsMap;
    }

    // RegisterException
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(RegisterException.class)
    public Map<String, String> registerException(RegisterException ex) {
        Map<String, String> errorsMap = new HashMap<String, String>();
        errorsMap.put("error", ex.getMessage());
        return errorsMap;
    }

    // CompanyException
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CompanyException.class)
    public Map<String, String> companyException(CompanyException ex) {
        Map<String, String> errorsMap = new HashMap<String, String>();
        errorsMap.put("error", ex.getMessage());
        return errorsMap;
    }

    // ProductException
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ProductException.class)
    public Map<String, String> productException(ProductException ex) {
        Map<String, String> errorsMap = new HashMap<String, String>();
        errorsMap.put("error", ex.getMessage());
        return errorsMap;
    }

    // NotificationException
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(NotificationException.class)
    public Map<String, String> notificationException(NotificationException ex) {
        Map<String, String> errorsMap = new HashMap<String, String>();
        errorsMap.put("error", ex.getMessage());
        return errorsMap;
    }

    // UserException
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(UserException.class)
    public Map<String, String> userException(UserException ex) {
        Map<String, String> errorsMap = new HashMap<String, String>();
        errorsMap.put("error", ex.getMessage());
        return errorsMap;
    }

    // AccessDeniedException
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(AccessDeniedException.class)
    public Map<String, String> acessDeniedException(AccessDeniedException ex) {
        Map<String, String> errorsMap = new HashMap<>();
        errorsMap.put("error", ex.getMessage());
        return errorsMap;
    }

    // AuthenticationException
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(AuthenticationException.class)
    public Map<String, String> acessDeniedException(AuthenticationException ex) {
        Map<String, String> errorsMap = new HashMap<>();
        errorsMap.put("error", ex.getMessage());
        return errorsMap;
    }

    // DisabledException
    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(DisabledException.class)
    public Map<String, String> disabledException(DisabledException ex) {
        Map<String, String> errorsMap = new HashMap<>();
        errorsMap.put("error", "O usuário está desativado.");
        return errorsMap;
    }

    // SecurityException
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(SecurityException.class)
    public Map<String, String> securityException(SecurityException ex) {
        Map<String, String> errorsMap = new HashMap<>();
        errorsMap.put("error", ex.getMessage());
        return errorsMap;
    }

    // MissingRequestHeaderException
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(MissingRequestHeaderException.class)
    public Map<String, String> requestHeaderException(MissingRequestHeaderException ex) {
        Map<String, String> errorsMap = new HashMap<>();
        errorsMap.put("error", "Token de acesso inválido ou nulo.");
        return errorsMap;
    }

}
