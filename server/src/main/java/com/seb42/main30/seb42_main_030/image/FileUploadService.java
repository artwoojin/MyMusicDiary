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

//    private final UploadService s3Service;
//
//    //Multipart를 통해 전송된 파일을 업로드하는 메소드
//    public String uploadImage(MultipartFile file) throws IllegalAccessException {
//        String fileName = createFileName(file.getOriginalFilename());
//        ObjectMetadata objectMetadata = new ObjectMetadata();
//        objectMetadata.setContentLength(file.getSize());
//        objectMetadata.setContentType(file.getContentType());
//        try (InputStream inputStream = file.getInputStream()) {
//            s3Service.uploadFile(inputStream, objectMetadata, fileName);
//        } catch(IOException e) {
//            throw new IllegalAccessException(String.format("파일 변환 중에러가 발생하였습니다.(%s)", file.getOriginalFilename()));
//        }
//        return s3Service.getFileUrl(fileName);
//    }
//
//    //기존 확장자명을 유지한 채, 유니크한 파일의 이름을 생성하는 로직
//    private String createFileName(String originalFileName) throws IllegalAccessException {
//        return UUID.randomUUID().toString().concat(getFileExtension(originalFileName));
//    }
//
//    //파일의 확장자명을 가져오는 로직
//    private String getFileExtension(String fileName) throws IllegalAccessException {
//        try {
//            return fileName.substring(fileName.lastIndexOf("."));
//        } catch (StringIndexOutOfBoundsException e) {
//            throw new IllegalAccessException(String.format("잘못된 형식의 파일($s) 입니다", fileName));
//        }
//    }



    private final UploadService s3Service;
    private final UserRepository userRepository;

    //Multipart를 통해 전송된 파일을 업로드하는 메소드
    public void uploadImage(MultipartFile file, Long userId) throws IOException {
        String fileName = createFileName(file.getOriginalFilename());
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());
        try (InputStream inputStream = file.getInputStream()) {
            s3Service.uploadFile(inputStream, objectMetadata, fileName);
        }

        // 유저 정보 업데이트
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
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
}


//import com.amazonaws.services.s3.model.ObjectMetadata;
//import com.seb42.main30.seb42_main_030.user.entity.User;
//import com.seb42.main30.seb42_main_030.user.repository.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.UUID;
//
//@RequiredArgsConstructor
//@Service
//public class FileUploadService {
//
//    private final UploadService s3Service;
//    private final UserRepository userRepository;
//
//    //Multipart를 통해 전송된 파일을 업로드하는 메소드
//    public void uploadImage(MultipartFile file, Long userId) throws IOException {
//        String fileName = createFileName(file.getOriginalFilename());
//        ObjectMetadata objectMetadata = new ObjectMetadata();
//        objectMetadata.setContentLength(file.getSize());
//        objectMetadata.setContentType(file.getContentType());
//
//        // 이미지 업로드
//        try (InputStream inputStream = file.getInputStream()) {
//            s3Service.uploadFile(inputStream, objectMetadata, fileName);
//        }
//
//        // 기존 이미지 삭제
//        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
//        String prevImageUrl = user.getImageUrl();
//        if (prevImageUrl != null) {
//            String prevFileName = prevImageUrl.substring(prevImageUrl.lastIndexOf("/") + 1);
//            s3Service.deleteFile(prevFileName);
//        }
//
//        // 유저 정보 업데이트
//        user.setImageUrl(s3Service.getFileUrl(fileName));
//        userRepository.save(user);
//    }
//
//    // 유저의 이미지를 삭제하는 메소드
//    public void deleteImage(Long userId) {
//        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
//        String imageUrl = user.getImageUrl();
//        if (imageUrl != null) {
//            String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
//            s3Service.deleteFile(fileName);
//            user.setImageUrl(null);
//            userRepository.save(user);
//        }
//    }
//
//    // 기존 확장자명을 유지한 채, 유니크한 파일의 이름을 생성하는 로직
//    private String createFileName(String originalFileName) {
//        return UUID.randomUUID().toString().concat(getFileExtension(originalFileName));
//    }
//
//    // 파일의 확장자명을 가져오는 로직
//    private String getFileExtension(String fileName) {
//        try {
//            return fileName.substring(fileName.lastIndexOf("."));
//        } catch (StringIndexOutOfBoundsException e) {
//            throw new IllegalArgumentException(String.format("Invalid file format: %s", fileName));
//        }
//    }
//}