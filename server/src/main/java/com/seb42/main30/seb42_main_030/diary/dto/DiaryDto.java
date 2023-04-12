package com.seb42.main30.seb42_main_030.diary.dto;


import com.seb42.main30.seb42_main_030.comment.dto.CommentDto;
import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistDto;
import com.seb42.main30.seb42_main_030.playlist.dto.PlaylistResponseDto;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class DiaryDto {

    @Getter
    @Setter
    public static class Post{

        @NotBlank(message = "제목을 입력하세요")
        private String title;

        @NotBlank(message = "내용을 입력하세요")
        private String body;

        private List<PlaylistDto> playlists;

        private int likeCount;

    }

    @Getter
    @Setter
    public static class Patch {

        @NotBlank(message = "제목을 입력하세요")
        private String title;

        @NotBlank(message = "내용을 입력하세요")
        private String body;

        private List<PlaylistDto> playlists;

        private int likeCount;

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
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

//        user 데이터 가져오는 것
        private String userNickname;


        private List<CommentDto.Response> comments;
//        private List<PlaylistDto.Response> playlists;
        private List<PlaylistResponseDto> playlists;

    }
}
