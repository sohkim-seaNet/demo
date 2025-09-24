package com.seanet.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
/*
 * 계기판 정보를 담는 VO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GaugeVO {

    private String gaugeId;             // 계기판 ID
    private String gaugeNm;             // 계기판 이름
    private BigDecimal minValue;        // 최소값
    private BigDecimal maxValue;        // 최대값
    private BigDecimal minAngle;        // 최소각도
    private BigDecimal maxAngle;        // 최대각도
    private LocalDateTime regDt;        // 등록일시
}
