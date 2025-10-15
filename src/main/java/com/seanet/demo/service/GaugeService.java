package com.seanet.demo.service;

import com.seanet.demo.domain.GaugeVO;
import com.seanet.demo.mappers.main.GaugeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 계기판(Gauge) 설정 관리 서비스
 */
@Service
@RequiredArgsConstructor
public class GaugeService {

    private final GaugeMapper gaugeMapper;

    /**
     * 특정 계기판의 설정 정보 조회
     *
     * @param gaugeId 계기판 ID
     * @return GaugeVO 계기판 설정 정보
     */
    public GaugeVO getGaugeConfig(String gaugeId) {
        return gaugeMapper.selectGauge(gaugeId);
    }


}
