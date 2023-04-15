package com.seb42.main30.seb42_main_030.like.controller;

import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.diary.service.DiaryService;
import com.seb42.main30.seb42_main_030.like.service.LikeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/likes")
public class LikeController {
    private final LikeService likeService;
    private final DiaryService diaryService;

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
}
