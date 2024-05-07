package br.com.coffre.dto.user;



import br.com.coffre.model.User;

public record UserInfo (Long id, String name, String email){
    
    public UserInfo(User user){
        this(user.getId(), user.getName(), user.getEmail());
    }
}
