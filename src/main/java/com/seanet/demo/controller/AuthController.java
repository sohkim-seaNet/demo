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

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    /**
     * 현재 로그인한 사용자 정보 조회
     */
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUserInfo() {
        String currentUserId = getCurrentUserId();

        Map<String, Object> response = new HashMap<>();
        response.put("isAuthenticated", currentUserId != null);

        if (currentUserId != null) {
            response.put("userId", currentUserId);

            // 닉네임 조회
            UserVO user = userService.findByUserId(currentUserId);
            response.put("nickname", user.getNickname());
        }
        return ResponseEntity.ok(response);
    }

    /**
     * 로그인 상태만 간단 체크
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Boolean>> getAuthStatus() {
        boolean isAuthenticated = getCurrentUserId() != null;

        Map<String, Boolean> response = new HashMap<>();
        response.put("isAuthenticated", isAuthenticated);

        return ResponseEntity.ok(response);
    }

    /**
     * 현재 로그인 사용자 ID 조회
     */
    private String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {
            return null;
        }

        return authentication.getName();
    }
}
