package br.com.coffre.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.coffre.dto.product.ProductAlterRequest;
import br.com.coffre.dto.product.ProductList;
import br.com.coffre.dto.product.ProductRequest;
import br.com.coffre.dto.product.ProductResponse;
import br.com.coffre.service.ProductService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping
    public ResponseEntity<ProductList> getAllProducts(@RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        String jwtToken = token.substring(7);
        List<ProductResponse> products = productService.listAllProducts(jwtToken);
        ProductList productList = new ProductList(products);
        return ResponseEntity.status(HttpStatus.OK).body(productList);
    }

    @PostMapping
    public ResponseEntity<ProductResponse> saveProduct(@RequestBody @Valid ProductRequest productRequest, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String jwtToken = token.substring(7);
        ProductResponse productResponse = productService.saveProduct(productRequest, jwtToken);
        return ResponseEntity.status(HttpStatus.CREATED).body(productResponse);
    }

    @PutMapping
    public ResponseEntity<ProductResponse> alterProduct(@RequestBody @Valid ProductAlterRequest productAlterRequest, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String jwtToken = token.substring(7);
        ProductResponse productResponse = productService.alterProduct(productAlterRequest, jwtToken);
        return ResponseEntity.status(HttpStatus.OK).body(productResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") Long id){
        productService.deleteProduct(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
