package com.seb42.main30.seb42_main_030.image;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.seb42.main30.seb42_main_030.user.entity.User;
import com.seb42.main30.seb42_main_030.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class FileUploadService {

    private final UploadService s3Service;
    private final UserRepository userRepository;

    // Multipart를 통해 전송된 파일을 업로드하는 메소드
    public void uploadImage(MultipartFile file, Long userId) throws IOException {
        // 기존 이미지 삭제
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        String oldFileName = getFileNameFromUrl(user.getImageUrl());
        if (oldFileName != null) {
            s3Service.deleteFile(oldFileName);
        }

        // 새 이미지 업로드
        String fileName = createFileName(file.getOriginalFilename());
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());
        try (InputStream inputStream = file.getInputStream()) {
            s3Service.uploadFile(inputStream, objectMetadata, fileName);
        }

        // 유저 정보 업데이트
        user.setImageUrl(s3Service.getFileUrl(fileName));
        userRepository.save(user);
    }

    // 기존 확장자명을 유지한 채, 유니크한 파일의 이름을 생성하는 로직
    private String createFileName(String originalFileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(originalFileName));
    }

    // 파일의 확장자명을 가져오는 로직
    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new IllegalArgumentException(String.format("Invalid file format: %s", fileName));
        }
    }

    // URL에서 파일명 추출
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