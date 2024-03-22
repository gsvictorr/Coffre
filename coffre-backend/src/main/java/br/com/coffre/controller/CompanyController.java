package br.com.coffre.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.coffre.dto.company.CompanyRequest;
import br.com.coffre.dto.company.CompanyResponse;
import br.com.coffre.service.CompanyService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping("/register")
    public ResponseEntity<CompanyResponse> registerCompany(@RequestBody @Valid CompanyRequest companyRequest){
        CompanyResponse companyResponse = companyService.registerCompany(companyRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(companyResponse);
    }
    
}
