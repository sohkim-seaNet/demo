package com.seanet.demo.repository.main;

import com.seanet.demo.domain.main.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 사용자(User) 데이터 액세스 담당
 * Spring Data JPA Repository
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * 사용자 ID로 활성 사용자 조회
     * @param userId - 사용자 ID (비즈니스 키)
     * @return 사용자 정보
     */
    Optional<User> findByUserIdAndDelYn(String userId, String delYn);

    /**
     * 사용자 아이디 중복 확인
     * @param userId - 사용자 ID
     * @return 존재 여부
     */
    boolean existsByUserIdAndDelYn(String userId, String delYn);

    /**
     * 닉네임 중복 확인
     * @param nickname - 닉네임
     * @return 존재 여부
     */
    boolean existsByNicknameAndDelYn(String nickname, String delYn);

}
