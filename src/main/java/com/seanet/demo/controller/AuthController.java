package com.seanet.demo.controller;

import com.seanet.demo.domain.UserVO;
import com.seanet.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * 사용자 인증 정보를 처리하는 REST API Controller
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    /**
     * 현재 로그인한 사용자 상세 정보 조회
     * Spring Security의 SecurityContext에서 현재 인증된 사용자 정보를 가져와
     * 데이터베이스에서 추가 정보(닉네임 등)를 조회하여 반환
     *
     * @return ResponseEntity<Map<String, Object>> 사용자 인증 정보 및 상세 정보
     */
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUserInfo() {
        // 1. SecurityContext에서 현재 로그인한 사용자 ID 조회
        String currentUserId = getCurrentUserId();
        Map<String, Object> response = new HashMap<>();
        response.put("isAuthenticated", currentUserId != null);

        // 2. 로그인한 사용자인 경우 추가 정보 조회
        if (currentUserId != null) {
            response.put("userId", currentUserId);
            // 3. 데이터베이스에서 사용자 상세 정보 조회
            UserVO user = userService.findByUserId(currentUserId);
            response.put("nickname", user.getNickname());
        }
        return ResponseEntity.ok(response); // HTTP 200 OK
    }

    /**
     * 현재 사용자의 로그인 상태 확인
     * 상세 정보 없이 인증 여부만 빠르게 체크할 때 사용
     *
     * @return ResponseEntity<Map<String, Boolean>> 로그인 상태 (true/false)
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Boolean>> getAuthStatus() {
        boolean isAuthenticated = getCurrentUserId() != null;

        Map<String, Boolean> response = new HashMap<>();
        response.put("isAuthenticated", isAuthenticated);

        return ResponseEntity.ok(response); // HTTP 200 OK
    }

    /**
     * Spring Security의 SecurityContext에서 현재 로그인한 사용자의 ID 조회
     *
     * @return String 로그인한 사용자 ID (비로그인 시 null)
     */
    private String getCurrentUserId() {
        // 1. SecurityContext에서 Authentication 객체 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 2. 인증 정보 유효성 검증
        if (authentication == null || !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {
            return null;
        }

        // 3. 인증된 사용자의 username(userId) 반환
        return authentication.getName();
    }
}
