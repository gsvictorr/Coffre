package br.com.coffre.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.coffre.dto.user.UserRequest;
import br.com.coffre.dto.user.UserResponse;
import br.com.coffre.service.TokenService;
import br.com.coffre.service.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@RequestBody @Valid UserRequest userRequest) {
        UserResponse registerUser = userService.registerUser(userRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(registerUser);
    }

    @GetMapping("/name")
    public ResponseEntity<Map<String, String>> getNameUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        String jwtToken = token.substring(7);
        String name = tokenService.getNameFromToken(jwtToken);
        Map<String, String> responseName = new HashMap<>();
        responseName.put("name", name);
        return ResponseEntity.status(HttpStatus.OK).body(responseName);
    }

}
