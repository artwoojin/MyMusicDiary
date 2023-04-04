package com.seb42.main30.seb42_main_030.image;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
public class FileuploadController {
    private final FileUploadService fileUploadService;

    @PostMapping("/api/v1/upload")
    public  String uploadImage(@RequestPart MultipartFile file) throws IllegalAccessException {
        return fileUploadService.uploadImage(file);
    }
}