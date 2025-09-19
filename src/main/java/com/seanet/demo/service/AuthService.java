package com.seanet.demo.service;

import com.seanet.demo.domain.UserVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Spring Security 인증 담당
 */
@Service
@Slf4j
public class AuthService implements UserDetailsService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Spring Security UserDetailsService 인터페이스 메소드 구현
     * @param username 로그인 form에서 사용자가 입력한 ID
     * @return UserDetails 사용자 정보 객체
     * @throws UsernameNotFoundException 사용자가 존재하지 않거나 삭제된 경우
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // 1. 데이터베이스에서 사용자 정보 조회
        UserVO user = userService.findByUserId(username);

        // 2. 사용자 존재 여부 확인
        if (user == null) {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + username);
        }

        // 3. UserVO를 Spring Security UserDetails 객체로 변환
        return User.builder()
                .username(user.getUserId())
                .password(user.getUserPwd())
                .authorities("ROLE_USER")   // 사용자 권한 설정 (현재는 모든 사용자가 ROLE_USER)
                .build();
    }

    /**
     * 평문 비밀번호를 BCrypt로 암호화
     * @param rawPassword 사용자가 입력한 평문 비밀번호
     * @return String BCrypt로 암호화된 해시 문자열
     */
    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
}

