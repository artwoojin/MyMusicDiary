package com.seb42.main30.seb42_main_030.user.controller;

import com.seb42.main30.seb42_main_030.diary.dto.DiaryDto;
import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.diary.mapper.DiaryMapper;
import com.seb42.main30.seb42_main_030.image.FileUploadService;
import com.seb42.main30.seb42_main_030.like.service.LikeService;
import com.seb42.main30.seb42_main_030.response.SingleResponseDto;
import com.seb42.main30.seb42_main_030.user.dto.ChangePasswordRequest;
import com.seb42.main30.seb42_main_030.user.dto.UserDto;
import com.seb42.main30.seb42_main_030.user.entity.User;
import com.seb42.main30.seb42_main_030.user.mapper.UserMapper;
import com.seb42.main30.seb42_main_030.user.mapper.UserMapperImpl;
import com.seb42.main30.seb42_main_030.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/users")
@Validated
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;
    private final LikeService likeService;
    private final DiaryMapper diaryMapper;
    private final FileUploadService fileUploadService;


    // (1) user 등록(자체 회원 가입)
    @PostMapping("/sign-up")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post requestBody) {

        User user = userMapper.userPostToUser(requestBody);
        User createUser = userService.createUser(user);

        return new ResponseEntity<>(
                new SingleResponseDto<>(userMapper.userToUserResponse(createUser)), HttpStatus.CREATED);
    }


    // (2) user 정보 조회
    @GetMapping("/{user-id}")
    @Transactional
    public ResponseEntity getUser(@PathVariable("user-id") @Positive long userId) {
        User findUser = userService.findVerifiedUser(userId);

        UserDto.MyPage myPage = userMapper.userToMyPage(findUser);

        // 유저가 좋아요한 다이어리 리스트
        List<Diary> likeDiaryList = likeService.getLikeDiariesByUserId(findUser.getUserId());
        List<DiaryDto.Response> myLike = diaryMapper.diariesToDtos(likeDiaryList);
        myPage.setLikeDiaries(myLike);

        return new ResponseEntity(myPage, HttpStatus.OK);
    }


    // (3-1) user 정보 수정(닉네임)
    @PatchMapping("/{user-id}")
    public ResponseEntity patchUser(@PathVariable("user-id") @Positive long userId,
                                    @Valid @RequestBody UserDto.Patch patch,
                                    Principal principal) throws Exception {

        // 요청한 사용자와 수정하려는 사용자가 동일한지 확인
        if (!principal.getName().equals(String.valueOf(userId))) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        patch.setUserId(userId);

        User updateUser = userService.updateUser(userMapper.userPatchToUser(patch));

        return new ResponseEntity<>(
                new SingleResponseDto<>(userMapper.userToUserResponse(updateUser)), HttpStatus.OK);
    }

    // (3-2) user 정보 수정(비밀번호)
    @PostMapping("/{user-id}/change-password")
    public ResponseEntity changePassword(@PathVariable("user-id") @Positive long userId,
                                         @Valid @RequestBody ChangePasswordRequest request,
                                         Principal principal) {

        // 요청한 사용자와 수정하려는 사용자가 동일한지 확인
        if (!principal.getName().equals(String.valueOf(userId))) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        userService.changePassword(userId, request.getCurrentPassword(), request.getNewPassword());

        return new ResponseEntity<>(HttpStatus.OK);
    }



    // (4) user 탈퇴
    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteUser(@PathVariable("user-id") @Positive long userId) {

        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



//s3 이미지
    @PostMapping("/{userId}/image")
    public ResponseEntity<?> uploadImage(@PathVariable Long userId, @RequestParam("file") MultipartFile file) throws IOException {
        fileUploadService.uploadImage(file, userId);
        return ResponseEntity.ok().build();
    }



    @DeleteMapping("/{userId}/image")
    public ResponseEntity<?> deleteImage(@PathVariable Long userId) {
        userService.deleteUserImage(userId);
        return ResponseEntity.ok().build();
    }
}