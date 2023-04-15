package com.seb42.main30.seb42_main_030.exception;

import lombok.Getter;

public enum ExceptionCode {

    COMMENT_NOT_FOUND(1, "댓글을 찾지 못하였습니다"),
    COMMENT_EXIST(2,"댓글이 존재합니다"),
    NOT_AUTHORITY(3, "권한이 없습니다."),
    DIARY_NOT_FOUND(4, "해당 글을 찾지 못했습니다."),
    USER_NOT_FOUND(5, "해당 유저를 찾지 못했습니다."),
    USER_EXISTS(6, "헤당 유저가 존재합니다."),
    NOT_FOUND(7, "찾지 못했습니다."),
    LIKE_NOT_FOUND(8, "좋아요를 찿지 못했습니다."),
    LIKE_ALREADY_EXISTS(9,"좋아요는 한 번만 누를 수 있습니다.");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }

}
