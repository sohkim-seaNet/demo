package com.seanet.demo.controller;

import com.seanet.demo.domain.GaugeVO;
import com.seanet.demo.service.GaugeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

/**
 * 애니메이션 관련 REST API Controller
 * 계기판(Gauge) 설정 정보 제공
 */
 @RestController
@RequestMapping("/api/animation")
@RequiredArgsConstructor
public class AnimationRestController {

    private final GaugeService gaugeService;

    /**
     * 특정 계기판의 설정 정보 조회
     * @param gaugeId 계기판 ID
     * @return ResponseEntity<GaugeVO> 계기판 설정 정보
     */
    @GetMapping("/{gaugeId}")
    public ResponseEntity<GaugeVO> getGaugeConfig(@PathVariable String gaugeId) {
        // 1. 데이터베이스에서 계기판 설정 조회
        GaugeVO gaugeConfig = gaugeService.getGaugeConfig(gaugeId);

        if (gaugeConfig != null) {
            // 2-1. 데이터가 존재하면 조회된 설정값 반환
            return ResponseEntity.ok(gaugeConfig);  // HTTP 200 OK
        } else {
            // 2-2. 데이터가 없으면 기본 설정값 생성 후 반환
            GaugeVO defaultConfig = GaugeVO.builder()
                    .gaugeId(gaugeId)
                    .gaugeNm("기본 계기판")
                    .minValue(new BigDecimal("0"))
                    .maxValue(new BigDecimal("800"))
                    .minAngle(new BigDecimal("-90"))
                    .maxAngle(new BigDecimal("90"))
                    .build();

            return ResponseEntity.ok(defaultConfig);  // HTTP 200 OK
        }
    }

}