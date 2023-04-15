package com.seb42.main30.seb42_main_030.like.service;

import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.diary.service.DiaryService;
import com.seb42.main30.seb42_main_030.exception.BusinessException;
import com.seb42.main30.seb42_main_030.exception.ExceptionCode;
import com.seb42.main30.seb42_main_030.like.entity.Like;
import com.seb42.main30.seb42_main_030.like.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final DiaryService diaryService;

    public List<Diary> getLikeDiariesByUserId(long userId) {
        List<Like> likeDiaries = likeRepository.findAllByUserId(userId);

        List<Diary> diaries = likeDiaries.stream()
                .map(like -> {
                    return like.getDiary();
                }).collect(Collectors.toList());

        return diaries;
    }

    public void updateLike(long userId, long diaryId) {
        Diary findDiary = diaryService.existDiary(diaryId);
        verifyCanLike(userId, findDiary);

        Like like = new Like(findDiary, userId);
        likeRepository.save(like);
    }

    public void verifyCanLike(long userId, Diary diary) {
        Optional<Like> findLike =
                likeRepository.findLikeByUserIdAndDiary(userId, diary);

        if (findLike.isPresent()) {
            throw new BusinessException(ExceptionCode.LIKE_ALREADY_EXISTS);
        }
    }

    public void deleteLike(long userId, long diaryId) {
        Diary findDiary = diaryService.existDiary(diaryId);
        Like like = findVerifyCanLike(userId, findDiary);
        likeRepository.delete(like);
    }

    public Like findVerifyCanLike(long userId, Diary diary) {
        Optional<Like> findLike = likeRepository.findLikeByUserIdAndDiary(userId, diary);

        return findLike.orElseThrow(() -> new BusinessException(ExceptionCode.LIKE_NOT_FOUND));
    }

}
