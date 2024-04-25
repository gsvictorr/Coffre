package br.com.coffre.config.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import br.com.coffre.exception.auth.LoginException;
import br.com.coffre.exception.auth.SecurityException;
import br.com.coffre.repository.UserRepository;
import br.com.coffre.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(@SuppressWarnings("null") HttpServletRequest request, @SuppressWarnings("null") HttpServletResponse response, @SuppressWarnings("null") FilterChain filterChain)
            throws ServletException, IOException {
                try {
                    String token = recoverToken(request);
                    
                    if (token != null) {
                        String email = tokenService.validateToken(token);
                        
                        if (email != null) {
                            UserDetails user = userRepository.findByEmail(email);
                            
                            if (user != null) {
                                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                                SecurityContextHolder.getContext().setAuthentication(authentication);
                            } else {
                                throw new LoginException("Usuário não encontrado.");
                            }
                        } else {
                            throw new SecurityException("Token de acesso fornecido é inválido.");
                        }
                    }
            
                    filterChain.doFilter(request, response);
                } catch (IOException | ServletException ex) {
                    throw new SecurityException("Erro durante o filtro de segurança");
                }
            }

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null) {
            return null;
        } else {
            return authHeader.replace("Bearer ", "");
        }
    }
}
