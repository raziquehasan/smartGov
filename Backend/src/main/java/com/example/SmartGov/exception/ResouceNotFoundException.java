package com.example.SmartGov.exception;

public class ResouceNotFoundException extends  RuntimeException{

    public ResouceNotFoundException(String s){
        super("Resource not found ");
    }
}
