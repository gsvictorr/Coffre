package br.com.coffre.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import br.com.coffre.config.role.UserRole;
import br.com.coffre.model.Company;
import br.com.coffre.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    UserDetails findByEmail(String email);

    List<User> findByRoleAndCompany(UserRole role, Company company);
  
    User findByEmailAndCompany(String email, Company company);

    List<User> findAllByCompany(Company company);

    User findByIdAndCompany(Long id, Company company);

    
}
