package br.com.coffre.exception.product;

public class ProductException extends RuntimeException{
    public ProductException(String error){
        super(error);
    }
}
