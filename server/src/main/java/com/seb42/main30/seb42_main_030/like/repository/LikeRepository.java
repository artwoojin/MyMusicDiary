package com.seb42.main30.seb42_main_030.like.repository;

import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.like.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    List<Like> findAllByUserId(long userId);

    Optional<Like> findLikeByUserIdAndDiary(long userId, Diary diary);

//    List<Like> existsByUserIdAndDiaryId(Long userId, Long diaryId);
}
