package com.seanet.demo.controller;

import com.seanet.demo.domain.UserVO;
import com.seanet.demo.service.AuthService;
import com.seanet.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 사용자 관련 REST API Controller
 */
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserRestController {

    private final UserService userService;
    private final AuthService authService;

    // 아이디 중복확인
    @PostMapping("/check-userid")
    public ResponseEntity<Boolean> checkUserId(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        boolean exists = userService.isUserIdExists(userId);
        return ResponseEntity.ok(exists);   // HTTP 200 OK
    }

    // 닉네임 중복확인
    @PostMapping("/check-nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestBody Map<String, String> request) {
        String nickname = request.get("nickname");
        boolean exists = userService.isNicknameExists(nickname);
        return ResponseEntity.ok(exists);   // HTTP 200 OK
    }

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserVO userVO) {
        try {
            // 1. AuthService에서 비밀번호 암호화
            String encodedPassword = authService.encodePassword(userVO.getUserPwd());
            userVO.setUserPwd(encodedPassword);

            // 2. UserService에서 사용자 저장
            boolean success = userService.registerUser(userVO);

            if (success) {
                return ResponseEntity.ok().build(); // HTTP 200 OK
            } else {
                return ResponseEntity.badRequest().build(); // HTTP 400 Bad Request
            }
        } catch (Exception e) {
            // 서버 오류 (DB 연결 실패, 암호화 오류 등)
            return ResponseEntity.internalServerError().build(); // HTTP 500 Internal Server Error
        }
    }
}