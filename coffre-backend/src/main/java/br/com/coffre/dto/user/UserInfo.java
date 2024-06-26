package br.com.coffre.dto.user;



import br.com.coffre.config.role.UserRole;
import br.com.coffre.model.User;

public record UserInfo (Long id, String name, String email, UserRole userRole){
    
    public UserInfo(User user){
        this(user.getId(), user.getName(), user.getEmail(), user.getRole());
    }
}
