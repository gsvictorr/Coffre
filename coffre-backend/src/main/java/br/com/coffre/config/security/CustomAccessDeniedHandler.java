package br.com.coffre.config.security;

import java.io.IOException;
import java.io.OutputStream;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void handle(HttpServletRequest request,
                       HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException, ServletException {

        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType("application/json");

        ErrorDetails errorDetails = new ErrorDetails("Usuário sem permissão para acessar este recurso.");
        OutputStream out = response.getOutputStream();
        objectMapper.writeValue(out, errorDetails);
        out.flush();
    }

    private static class ErrorDetails {
        private final String error;

        public ErrorDetails(String error) {
            this.error = error;
        }

        public String getError() {
            return error;
        }
    }
}
