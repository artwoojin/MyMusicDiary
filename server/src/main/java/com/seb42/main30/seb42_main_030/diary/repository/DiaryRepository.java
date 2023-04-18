package com.seb42.main30.seb42_main_030.diary.repository;


import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.like.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {

    //    @Query("SELECT d FROM Diary d ORDER BY d.likeCount DESC") // 좋아요 순으로 게시물 조회
//    List<Diary> findAllOrderByLikeCountDesc();
//
//    @Modifying
//    @Query("UPDATE Diary d SET d.rank = :rank WHERE d.id = :id") // 해당 게시물의 rank 필드 업데이트
//    void setRank(@Param("id") Long id, @Param("rank") int rank);
    List<Like> findAllByDiaryId(long diaryId);

}
