package com.seb42.main30.seb42_main_030.like.Dto;

import com.seb42.main30.seb42_main_030.diary.dto.DiaryDto;
import com.seb42.main30.seb42_main_030.user.entity.User;
import lombok.*;

import java.util.List;

public class LikeDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class Response {

        private long likeId;
        private long diaryId;
        private long userId;

        private List<DiaryDto.likedUsers> LikedUsers;

        public void setLikedUsers(List<User> likedUserList) {
        }
    }
}
