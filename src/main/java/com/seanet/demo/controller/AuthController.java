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
     */
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUserInfo() {
        String currentUserId = getCurrentUserId();

        Map<String, Object> response = new HashMap<>();
        response.put("isAuthenticated", currentUserId != null);

        // 로그인한 사용자인 경우
        if (currentUserId != null) {
            response.put("userId", currentUserId);
            UserVO user = userService.findByUserId(currentUserId);
            response.put("nickname", user.getNickname());
        }
        return ResponseEntity.ok(response); // HTTP 200 OK
    }

    /**
     * 현재 사용자의 로그인 상태 확인
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Boolean>> getAuthStatus() {
        boolean isAuthenticated = getCurrentUserId() != null;

        Map<String, Boolean> response = new HashMap<>();
        response.put("isAuthenticated", isAuthenticated);

        return ResponseEntity.ok(response); // HTTP 200 OK
    }

    /**
     * Spring Security의 SecurityContext에서
     * 현재 로그인한 사용자의 ID 조회
     */
    private String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증 정보가 없거나, 인증되지 않았거나, 익명 사용자인 경우 null 반환
        if (authentication == null || !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {
            return null;
        }

        return authentication.getName();
    }
}
