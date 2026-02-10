package com.example.SmartGov.exception;

import com.example.SmartGov.payload.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResouceNotFoundException.class)
    public ResponseEntity<ApiResponse> handlerResourceNotFoundException(ResouceNotFoundException  exception){
        String message = exception.getMessage();
        ApiResponse response = ApiResponse.builder().message(message).success(false).status(HttpStatus.NOT_FOUND).build();
            return new ResponseEntity<ApiResponse>(response , HttpStatus.NOT_FOUND);
    }
}
