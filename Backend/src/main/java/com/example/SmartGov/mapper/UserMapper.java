package com.example.SmartGov.mapper;

import com.example.SmartGov.dto.UserDto;
import com.example.SmartGov.entity.User;
import com.example.SmartGov.enums.ROLES;

public class UserMapper {

    public static UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setMobileNumber(user.getMobileNumber());
        userDto.setState(user.getState());
        userDto.setRole(user.getRole());

        return userDto;
    }

    public static User toUser(UserDto userDto) {
        if (userDto == null) {
            return null;
        }

        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setMobileNumber(userDto.getMobileNumber());
        user.setState(userDto.getState());

        // Set role, default to CITIZEN if not provided
        if (userDto.getRole() != null) {
            user.setRole(userDto.getRole());
        } else {
            user.setRole(ROLES.CITIZENS);
        }

        return user;
    }
}