package com.seb42.main30.seb42_main_030.like.controller;

import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.diary.service.DiaryService;
import com.seb42.main30.seb42_main_030.like.service.LikeService;
import com.seb42.main30.seb42_main_030.user.entity.User;
import com.seb42.main30.seb42_main_030.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/likes")
@Validated
public class LikeController {
    private final LikeService likeService;
    private final DiaryService diaryService;
    private final UserService userService;

    @PostMapping("/{diaryId}")
    public ResponseEntity plusLike(@PathVariable(name = "diaryId") long diaryId) {
        User user = userService.getLoginUser();
        likeService.updateLike(user.getUserId(), diaryId);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{diaryId}")
    public ResponseEntity deleteLike(@PathVariable(name = "diaryId") long diaryId) {

        User user = userService.getLoginUser();

        Diary diary = diaryService.existDiary(diaryId);
        likeService.findVerifyCanLike(user, diary);
        likeService.deleteLike(user.getUserId(), diaryId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
