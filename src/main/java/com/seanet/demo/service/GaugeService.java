package com.seanet.demo.service;

import com.seanet.demo.domain.main.Gauge;
import com.seanet.demo.repository.main.GaugeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class GaugeService {

    private final GaugeRepository gaugeRepository;

    /**
     * 계기판 조회
     * @param gaugeId 계기판 ID
     * @return 계기판 설정 정보
     */
    @Transactional(readOnly = true)
    public Gauge getGaugeConfig(String gaugeId) {
        return gaugeRepository.findByGaugeId(gaugeId)
                .orElse(null);
    }
}
