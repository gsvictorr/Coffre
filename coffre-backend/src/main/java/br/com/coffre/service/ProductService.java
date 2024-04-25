package br.com.coffre.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.coffre.dto.product.ProductAlterRequest;
import br.com.coffre.dto.product.ProductRequest;
import br.com.coffre.dto.product.ProductResponse;
import br.com.coffre.exception.company.CompanyException;
import br.com.coffre.exception.product.ProductException;
import br.com.coffre.model.Company;
import br.com.coffre.model.Product;
import br.com.coffre.repository.CompanyRepository;
import br.com.coffre.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private NotificationService notificationService;

    public List<ProductResponse> listAllProducts(String token) {

        Long companyId = tokenService.getCompanyIdFromToken(token);

        if (companyId == null) {
            throw new CompanyException("O ID da empresa não pode ser nulo.");
        }

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanyException("Empresa não encontrada para o ID fornecido."));

        List<ProductResponse> products = productRepository.findAllByCompany(company).stream().map(ProductResponse::new)
                .toList();
        return products;
    }

    public ProductResponse getProduct(Long id, String token){
        Long companyId = tokenService.getCompanyIdFromToken(token);

        if (companyId == null) {
            throw new CompanyException("O ID da empresa não pode ser nulo.");
        }

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanyException("Empresa não encontrada para o ID fornecido."));

        if (productRepository.findByIdAndCompany(id, company) == null) {
                    throw new ProductException("Produto com esse ID não foi localizado.");
        } else{
            Product product = productRepository.findByIdAndCompany(id, company);
            return new ProductResponse(product);
        }

    }

    public ProductResponse saveProduct(ProductRequest productRequest, String token) {

        Long companyId = tokenService.getCompanyIdFromToken(token);

        if (companyId == null) {
            throw new CompanyException("O ID da empresa não pode ser nulo.");
        }

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanyException("Empresa não encontrada para o ID fornecido."));

        try {

            Product newProduct = productRequest.convert(productRequest);
            if (productRepository.findByNameAndCompany(newProduct.getName(), company) != null) {
                throw new ProductException("Produto já cadastrado!");
            } else {
                newProduct.setCompany(company);
                productRepository.save(newProduct);
                ProductResponse productResponse = new ProductResponse(newProduct);
                return productResponse;
            }
        } catch (ProductException e) {
            throw new ProductException(e.getMessage());
        }
    }

    public ProductResponse alterProduct(ProductAlterRequest productAlterRequest, String token) {

        Long companyId = tokenService.getCompanyIdFromToken(token);

        if (companyId == null) {
            throw new CompanyException("O ID da empresa não pode ser nulo.");
        }

        Product alterProduct = productAlterRequest.convert(productAlterRequest);

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanyException("Empresa não encontrada para o ID fornecido."));

        if (productRepository.findByIdAndCompany(alterProduct.getId(), company) == null) {
            throw new ProductException("Produto com esse ID não foi localizado.");
        }

        try {
             if(alterProduct.getAmount() < 4){
                Map<String, Object> emailContent = new HashMap<>();
                emailContent.put("product", alterProduct.getName());
                CompletableFuture.runAsync(() -> {
                notificationService.sendNotification("AVISO: Produto acabando!", "O produto " + alterProduct.getName() + " está acabando.", emailContent, company);
                });
            } 
                alterProduct.setCompany(company);
                productRepository.saveAndFlush(alterProduct);
                ProductResponse productResponse = new ProductResponse(alterProduct);
                return productResponse;

        } catch (ProductException e) {
            throw new ProductException(e.getMessage());
        }
    }

    
    public void deleteProduct(Long id) {

        try {
            if(id == null){
                throw new ProductException("ID do produto não pode ser nulo.");
            } else{
                productRepository.deleteById(id);
            }
            
        } catch (ProductException e) {
            throw new ProductException("Produto com esse ID não foi localizado ou já foi excluido.");
        }

    }
}
