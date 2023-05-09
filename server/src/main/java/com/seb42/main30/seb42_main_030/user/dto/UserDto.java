package com.seb42.main30.seb42_main_030.user.dto;


import com.seb42.main30.seb42_main_030.diary.dto.DiaryDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.*;
import java.util.List;

public class UserDto {

    @Getter
    @NoArgsConstructor
    public static class Post {

        @NotBlank(message = "닉네임은 공백이 아니어야 합니다.")
        private String nickname;

        @NotBlank(message = "이메일은 공백이 아니어야 합니다.")
        @Email
        private String email;

        @NotBlank(message = "비밀번호는 공백이 아니어야 합니다.")
        @Size(min = 8)
        private String password;

        private String imageUrl;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {

        private long userId;

        @NotBlank(message = "닉네임은 공백이 아니어야 합니다.")
        private String nickname;

        @NotEmpty(message = "비밀번호는 비어있을 수 없습니다.")
        private String password;

        private String imageUrl;

        @NotNull
        @Size(min = 8)
        private String currentPassword;
    }

    @Getter
    @Setter
    public static class Response {

        private long userId;

        private String nickname;
        private String email;
        private String imageUrl;

    }

    @Getter
    @Setter
    public static class MyPage {

        private long userId;

        private String nickname;
        private String email;
        private String imageUrl;

        // 좋아요한 다이어리
        private List<DiaryDto.Response> likeDiaries;
    }
}
