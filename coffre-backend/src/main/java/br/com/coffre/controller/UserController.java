package br.com.coffre.controller;

import java.util.HashMap;
import java.util.List;
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

import br.com.coffre.dto.user.UserInfo;
import br.com.coffre.dto.user.UserList;
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
    public ResponseEntity<UserResponse> registerUser(@RequestBody @Valid UserRequest userRequest, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String jwtToken = token.substring(7);
        UserResponse registerUser = userService.registerUser(userRequest, jwtToken);
        return ResponseEntity.status(HttpStatus.CREATED).body(registerUser);
    }

    @GetMapping("/info")
    public ResponseEntity<UserInfo> getInfoUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        String jwtToken = token.substring(7);
        Long id = tokenService.getUserFromToken(jwtToken);
        UserInfo infoUser = userService.infoUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(infoUser);
    }

    @GetMapping
    public ResponseEntity<UserList> getAllUsers(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        String jwtToken = token.substring(7);
        List<UserResponse> users = userService.listAllUsers(jwtToken);
        UserList userList = new UserList(users);
        return ResponseEntity.status(HttpStatus.OK).body(userList);
    }
    

}
