package br.com.coffre.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import br.com.coffre.exception.auth.LoginException;
import br.com.coffre.exception.product.ProductException;
import br.com.coffre.model.User;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(User user) throws RuntimeException {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("coffre")
                    .withSubject(user.getEmail())
                    .withExpiresAt(generateExpirationDate())
                    .withClaim("companyId", user.getCompany().getId())
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException jwtEx) {
            throw new LoginException("Erro ao gerar token: " + jwtEx.getMessage());
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("coffre")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException jwtvEx) {
            return null;
        }
    }
    
    public Long getCompanyIdFromToken(String token) {
       try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algorithm)
                                     .withIssuer("coffre")
                                     .build();
            DecodedJWT decodedJWT = verifier.verify(token);
            return decodedJWT.getClaim("companyId").asLong();
        } catch (JWTVerificationException e) {
            throw new ProductException(e.getMessage());
        }
    }

    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(1).toInstant(ZoneOffset.of("-03:00"));
    }
}
