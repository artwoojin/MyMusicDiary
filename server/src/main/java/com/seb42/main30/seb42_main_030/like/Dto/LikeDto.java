package com.seb42.main30.seb42_main_030.like.Dto;

import lombok.*;

public class LikeDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class Response {

        private long likeId;
        private long diaryId;
        private long userId;

    }
}
