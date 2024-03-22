package br.com.coffre.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.coffre.exception.auth.LoginException;
import br.com.coffre.repository.UserRepository;

@Service
public class AuthService implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{

        if (userRepository.findByEmail(email) == null) {
            throw new LoginException("Usuário não encontrado");
        } else {
            return userRepository.findByEmail(email);
        }
    }
    
}
