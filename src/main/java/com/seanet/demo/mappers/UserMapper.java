package com.seanet.demo.mappers;

import com.seanet.demo.domain.UserVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 사용자(User) 데이터 액세스 담당
 * MyBatis Mapper 인터페이스
 */
@Mapper
public interface UserMapper {

    /**
     * 사용자 등록 (회원가입)
     * @param userVO - 사용자 정보
     */
    void save(UserVO userVO);

    /**
     * 사용자 ID로 특정 사용자의 상세 정보 조회
     * @param userId - 사용자 ID (로그인 ID)
     * @return 사용자 정보
     */
    UserVO findByUserId(String userId);

    /**
     * 사용자 아이디 중복 확인
     * @param userId - 사용자 ID
     * @return 중복 개수 (0: 사용 가능, 1 이상: 중복)
     */
    int countByUserId(String userId);

    /**
     * 닉네임 중복 확인
     * @param nickname - 닉네임
     * @return 중복 개수 (0: 사용 가능, 1 이상: 중복)
     */
    int countByNickname(String nickname);

    /**
     * 사용자 정보 수정
     * @param userVO - 사용자 정보
     * @return 영향받은 행의 수 (1: 성공, 0: 실패 또는 사용자 없음)
     */
    int update(UserVO userVO);

    /**
     * 비밀번호 변경
     * @param userId - 사용자 ID
     * @param userPwd - 암호화된 새로운 비밀번호
     * @return 영향받은 행의 수 (1: 성공, 0: 사용자 없음)
     */
    int updatePassword(@Param("userId") String userId, @Param("userPwd") String userPwd);

    /**
     * 사용자 삭제
     * @param userId - 사용자 ID
     * @return 영향받은 행의 수 (1: 성공, 0: 사용자 없음)
     */
    int deleteByUserId(String userId);
}
