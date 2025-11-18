package com.seanet.demo.domain.main;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 게시글(BBS) 엔티티
 * - User 엔티티와 다대일(N:1) 관계 (@ManyToOne)
 */
@Entity
@Table(name = "TBL_BBS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = "user")
public class Bbs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PST_SN")
    private Long pstSn;            // 게시물 일련번호 (PK)

    @Column(name = "PST_TTL", length = 200, nullable = false)
    private String pstTtl;              // 게시물 제목

    @Column(name = "PST_CN", columnDefinition = "nvarchar(max)", nullable = false)
    @Lob
    private String pstCn;               // 게시물 내용

    @Column(name = "PBLR_NM", length = 50, nullable = false)
    private String pblrNm;              // 게시자명

    @Column(name = "USER_ID", length = 50, nullable = false)
    private String userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID_FK", nullable = false,
            foreignKey = @ForeignKey(name = "FK_TBL_BBS_TBL_USER"))

    @JsonIgnore
    private User user;                  // 작성자 (TBL_USER.ID 참조)

    @CreationTimestamp
    @Column(name = "REG_DT", nullable = false, updatable = false)
    private LocalDateTime regDt;        // 등록일시

    @UpdateTimestamp
    @Column(name = "MDFCN_DT")
    private LocalDateTime mdfcnDt;      // 수정일시

    @Column(name = "DEL_YN", length = 1, nullable = false)
    @Builder.Default
    private String delYn = "N";         // 삭제여부

    // ===================== 비즈니스 메서드 ===================== //

    /**
     * 게시글 논리 삭제(Soft Delete) 메서드
     */
    public void delete() {
        this.delYn = "Y";
    }

    /**
     * 삭제되지 않은 활성 게시글인지 여부 확인
     */
    public boolean isActive() {
        return "N".equals(this.delYn);
    }

    /**
     * 게시글 수정
     */
    public void update(String title, String content) {
        this.pstTtl = title;
        this.pstCn = content;
    }
}
