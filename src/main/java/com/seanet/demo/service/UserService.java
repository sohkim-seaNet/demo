package com.seanet.demo.service;

import com.seanet.demo.domain.main.User;
import com.seanet.demo.repository.main.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 사용자 관련 비즈니스 로직 처리
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    /**
     * 회원가입
     * @param user - 사용자 정보
     * @return boolean [true: 회원가입 성공, false: 실패]
     */
    @Transactional
    public boolean registerUser(User user) {
        try {
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            log.error("회원가입 실패: {}", e.getMessage());
            return false;
        }
    }

    /**
     * 사용자 조회 (로그인용)
     * @param userId - 사용자 ID (로그인 ID)
     * @return 사용자 정보
     */
    public User findByUserId(String userId) {
        return userRepository.findByUserIdAndDelYn(userId, "N")
                .orElse(null);
    }

    /**
     * 아이디 중복 확인
     * @param userId - 사용자 ID
     * @return boolean [true: 이미 사용 중, false: 사용 가능]
     */
    public boolean isUserIdExists(String userId) {
        return userRepository.existsByUserIdAndDelYn(userId, "N");

    }

    /**
     * 닉네임 중복 확인
     * @param nickname - 닉네임
     * @return boolean [true: 이미 사용 중, false: 사용 가능]
     */
    public boolean isNicknameExists(String nickname) {
        return userRepository.existsByNicknameAndDelYn(nickname, "N");
    }


}
