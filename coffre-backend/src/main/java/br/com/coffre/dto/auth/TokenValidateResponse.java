package br.com.coffre.dto.auth;

import com.fasterxml.jackson.annotation.JsonProperty;


public record TokenValidateResponse (@JsonProperty("token_valid") boolean tokenValid) {

}

    
