package br.com.coffre.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    

        public ProductResponse saveProduct(ProductRequest productRequest, String token) {

        Long companyId = tokenService.getCompanyIdFromToken(token);

        if (companyId == null) {
            throw new CompanyException("O ID da empresa não pode ser nulo.");
        }

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanyException("Empresa não encontrada para o ID fornecido."));

        try {

            Product newProduct = productRequest.convert(productRequest);
            
            if (productRepository.findByName(newProduct.getName()) != null) {
                throw new ProductException("Produto já cadastrado!");

            } else {
                newProduct.setCompany(company);
                productRepository.save(newProduct);
                ProductResponse productResponse = new ProductResponse(newProduct.getId(), newProduct.getName(), newProduct.getPrice(), newProduct.getAmount(), newProduct.getCompany());
                return productResponse;
            }
        } catch (ProductException e) {
            throw new ProductException(e.getMessage());
        }
    }
}
