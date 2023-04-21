package com.seb42.main30.seb42_main_030.like.controller;

import com.seb42.main30.seb42_main_030.diary.dto.DiaryDto;
import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.diary.mapper.DiaryMapper;
import com.seb42.main30.seb42_main_030.diary.service.DiaryService;
import com.seb42.main30.seb42_main_030.like.Dto.LikeDto;
import com.seb42.main30.seb42_main_030.like.entity.Like;
import com.seb42.main30.seb42_main_030.like.mapper.LikeMapper;
import com.seb42.main30.seb42_main_030.like.service.LikeService;
import com.seb42.main30.seb42_main_030.user.dto.UserDto;
import com.seb42.main30.seb42_main_030.user.entity.User;
import com.seb42.main30.seb42_main_030.user.mapper.UserMapperImpl;
import com.seb42.main30.seb42_main_030.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/likes")
@Validated
public class LikeController {
    private final LikeService likeService;
    private final DiaryService diaryService;
    private final UserService userService;
    private final UserMapperImpl userMapper;
    private final DiaryMapper diaryMapper;
    private final LikeMapper likeMapper;

    @PostMapping("/{diary-Id}")
    public ResponseEntity plusLike(@PathVariable(name = "diary-Id") long diaryId) {
        long userId = Long.valueOf(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
        likeService.updateLike(userId, diaryId);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{diary-Id}")
    public ResponseEntity deleteLike(@PathVariable(name = "diary-Id") long diaryId) {

        // 토큰에 담긴 userId
        long userId = Long.valueOf(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));

        Diary diary = diaryService.existDiary(diaryId);
        likeService.findVerifyCanLike(userId, diary);
        likeService.deleteLike(userId, diaryId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{diary-Id}")
    @Transactional
    public ResponseEntity checkLike(@PathVariable(name = "diary-Id") Diary diary) {

        long userId = Long.valueOf(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));

        Like findLike = likeService.findVerifyCanLike(userId, diary);

//        DiaryDto.Response response = diaryMapper.diaryToResponse(findDiary);
//
        List<User> likedUserList = likeService.getLikedUserByLikeDiaries(userId);
        //List<UserDto.Response> likedUsers = userMapper.usersToUserResponses(likedUserList);

        LikeDto.Response response = likeMapper.likeToResponse(findLike);
        response.setLikedUsers(likedUserList);

        return new ResponseEntity(response, HttpStatus.OK);
    }


//    @GetMapping("/{diary-Id}")
//    public Boolean getLike(@AuthenticationPrincipal Long userId, Diary diary) {
//        return likeService.getDiaryLike(userId, diary);
//    }

//    @GetMapping("/{diary-id}")
//    @Transactional
//    public ResponseEntity getLike(@PathVariable("diary-id") Diary diaryId) {
//        long userId = Long.valueOf(String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
//
//        return new ResponseEntity<>(new SingleResponseDto<>(likeService.findLike(userId, diaryId)), HttpStatus.OK);
//    }
}
