package com.seanet.demo.mappers.main;

import com.seanet.demo.domain.GaugeVO;
import org.apache.ibatis.annotations.Mapper;

/**
 * 게기판(GAUGE) 데이터 액세스 담당
 * MyBatis Mapper 인터페이스
 */
@Mapper
public interface GaugeMapper {

    /**
     * 계기판 조회
     * @param gaugeId 계기판 ID
     * @return 계기판 정보
     */
    GaugeVO selectGauge(String gaugeId);

}
