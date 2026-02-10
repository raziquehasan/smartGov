package com.example.SmartGov.controller;

import com.example.SmartGov.dto.UserDto;
import com.example.SmartGov.service.UserService;
import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/smartGov")
@AllArgsConstructor

public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/createUser")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
    UserDto createUser = userService.createUser(userDto);
    return new ResponseEntity<>(createUser ,HttpStatus.CREATED);
    }

    @GetMapping("/getAllUser")
    public ResponseEntity<List<UserDto>> getAllUser(){
        List<UserDto> user = userService.getAllUser();
       return ResponseEntity.ok(user);
    }

    @GetMapping("/getUserBy/{id}")
    public UserDto getUserById(@PathVariable Long id){
        return userService.getUserById(id);
    }

    @PutMapping("/updateAccount/{id}")
    public UserDto updateUser(@PathVariable Long id , @RequestBody UserDto userDto){
        return userService.updateUser(id, userDto);
    }
}
