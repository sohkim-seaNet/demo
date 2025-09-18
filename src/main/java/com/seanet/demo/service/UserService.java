package com.seanet.demo.service;

import com.seanet.demo.domain.UserVO;
import com.seanet.demo.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserMapper userMapper;

    /**
     * 회원가입
     * @param userVO - 사용자 정보
     * @return 성공 여부
     */
    @Transactional
    public boolean registerUser(UserVO userVO) {
        try {
            userMapper.save(userVO);
            return true;
        } catch (Exception e) {
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


}
