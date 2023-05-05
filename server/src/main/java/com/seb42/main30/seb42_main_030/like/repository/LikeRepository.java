package com.seb42.main30.seb42_main_030.like.repository;

import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.like.entity.Like;
import com.seb42.main30.seb42_main_030.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    List<Like> findAllByUser(User user);

    Optional<Like> findLikeByUserAndDiary(User user, Diary diary);

}
