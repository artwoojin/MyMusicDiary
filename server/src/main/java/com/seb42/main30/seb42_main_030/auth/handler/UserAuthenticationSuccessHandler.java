package com.seb42.main30.seb42_main_030.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seb42.main30.seb42_main_030.user.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class UserAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        // 인증 성공 후, 로그를 기록하거나 사용자 정보를 response로 전송하는 등의 추가 작업(여기에)

//        String userId = authentication.getName();
//
//        System.out.println("User " + userId + " successfully authenticated");
//        try(PrintWriter writer = response.getWriter()){
//            JsonObject json = new JsonObject();
//            json.addProperty("userId", userId);
//
//            response.setStatus(HttpStatus.ACCEPTED.value());
//            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//            response.setCharacterEncoding(StandardCharsets.UTF_8.toString());
//
//            writer.write(json.toString());
//        }


        User user = (User) authentication.getPrincipal();

        response.setCharacterEncoding("UTF-8");

        Map<String, Object> loginResponse = new HashMap<>();
        loginResponse.put("userId", user.getUserId());
        loginResponse.put("email", user.getEmail());
        loginResponse.put("nickname", user.getNickname());
        loginResponse.put("ImageUrl", user.getImageUrl());

        ObjectMapper objectMapper = new ObjectMapper();
        String responseBody = objectMapper.writeValueAsString(loginResponse);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        response.getWriter().write(responseBody);

        log.info("# Authenticated successfully!");

//        sendLoginResponse(response);

        //log.info("nickname:{}, email: {}, imageUrl: {}", user.getNickname(), user.getEmail(), user.getImageUrl());


//    private void sendLoginResponse(HttpServletResponse response) throws IOException {
//        Gson gson = new Gson();
//        LoginResponse loginResponse = LoginResponse.of(HttpStatus.ACCEPTED);
//        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//        response.setStatus(HttpStatus.ACCEPTED.value());
//        response.getWriter().write(gson.toJson(loginResponse, LoginResponse.class));

    }
}
