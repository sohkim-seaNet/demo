package com.seanet.demo.repository.main;

import com.seanet.demo.domain.main.Gauge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 계기판(Gauge) 데이터 액세스 담당
 */
@Repository
public interface GaugeRepository extends JpaRepository<Gauge, Long> {

    /**
     * 계기판 ID로 조회
     * @param gaugeId - 계기판 ID (비즈니스 키)
     * @return 계기판 정보
     */
    Optional<Gauge> findByGaugeId(String gaugeId);

    /**
     * 계기판 ID 존재 여부 확인
     * @param gaugeId - 계기판 ID
     * @return 존재 여부
     */
    boolean existsByGaugeId(String gaugeId);


}
