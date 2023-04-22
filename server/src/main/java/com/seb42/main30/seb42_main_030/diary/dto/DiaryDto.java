package com.seb42.main30.seb42_main_030.diary.dto;


import com.seb42.main30.seb42_main_030.comment.dto.CommentDto;
import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistDto;
import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistResponseDto;
import com.seb42.main30.seb42_main_030.tag.dto.TagDto;
import com.seb42.main30.seb42_main_030.user.dto.UserDto;
import lombok.*;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public class DiaryDto {

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post{

        @NotBlank(message = "제목을 입력하세요")
        private String title;

        @NotBlank(message = "내용을 입력하세요")
        private String body;

        private List<PlaylistDto> playlists;

        private int likeCount;
        //private boolean likeCheck;
        private List<Long> tags;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {

        @NotBlank(message = "제목을 입력하세요")
        private String title;

        @NotBlank(message = "내용을 입력하세요")
        private String body;

        private List<PlaylistDto> playlists;

        private int likeCount;
        //private boolean likeCheck;
        private List<Long> tags;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class Response {

        private long diaryId;
        private String title;
        private String body;
        private int viewCount;
        private int likeCount;
        //private boolean likeCheck;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

//        user 데이터 가져오는 것
        private String userNickname;

        private List<CommentDto.Response> comments;
//        private List<PlaylistDto.Response> playlists;
        private List<PlaylistResponseDto> playlists;
        private List<TagDto.Response> tags;
        public void setLikedUsers(List<UserDto.Response> likedUsers) {
        }
    }


    @Getter
    @Setter
    public static class ResponseCheck{
        private long Id;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Short {
        private long diaryId;
        private String title;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class likedUsers {
        private long diaryId;
        private long userId;
    }
}
