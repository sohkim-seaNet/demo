package com.seanet.demo.domain.main;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 계기판 정보 엔티티
 */
@Entity
@Table(name = "TBL_GAUGE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Gauge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "GAUGE_ID", length = 50, nullable = false, unique = true)
    private String gaugeId;             // 계기판 ID (비즈니스 키)

    @Column(name = "GAUGE_NM", length = 100, nullable = false)
    private String gaugeNm;             // 계기판 이름

    @Column(name = "MIN_VALUE", precision = 10, scale = 2, nullable = false)
    private BigDecimal minValue;        // 최소값

    @Column(name = "MAX_VALUE", precision = 10, scale = 2, nullable = false)
    private BigDecimal maxValue;        // 최대값

    @Column(name = "MIN_ANGLE", precision = 10, scale = 2, nullable = false)
    private BigDecimal minAngle;        // 최소각도

    @Column(name = "MAX_ANGLE", precision = 10, scale = 2, nullable = false)
    private BigDecimal maxAngle;        // 최대각도

    @CreationTimestamp
    @Column(name = "REG_DT")
    private LocalDateTime regDt;        // 등록일시


}
