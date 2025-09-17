package com.seanet.demo.domain;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter @Setter
public class BbsVO {

    private Long pstSn;            // 게시물일련번호
    private String pstTtl;         // 게시물제목
    private String pstCn;          // 게시물내용
    private String pblrNm;         // 게시자명
    private String pstPswd;        // 게시물비밀번호
    private LocalDateTime regDt;   // 등록일시
    private LocalDateTime mdfcnDt; // 수정일시
    private String delYn;          // 삭제여부

}
