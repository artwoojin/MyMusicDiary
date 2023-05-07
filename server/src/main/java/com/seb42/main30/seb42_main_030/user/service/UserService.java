package com.seb42.main30.seb42_main_030.user.service;

import com.seb42.main30.seb42_main_030.auth.utils.CustomAuthorityUtils;
import com.seb42.main30.seb42_main_030.exception.BusinessException;
import com.seb42.main30.seb42_main_030.exception.ExceptionCode;
import com.seb42.main30.seb42_main_030.image.UploadService;
import com.seb42.main30.seb42_main_030.user.entity.User;
import com.seb42.main30.seb42_main_030.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Slf4j
@Transactional
@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final UploadService s3Service;

    // (1) user 등록(자체 회원 가입)
    public User createUser(User user) {

        // 이미 등록된 이메일인지 검증
        verifyExistsEmail(user.getEmail());

        // 비밀번호 암호화
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        // 회원가입시 기본 role = user 로 설정
        List<String> roles = new ArrayList<>();
        roles.add("USER");
        user.setRoles(roles);

        // 회원정보 저장
        return userRepository.save(user);
    }

    // (2) user 정보 수정
    public User updateUser(User user, String currentPassword) throws Exception{

        // 유저가 존재한다면 해당 유저의 아이디를 가져옴
        User findUser = findVerifiedUser(user.getUserId());

        // 비밀번호 수정 요청이 있을 경우
        if (user.getPassword() != null) {
            // 현재 비밀번호 검증
            if (!passwordEncoder.matches(currentPassword, findUser.getPassword())) {
                throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
            }
            // 새로운 비밀번호 암호화
            String encryptedPassword = passwordEncoder.encode(user.getPassword());
            findUser.setPassword(encryptedPassword);
        }

        // 회원정보 업데이트
        Optional.ofNullable(user.getNickname())
                .ifPresent(findUser::setNickname);
        Optional.ofNullable(user.getImageUrl())
                .ifPresent(findUser::setImageUrl);

        // 회원정보 수정 저장
        return userRepository.save(findUser);
    }

    // (3) user 정보 조회
    public User findUser(long userId) {
        return findVerifiedUser(userId);
    }

    // (4) 회원 탈퇴
    public void deleteUser(long userId) {
        User findUser = findVerifiedUser(userId);

        userRepository.delete(findUser);

    }

    // (5) 이미 존재하는 유저인지 검증(이메일)
    public User verifyExistsEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if(user.isPresent())
            throw new BusinessException(ExceptionCode.USER_EXISTS);
        return null;
    }

    // (6) 유저 정보 찾기
    public User findVerifiedUser(long userId) {
        return userRepository.findById(userId)
                .orElseThrow(()
                        -> new BusinessException(ExceptionCode.USER_NOT_FOUND));
    }

    // (7) Login 한 User를 가져오는 로직
    public User getLoginUser() {
        return  userRepository.findById(Long.valueOf(GetAuthUserUtils.getAuthUser().getName()))
                .orElseThrow(()
                        -> new BusinessException(ExceptionCode.USER_NOT_FOUND));
    }
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);}

    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }


//    public void deleteUserImage(Long userId) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
//        String preFile = getFileNameFromUrl(user.getImageUrl());
//        if(preFile != null){
//            s3Service.deleteFile(preFile);
//        }
//    }


    public void deleteUserImage(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        if (user.getImageUrl() != null) {
            s3Service.deleteFile(getFileNameFromUrl(user.getImageUrl()));
            user.setImageUrl(null);
            userRepository.save(user);
        }
    }

    public String getFileNameFromUrl(String url) {
        if (url == null) {
            return null;
        }
        int pos = url.lastIndexOf("/");
        if (pos == -1) {
            return null;
        }
        return url.substring(pos + 1);
    }

}
