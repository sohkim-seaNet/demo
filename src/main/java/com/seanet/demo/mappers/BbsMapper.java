package com.seanet.demo.mappers;

import com.seanet.demo.domain.BbsPageDTO;
import com.seanet.demo.domain.BbsVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 게시판(BBS) 데이터 액세스 담당
 * MyBatis Mapper 인터페이스
 */
@Mapper
public interface BbsMapper {

    /**
     * 게시물 저장
     * @param bbs - 게시물 정보
     */
    void save(BbsVO bbs);

    /**
     * 게시물 목록 조회
     * @return 게시물 목록
     */
    List<BbsVO> findAll();

    /**
     * 검색 조건과 페이징을 적용한 게시물 목록 조회
     * @param pageDTO - 검색 및 페이징 조건
     * @return 게시물 목록 (페이징 적용)
     */
    List<BbsVO> searchPostsWithPaging(BbsPageDTO pageDTO);

    /**
     * 검색 조건에 따른 게시물 총 개수 조회
     * @param pageDTO - 검색 조건
     * @return 총 게시물 개수
     */
    long countSearchPosts(BbsPageDTO pageDTO);

    /**
     * 게시물 상세정보 조회
     * @param pstSn - 게시물 일련번호
     * @return 게시물 상세정보
     */
    BbsVO findBySn(Long pstSn);

    /**
     * 게시물 수정
     * @param bbs - 게시물 정보
     * @return 영향받은 행의 수 (1: 성공, 0: 실패 또는 권한 없음)
     */
    int update(BbsVO bbs);

    /**
     * 게시물 삭제
     * @param pstSn - 게시물일련번호
     * @return 영향받은 행의 수 (1: 성공, 0: 실패 또는 권한 없음)
     */
    int deleteBySn(Long pstSn);

}
