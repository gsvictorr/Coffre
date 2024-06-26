package br.com.coffre.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.coffre.dto.auth.AuthRequest;
import br.com.coffre.dto.auth.AuthResponse;
import br.com.coffre.dto.auth.TokenValidateRequest;
import br.com.coffre.dto.auth.TokenValidateResponse;
import br.com.coffre.exception.auth.LoginException;
import br.com.coffre.exception.company.CompanyException;
import br.com.coffre.model.Company;
import br.com.coffre.model.User;
import br.com.coffre.repository.CompanyRepository;
import br.com.coffre.service.TokenService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private CompanyRepository companyRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid AuthRequest authRequest) {
        if (authRequest.email().isEmpty() || authRequest.password().isEmpty()) {
            throw new LoginException("Email e senha não podem ser nulos.");
        } else {
            var usernamePassword = new UsernamePasswordAuthenticationToken(authRequest.email(),
                    authRequest.password());

            var authentication = this.authenticationManager.authenticate(usernamePassword);
            var token = tokenService.generateToken((User) authentication.getPrincipal());

            Long companyId = tokenService.getCompanyIdFromToken(token);

            Company company = companyRepository.findById(companyId)
                    .orElseThrow(() -> new CompanyException("Empresa não encontrada para o ID fornecido."));

            try {
                if (company.isEnabled()) {
                    AuthResponse authResponse = new AuthResponse(token);
                } else {
                    throw new CompanyException("A empresa está desativada.");
                }
            } catch (LoginException e) {
                throw new LoginException(e.getMessage());
            }

            return ResponseEntity.ok(new AuthResponse(token));
        }

    }

    @PostMapping("/validate")
    public ResponseEntity<TokenValidateResponse> validateToken(
            @RequestBody @Valid TokenValidateRequest tokenValidateRequest) {

        var outputValid = tokenService.validateToken(tokenValidateRequest.token());

        var isValid = false;

        if (!outputValid.isBlank()) {
            isValid = true;
        }

        return ResponseEntity.ok().body(new TokenValidateResponse(isValid));

    }

}
