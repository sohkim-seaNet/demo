package com.seanet.demo.domain.main;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 사용자(User) 엔티티
 */
@Entity
@Table(name = "TBL_USER")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "USER_ID", length = 50, nullable = false, unique = true)
    private String userId;              // 사용자ID

    @Column(name = "USER_PWD", length = 256, nullable = false)
    private String userPwd;             // 사용자비밀번호

    @Column(name = "USER_NM", length = 100, nullable = false)
    private String userNm;              // 사용자명

    @Column(name = "NICKNAME", length = 50, nullable = false)
    private String nickname;            // 닉네임

    @CreationTimestamp
    @Column(name = "REG_DT", nullable = false, updatable = false)
    private LocalDateTime regDt;        // 등록일시

    @Column(name = "DEL_YN", length = 1, nullable = false)
    @Builder.Default
    private String delYn = "N";         // 삭제여부

    // ===================== 비즈니스 메서드 ===================== //

    /**
     * 사용자 논리 삭제(Soft Delete)
     */
    public void delete() {
        this.delYn = "Y";
    }

    /**
     * 활성 사용자 여부
     * - delYn 이 'N'이면 활성, 'Y'면 삭제
     */
    public boolean isActive() {
        return "N".equals(this.delYn);
    }
}
