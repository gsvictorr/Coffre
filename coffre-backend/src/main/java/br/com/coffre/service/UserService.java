package br.com.coffre.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.coffre.dto.user.UserInfo;
import br.com.coffre.dto.user.UserRequest;
import br.com.coffre.dto.user.UserResponse;
import br.com.coffre.exception.company.CompanyException;
import br.com.coffre.exception.user.RegisterException;
import br.com.coffre.exception.user.UserException;
import br.com.coffre.model.Company;
import br.com.coffre.model.User;
import br.com.coffre.repository.CompanyRepository;
import br.com.coffre.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private TokenService tokenService;

    public UserResponse registerUser(UserRequest userRequest, String token) {

        Long companyId = tokenService.getCompanyIdFromToken(token);

        if (companyId == null) {
            throw new CompanyException("O ID da empresa não pode ser nulo.");
        }

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanyException("Empresa não encontrada para o ID fornecido."));

        try {
            User newUser = userRequest.convert(userRequest);
            if (userRepository.findByEmailAndCompany(newUser.getEmail(), company) != null) {
                throw new RegisterException("Esse email já está cadastrado em outro usuário.");
            } else {
                String encodedPassword = passwordEncoder.encode(newUser.getPassword());
                newUser.setPassword(encodedPassword);
                newUser.setEnabled(true);
                newUser.setCompany(company);
                userRepository.save(newUser);

                UserResponse userResponse = new UserResponse(newUser.getId(), newUser.getName(), newUser.getEmail(),
                        newUser.getPassword(), newUser.getRole(), newUser.getCompany());

                return userResponse;

            }
        } catch (RegisterException e) {
            throw new RegisterException(e.getMessage());
        }

    }

    public List<UserResponse> listAllUsers(String token) {

        Long companyId = tokenService.getCompanyIdFromToken(token);

        if (companyId == null) {
            throw new CompanyException("O ID da empresa não pode ser nulo.");
        }

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanyException("Empresa não encontrada para o ID fornecido."));

        List<UserResponse> users = userRepository.findAllByCompany(company).stream().map(UserResponse::new)
                .toList();
        return users;
    }

    public UserInfo infoUser(Long id) {

        Optional<User> newInfo = userRepository.findById(id);

        if (newInfo.isPresent()) {
            UserInfo userInfo = new UserInfo(newInfo.get().getId(), newInfo.get().getName(), newInfo.get().getEmail(), newInfo.get().getRole());

            return userInfo;
        } else {
            throw new UserException("Ocorreu um erro ao encontrar esse usuário.");
        }

    }
}
