package com.seanet.demo.domain;

import lombok.*;

import java.util.List;

/**
 * 게시글 페이징 + 검색 통합 DTO
 */
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter @Setter
public class BbsPageDTO {

    // ===== 검색 조건 관련 필드 =====
    private String searchType;          // "title", "title + content", "writer"
    private String searchKeyword;       // 검색어

    // ===== 페이징 조건 관련 필드 =====
    @Builder.Default
    private int page = 1;               // 현재 페이지 (기본값: 1)

    @Builder.Default
    private int size = 10;              // 페이지당 표시할 게시글 수 (기본값: 10)

    private int offset;                 // 데이터베이스 OFFSET 값

    // ===== 조회 결과 데이터 관련 필드 =====
    private List<BbsVO> content;        // 게시글 목록
    private long totalElements;         // 전체 게시글 수
    private int totalPages;             // 전체 페이지 수
    private boolean hasNext;            // 다음 페이지 존재 여부
    private boolean hasPrevious;        // 이전 페이지 존재 여부

}
