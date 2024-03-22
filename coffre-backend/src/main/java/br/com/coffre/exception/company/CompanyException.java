package br.com.coffre.exception.company;

public class CompanyException extends RuntimeException{
    public CompanyException(String error){
        super(error);
    }
}
