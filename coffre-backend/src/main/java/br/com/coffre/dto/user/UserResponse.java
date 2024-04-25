package br.com.coffre.dto.user;

import br.com.coffre.config.role.UserRole;
import br.com.coffre.model.Company;
import br.com.coffre.model.User;

public record UserResponse (Long id, String name, String email, String password, UserRole role, Company company){
    
    public UserResponse(User user){
        this(user.getId(), user.getName(), user.getEmail(), user.getPassword(), user.getRole(), user.getCompany());
    }
}
