package com.seb42.main30.seb42_main_030.tag.dto;

import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class TagDto {

    String tagName;

    @Getter
    @Builder
    public static class Response {
        private Long tagId;
        private String tagName;
    }
}
