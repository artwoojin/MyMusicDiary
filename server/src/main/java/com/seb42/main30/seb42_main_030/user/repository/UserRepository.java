package com.seb42.main30.seb42_main_030.user.repository;

import com.seb42.main30.seb42_main_030.diary.entity.Diary;
import com.seb42.main30.seb42_main_030.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);

    User findUserByEmail(String email);
    User findUserByUserId(long userId);
    List<Diary> findAllByUserId(long userId);
}
