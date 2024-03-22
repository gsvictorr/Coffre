package br.com.coffre.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.coffre.dto.product.ProductRequest;
import br.com.coffre.dto.product.ProductResponse;
import br.com.coffre.service.ProductService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponse> saveProduct(@RequestBody @Valid ProductRequest productRequest, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String jwtToken = token.substring(7);
        ProductResponse productResponse = productService.saveProduct(productRequest, jwtToken);
        return ResponseEntity.status(HttpStatus.CREATED).body(productResponse);
    }

}
