package com.seanet.demo.mappers;

import com.seanet.demo.domain.BbsPageDTO;
import com.seanet.demo.domain.BbsVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BbsMapper {

    /**
     * 게시물 저장
     * @param bbs - 게시물 정보
     */
    void save(BbsVO bbs);

    /**
     * 게시물 리스트 조회
     * @return 게시물 리스트
     */
    List<BbsVO> findAll();

    // ===== 새로 추가: 페이징 + 검색 =====

    /**
     * 검색 조건에 따른 게시물 페이징 조회
     * @param pageDTO - 검색 및 페이징 조건
     * @return 게시물 리스트
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
     * @param pstSn - 게시물일련번호
     * @return 게시물 상세정보
     */
    BbsVO findBySn(Long pstSn);

    /**
     * 게시물 수정
     * @param bbs - 게시물 정보
     * @return 게시물일련번호
     */
    int update(BbsVO bbs);

    /**
     * 게시물 삭제
     * @param pstSn - 게시물일련번호
     * @return 게시물일련번호
     */
    int deleteBySn(Long pstSn);

}
