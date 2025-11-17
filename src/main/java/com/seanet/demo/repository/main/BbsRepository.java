package com.seanet.demo.repository.main;

import com.seanet.demo.domain.main.Bbs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 게시판(BBS) 데이터 액세스 담당
 */
@Repository
public interface BbsRepository extends JpaRepository<Bbs, Long> {

    /**
     * 활성 게시글 목록 조회 (페이징)
     * @param delYn - 삭제 여부
     * @param pageable - 페이징 정보
     * @return 게시글 페이지
     */
    Page<Bbs> findByDelYnOrderByRegDtDesc(String delYn, Pageable pageable);

    /**
     * 게시글 번호로 활성 게시글 조회
     * @param pstSn - 게시글 일련번호
     * @param delYn - 삭제 여부
     * @return 게시글 정보
     */
    Optional<Bbs> findByPstSnAndDelYn(Long pstSn, String delYn);

    /**
     * 제목 검색 (페이징)
     * @param keyword - 검색 키워드
     * @param delYn - 삭제 여부
     * @param pageable - 페이징 정보
     * @return 게시글 페이지
     */
    @Query("SELECT b FROM Bbs b WHERE b.pstTtl LIKE %:keyword% AND b.delYn = :delYn ORDER BY b.regDt DESC")
    Page<Bbs> searchByTitle(@Param("keyword") String keyword,
                            @Param("delYn") String delYn,
                            Pageable pageable);

    /**
     * 제목 + 내용 검색 (페이징)
     * @param keyword - 검색 키워드
     * @param delYn - 삭제 여부
     * @param pageable - 페이징 정보
     * @return 게시글 페이지
     */
    @Query("SELECT b FROM Bbs b WHERE (b.pstTtl LIKE %:keyword% OR b.pstCn LIKE %:keyword%) AND b.delYn = :delYn ORDER BY b.regDt DESC")
    Page<Bbs> searchByTitleAndContent(@Param("keyword") String keyword,
                                      @Param("delYn") String delYn,
                                      Pageable pageable);

    /**
     * 작성자명 검색 (페이징)
     * @param keyword - 검색 키워드
     * @param delYn - 삭제 여부
     * @param pageable - 페이징 정보
     * @return 게시글 페이지
     */
    @Query("SELECT b FROM Bbs b WHERE b.pblrNm LIKE %:keyword% AND b.delYn = :delYn ORDER BY b.regDt DESC")
    Page<Bbs> searchByWriter(@Param("keyword") String keyword,
                             @Param("delYn") String delYn,
                             Pageable pageable);

    /**
     * 게시글 소프트 삭제
     * @param pstSn - 게시글 일련번호
     */
    @Modifying
    @Query("UPDATE Bbs b SET b.delYn = 'Y' WHERE b.pstSn = :pstSn")
    int softDeleteByPstSn(@Param("pstSn") Long pstSn);


    Page<Bbs> findByDelYn(String delYn, Pageable pageable);
}
