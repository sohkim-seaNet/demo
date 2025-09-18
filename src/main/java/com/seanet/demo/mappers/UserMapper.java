package com.seanet.demo.mappers;

import com.seanet.demo.domain.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

    /**
     * 사용자 등록
     * @param userVO - 사용자 정보
     */
    void save(UserVO userVO);

    /**
     * 사용자 ID로 조회
     * @param userId - 사용자 ID
     * @return 사용자 정보
     */
    UserVO findByUserId(String userId);

    /**
     * 아이디 중복 확인
     * @param userId - 사용자 ID
     * @return 중복 개수
     */
    long countByUserId(String userId);

    /**
     * 닉네임 중복 확인
     * @param nickname - 닉네임
     * @return 중복 개수
     */
    long countByNickname(String nickname);

    /**
     * 이메일 중복 확인
     * @param email - 이메일
     * @return 중복 개수
     */
    long countByEmail(String email);

    /**
     * 사용자 정보 수정
     * @param userVO - 사용자 정보
     * @return 수정된 행 수
     */
    int update(UserVO userVO);

    /**
     * 비밀번호 변경
     * @param userId - 사용자 ID
     * @param userPwd - 암호화된 비밀번호
     * @return 수정된 행 수
     */
    int updatePassword(@Param("userId") String userId, @Param("userPwd") String userPwd);

    /**
     * 사용자 삭제
     * @param userId - 사용자 ID
     * @return 수정된 행 수
     */
    int deleteByUserId(String userId);
}
