package br.com.coffre.dto.user;

import br.com.coffre.config.role.UserRole;
import br.com.coffre.model.Company;

public record UserResponse (Long id, String name, String email, String password, UserRole role, Company company){
    
}
