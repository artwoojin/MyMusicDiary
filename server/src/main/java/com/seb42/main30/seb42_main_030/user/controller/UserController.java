package com.seb42.main30.seb42_main_030.user.controller;

import com.seb42.main30.seb42_main_030.diary.dto.DiaryDto;
import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.diary.mapper.DiaryMapper;
import com.seb42.main30.seb42_main_030.image.FileUploadService;
import com.seb42.main30.seb42_main_030.like.service.LikeService;
import com.seb42.main30.seb42_main_030.response.SingleResponseDto;
import com.seb42.main30.seb42_main_030.user.dto.UserDto;
import com.seb42.main30.seb42_main_030.user.entity.User;
import com.seb42.main30.seb42_main_030.user.mapper.UserMapperImpl;
import com.seb42.main30.seb42_main_030.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/users")
@Validated
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapperImpl userMapper;
    private final LikeService likeService;
    private final DiaryMapper diaryMapper;

    private final FileUploadService fileUploadService;

    // UserMapper DI
//    public UserController(UserService userService, Usermapper usermapper) {
//        this.userService = userService;
//        this.mapper = mapper;
//    }

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

//        return new ResponseEntity<>(
//                new SingleResponseDto<>(userMapper.userToUserResponse(user)), HttpStatus.OK);
        return new ResponseEntity(myPage, HttpStatus.OK);
    }


    // (3) user 정보 수정
    @PatchMapping("/{user-id}")
    public ResponseEntity patchUser(@PathVariable("user-id") @Positive long userId,
                                    @Valid @RequestBody UserDto.Patch patch) throws Exception {

        patch.setUserId(userId);

        User updateUser = userService.updateUser(userMapper.userPatchToUser(patch));

        return new ResponseEntity<>(
                new SingleResponseDto<>(userMapper.userToUserResponse(updateUser)), HttpStatus.OK);
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
}