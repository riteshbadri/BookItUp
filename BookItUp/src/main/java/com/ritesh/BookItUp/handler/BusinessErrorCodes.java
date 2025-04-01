package com.ritesh.BookItUp.handler;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum BusinessErrorCodes {

    NO_CODE(0, HttpStatus.NOT_IMPLEMENTED, "No code"),

    INCORRECT_CURRENT_PASSWORD(300, HttpStatus.BAD_REQUEST, "Current Password is Incorrect"),

    NEW_PASSWORD_DOES_NOT_MATCH(301, HttpStatus.BAD_REQUEST, "The new password does not match"),

    ACCOUNT_DISABLED(303, HttpStatus.FORBIDDEN, "User account is disabled"),

    ACCOUNT_LOCKED(302, HttpStatus.FORBIDDEN, "User account is locked"),

    BAD_CREDENTIALS(304, HttpStatus.FORBIDDEN, "Incorrect username or password")
    ;


    private final int code;
    private final String description;
    private final HttpStatus httpStatus;

    BusinessErrorCodes(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.description = description;
        this.httpStatus = httpStatus;
    }
}
