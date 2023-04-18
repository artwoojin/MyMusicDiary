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
    private final DiaryRepository diaryRepository;
    private final Diary diary;
    private final UserRepository userRepository;

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
        findDiary.setLikeCount(findDiary.getLikeCount() + 1);

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
        findDiary.setLikeCount(findDiary.getLikeCount() - 1);

        likeRepository.delete(like);
    }

    public Like findVerifyCanLike(long userId, Diary diary) {
        Optional<Like> findLike = likeRepository.findLikeByUserIdAndDiary(userId, diary);

        return findLike.orElseThrow(() -> new BusinessException(ExceptionCode.LIKE_NOT_FOUND));
    }

//    public boolean hasUserLikedDiary(Long userId, Diary diary) {
//        return likeRepository.existsByUserIdAndDiary(userId, diary);
//    }

    public List<User> getLikedUserByLikeDiaries(long userId) {
    List<Like> likedUsers = likeRepository.findAllByUserId(userId);

    List<User> users = likedUsers.stream()
            .map(like -> {
                return like.getUser();
            }).collect(Collectors.toList());

        return users;
    }


//    public Boolean getDiaryLike(Long userId, Diary diary) {
//        Like like = likeRepository.findLikeByUserIdAndDiary(userId, diary)
//                .orElse(null);
//        boolean status = false;
//
//        if (like != null) {
//            status = true;
//        }
//        return status;
//    }

    public Like findLike(Long userId, Diary diary){
        return likeRepository.findLikeByUserIdAndDiary(userId, diary).orElse(null);
    }
}
