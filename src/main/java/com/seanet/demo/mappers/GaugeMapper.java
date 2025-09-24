package com.seanet.demo.mappers;

import com.seanet.demo.domain.GaugeVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GaugeMapper {

    /**
     * 계기판 조회
     * @param gaugeId 계기판 ID
     * @return 계기판 정보
     */
    GaugeVO selectGauge(String gaugeId);

}
