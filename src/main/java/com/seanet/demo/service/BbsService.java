package com.seanet.demo.service;

import com.seanet.demo.domain.BbsPageDTO;
import com.seanet.demo.domain.BbsVO;
import com.seanet.demo.mappers.BbsMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service(value = "bbsService")
@RequiredArgsConstructor
public class BbsService {

    private final BbsMapper bbsMapper;
    private final PasswordEncoder passwordEncoder;

    /**
     * 게시물 저장
     */
    @Transactional
    public Long savePost(BbsVO bbsVO) {
        bbsMapper.save(bbsVO);
        return bbsVO.getPstSn();
    }

    /**
     * 게시물 리스트 조회
     * @return 게시물 리스트
     */
    public List<BbsVO> findAllPost() {
        return bbsMapper.findAll();
    }

    /**
     * 검색 조건에 따른 게시물 페이징 조회
     * @param pageDTO - 검색 및 페이징 조건
     * @return 페이징된 게시물 결과
     */
    public BbsPageDTO searchPostsWithPaging(BbsPageDTO pageDTO) {

        // OFFSET 값을 미리 계산해서 DTO에 설정
        int offset = (pageDTO.getPage() - 1) * pageDTO.getSize();
        pageDTO.setOffset(offset);

        // 1. 게시물 목록 조회
        List<BbsVO> posts = bbsMapper.searchPostsWithPaging(pageDTO);

        // 2. 전체 개수 조회
        long totalCount = bbsMapper.countSearchPosts(pageDTO);

        // 3. 페이징 정보 계산
        int totalPages = totalCount > 0 ? (int) Math.ceil((double) totalCount / pageDTO.getSize()) : 0;
        boolean hasNext = pageDTO.getPage() < totalPages;
        boolean hasPrevious = pageDTO.getPage() > 1;

        // 4. 결과 설정
        pageDTO.setContent(posts);
        pageDTO.setTotalElements(totalCount);
        pageDTO.setTotalPages(totalPages);
        pageDTO.setHasNext(hasNext);
        pageDTO.setHasPrevious(hasPrevious);

        return pageDTO;
    }


    /**
     * 게시물 상세정보 조회
     * @param pstSn - 게시물일련번호
     * @return 게시물 상세정보
     */
    public BbsVO findPostById(Long pstSn) {
        return bbsMapper.findBySn(pstSn);
    }

    /**
     * 게시물 수정
     *
     * @param bbsVO - 게시물 정보
     * @return pstSn
     */
    @Transactional
    public boolean updatePost(BbsVO bbsVO) {
        int count = bbsMapper.update(bbsVO);
        return count > 0;
    }

    /**
     * 게시물 삭제
     *
     * @param pstSn - 게시물일련번호
     * @return pstSn
     */
    public boolean deletePost(Long pstSn) {
        int count = bbsMapper.deleteBySn(pstSn);
        return count > 0;
    }

    /**
     * 비밀번호 암호화
     * @param pstPswd - 게시물비밀번호
     * @return encodedPstPswd
     */
    public String encodePstPswd(String pstPswd) {
        return passwordEncoder.encode(pstPswd);
    }

    /**
     * 비밀번호 매치 여부 확인
     * @param pstSn - 게시물일련번호
     * @param pswd - 사용자 입력 비밀번호
     * @return
     */
    public boolean verifyPassword(Long pstSn, String pswd) {
        String actualPassword = findPostById(pstSn).getPstPswd();
        return passwordEncoder.matches(pswd, actualPassword);
    }
}
