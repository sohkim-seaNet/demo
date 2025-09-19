package com.seanet.demo.service;

import com.seanet.demo.domain.BbsPageDTO;
import com.seanet.demo.domain.BbsVO;
import com.seanet.demo.domain.UserVO;
import com.seanet.demo.mappers.BbsMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 게시판 관련 비즈니스 로직 처리
 */
@Service(value = "bbsService")
@RequiredArgsConstructor
public class BbsService {

    private final BbsMapper bbsMapper;
    private final UserService userService;

    /**
     * 게시물 저장 (게시글 작성)
     * @param bbsVO 저장할 게시글 정보
     * @param userId 현재 로그인한 사용자 ID (SecurityContext에서 추출)
     * @return Long 생성된 게시글의 일련번호
     */
    @Transactional
    public Long savePost(BbsVO bbsVO, String userId) {
        // 1. 작성자 정보 설정
        bbsVO.setUserId(userId);

        // 2. 사용자 닉네임을 작성자명으로 설정
        UserVO user = userService.findByUserId(userId);
        if (user != null) {
            bbsVO.setPblrNm(user.getNickname());
        }

        // 3. 데이터 저장
        bbsMapper.save(bbsVO);

        // 4. 생성된 게시글 ID 반환
        return bbsVO.getPstSn();
    }
    /**
     * 게시물 목록 조회
     * @return 전체 게시물 목록
     */
    public List<BbsVO> findAllPost() {
        return bbsMapper.findAll();
    }

    /**
     * 검색 조건에 따른 게시물 페이징 조회
     * @param pageDTO - 검색 및 페이징 조건
     * @return BbsPageDTO 조회 결과와 페이징을 통합한 응답 객체
     */
    public BbsPageDTO searchPostsWithPaging(BbsPageDTO pageDTO) {

        // 1. OFFSET 값을 미리 계산해서 DTO에 설정
        int offset = (pageDTO.getPage() - 1) * pageDTO.getSize();
        pageDTO.setOffset(offset);

        // 2. 게시물 목록 조회
        List<BbsVO> posts = bbsMapper.searchPostsWithPaging(pageDTO);

        // 3. 전체 개수 조회
        long totalCount = bbsMapper.countSearchPosts(pageDTO);

        // 4. 페이징 정보 계산
        int totalPages = totalCount > 0 ? (int) Math.ceil((double) totalCount / pageDTO.getSize()) : 0;
        boolean hasNext = pageDTO.getPage() < totalPages;
        boolean hasPrevious = pageDTO.getPage() > 1;

        // 5. DTO에 결과 설정
        pageDTO.setContent(posts);
        pageDTO.setTotalElements(totalCount);
        pageDTO.setTotalPages(totalPages);
        pageDTO.setHasNext(hasNext);
        pageDTO.setHasPrevious(hasPrevious);

        return pageDTO;
    }

    /**
     * 게시물 상세정보 조회
     * @param pstSn - 게시물 일련번호
     * @return BbsVO 게시물 상세정보
     */
    public BbsVO findPostById(Long pstSn) {
        return bbsMapper.findBySn(pstSn);
    }

    /**
     * 게시물 수정
     *
     * @param bbsVO - 수정할 게시글 정보
     * @param userId 현재 로그인한 사용자 ID (권한 검증용)
     * @return boolean [true: 수정 성공, false: 권한 없음 또는 게시글 없음]
     */
    @Transactional
    public boolean updatePost(BbsVO bbsVO, String userId) {
        // 권한 체크
        if (!hasPermission(bbsVO.getPstSn(), userId)) {
            return false;
        }
        int count = bbsMapper.update(bbsVO);
        return count > 0;
    }

    /**
     * 게시물 삭제
     *
     * @param pstSn - 삭제할 게시글 일련번호
     * @param userId 현재 로그인한 사용자 ID (권한 검증용)
     * @return boolean [true: 수정 성공, false: 권한 없음 또는 게시글 없음]
     */
    public boolean deletePost(Long pstSn, String userId) {
        // 권한 체크
        if (!hasPermission(pstSn, userId)) {
            return false;
        }

        int count = bbsMapper.deleteBySn(pstSn);
        return count > 0;
    }

    /**
     * 게시물 수정/삭제 권한 확인
     * @param pstSn 권한 확인할 게시글 일련번호
     * @param userId 현재 로그인한 사용자 ID
     * @return boolean [true: 권한 있음, false: 권한 없음 또는 게시글 없음]
     */
    public boolean hasPermission(Long pstSn, String userId) {
        // 1. 파라미터 유효성 검사
        if (pstSn == null || userId == null) {
            return false;
        }
        // 2. 게시글 존재 여부 확인
        BbsVO post = bbsMapper.findBySn(pstSn);
        if (post == null) {
            return false;
        }

        // 3. 작성자 본인 여부 확인
        return userId.equals(post.getUserId());
    }

}
