package com.seanet.demo.service;

import com.seanet.demo.domain.UserVO;
import com.seanet.demo.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    /**
     * 회원가입
     * @param userVO - 사용자 정보
     * @return 성공 여부
     */
    @Transactional
    public boolean registerUser(UserVO userVO) {
        try {
            // 비밀번호 암호화
            String encodedPassword = passwordEncoder.encode(userVO.getUserPwd());
            userVO.setUserPwd(encodedPassword);

            // 사용자 등록
            userMapper.save(userVO);

            log.info("회원가입 성공: {}", userVO.getUserId());
            return true;

        } catch (Exception e) {
            log.error("회원가입 실패: {}", userVO.getUserId(), e);
            return false;
        }
    }

    /**
     * 사용자 조회 (로그인용)
     * @param userId - 사용자 ID
     * @return 사용자 정보
     */
    public UserVO findByUserId(String userId) {
        return userMapper.findByUserId(userId);
    }

    /**
     * 아이디 중복 확인
     * @param userId - 사용자 ID
     * @return 중복 여부
     */
    public boolean isUserIdExists(String userId) {
        return userMapper.countByUserId(userId) > 0;
    }

    /**
     * 닉네임 중복 확인
     * @param nickname - 닉네임
     * @return 중복 여부
     */
    public boolean isNicknameExists(String nickname) {
        return userMapper.countByNickname(nickname) > 0;
    }

    /**
     * 이메일 중복 확인
     * @param email - 이메일
     * @return 중복 여부
     */
    public boolean isEmailExists(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        return userMapper.countByEmail(email) > 0;
    }

    /**
     * 사용자 정보 수정 (닉네임, 이메일만)
     * @param userVO - 수정할 사용자 정보
     * @return 성공 여부
     */
    @Transactional
    public boolean updateUser(UserVO userVO) {
        try {
            int result = userMapper.update(userVO);
            return result > 0;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 비밀번호 변경
     * @param userId - 사용자 ID
     * @param newPassword - 새 비밀번호
     * @return 성공 여부
     */
    @Transactional
    public boolean updatePassword(String userId, String newPassword) {
        try {
            String encodedPassword = passwordEncoder.encode(newPassword);
            int result = userMapper.updatePassword(userId, encodedPassword);
            return result > 0;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 비밀번호 검증
     * @param userId - 사용자 ID
     * @param rawPassword - 입력된 비밀번호
     * @return 일치 여부
     */
    public boolean validatePassword(String userId, String rawPassword) {
        UserVO user = userMapper.findByUserId(userId);
        if (user == null) {
            return false;
        }
        return passwordEncoder.matches(rawPassword, user.getUserPwd());
    }
}
