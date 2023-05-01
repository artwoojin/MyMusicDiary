package com.seb42.main30.seb42_main_030.like.service;

import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.diary.repository.DiaryRepository;
import com.seb42.main30.seb42_main_030.diary.service.DiaryService;
import com.seb42.main30.seb42_main_030.exception.BusinessException;
import com.seb42.main30.seb42_main_030.exception.ExceptionCode;
import com.seb42.main30.seb42_main_030.like.entity.Like;
import com.seb42.main30.seb42_main_030.like.repository.LikeRepository;
import com.seb42.main30.seb42_main_030.user.entity.User;
import com.seb42.main30.seb42_main_030.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final DiaryService diaryService;
    private final UserRepository userRepository;

    public List<Diary> getLikeDiariesByUserId(long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BusinessException(ExceptionCode.USER_NOT_FOUND));
        List<Like> likeDiaries = likeRepository.findAllByUser(user);

        return likeDiaries.stream()
                .map(Like::getDiary)
                .collect(Collectors.toList());
    }

    public void updateLike(long userId, long diaryId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BusinessException(ExceptionCode.USER_NOT_FOUND));
        Diary findDiary = diaryService.existDiary(diaryId);
        verifyCanLike(user, findDiary);

        Like like = new Like(findDiary, user);
        findDiary.setLikeCount(findDiary.getLikeCount() + 1);

        likeRepository.save(like);
    }

    public void verifyCanLike(User user, Diary diary) {
        Optional<Like> findLike =
                likeRepository.findLikeByUserAndDiary(user, diary);

        if (findLike.isPresent()) {
            throw new BusinessException(ExceptionCode.LIKE_ALREADY_EXISTS);
        }
    }

    public void deleteLike(long userId, long diaryId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new BusinessException(ExceptionCode.USER_NOT_FOUND));
        Diary findDiary = diaryService.existDiary(diaryId);
        Like like = findVerifyCanLike(user, findDiary);
        findDiary.setLikeCount(findDiary.getLikeCount() - 1);

        likeRepository.delete(like);
    }

    public Like findVerifyCanLike(User user, Diary diary) {

        return likeRepository.findLikeByUserAndDiary(user, diary)
                .orElseThrow(() -> new BusinessException(ExceptionCode.LIKE_NOT_FOUND));
    }

}
