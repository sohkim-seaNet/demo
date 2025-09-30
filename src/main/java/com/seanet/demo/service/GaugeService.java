package com.seanet.demo.service;

import com.seanet.demo.domain.GaugeVO;
import com.seanet.demo.mappers.main.GaugeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GaugeService {

    @Autowired
    private GaugeMapper gaugeMapper;

    /**
     * 계기판 조회
     * @param gaugeId 계기판 ID
     * @return 계기판 설정 정보
     */
    public GaugeVO getGaugeConfig(String gaugeId) {
        return gaugeMapper.selectGauge(gaugeId);
    }


}
