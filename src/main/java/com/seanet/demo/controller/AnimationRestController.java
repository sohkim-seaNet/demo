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
 * 애니메이션 관련 Controller
 */
@RestController
@RequestMapping("/api/animation")
@RequiredArgsConstructor
public class AnimationRestController {

    private final GaugeService gaugeService;

    /**
     * 계기판 조회
     * @param gaugeId 계기판 ID
     * @return 계기판 설정 정보
     */
    @GetMapping("/{gaugeId}")
    public ResponseEntity<GaugeVO> getGaugeConfig(@PathVariable String gaugeId) {
        GaugeVO gaugeConfig = gaugeService.getGaugeConfig(gaugeId);

        if (gaugeConfig != null) {
            return ResponseEntity.ok(gaugeConfig);  // HTTP 200 OK
        } else {
            // 기본값으로 응답
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