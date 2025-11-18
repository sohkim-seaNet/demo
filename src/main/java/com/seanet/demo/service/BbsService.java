package com.seanet.demo.service;

import com.seanet.demo.domain.main.Bbs;
import com.seanet.demo.domain.BbsPageDTO;
import com.seanet.demo.domain.main.User;
import com.seanet.demo.repository.main.BbsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 게시판 관련 비즈니스 로직 처리
 */
@Service(value = "bbsService")
@RequiredArgsConstructor
@Slf4j
public class BbsService {

    private final BbsRepository bbsRepository;
    private final UserService userService;

    /**
     * 게시물 저장 (게시글 작성)
     * @param bbs 저장할 게시글 정보
     * @param userId 현재 로그인한 사용자 ID (SecurityContext에서 추출)
     * @return Long 생성된 게시글의 일련번호
     */
    @Transactional
    public Long savePost(Bbs bbs, String userId) {

        // 1. 작성자 정보 조회
        User user = userService.findByUserId(userId);
        if (user == null) {
            throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
        }

        // 2. 작성자 정보 설정
        bbs.setUser(user);  // User 엔티티 설정 (FK)
        bbs.setUserId(user.getUserId());
        bbs.setPblrNm(user.getNickname());  // 작성자명 설정

        // 3. 데이터 저장
        Bbs savedBbs = bbsRepository.save(bbs);

        // 4. 생성된 게시글 ID 반환
        return savedBbs.getPstSn();
    }

    /**
     * 게시물 목록 조회
     * @return 전체 게시물 목록
     */
    @Transactional(readOnly = true)
    public List<Bbs> findAllPost() {
        return bbsRepository.findAll(Sort.by(Sort.Direction.DESC, "pstSn"));
    }

    /**
     * 검색 조건에 따른 게시물 페이징 조회
     * @param pageDTO - 검색 및 페이징 조건
     * @return BbsPageDTO 조회 결과와 페이징을 통합한 응답 객체
     */
    @Transactional(readOnly = true)
    public BbsPageDTO searchPostsWithPaging(BbsPageDTO pageDTO) {
        // 1. Pageable 객체 생성 (페이지는 0부터 시작)
        Pageable pageable = PageRequest.of(
                pageDTO.getPage() - 1,  // JPA는 0부터 시작
                pageDTO.getSize(),
                Sort.by(Sort.Direction.DESC, "regDt")
        );

        // 2. 검색 조건에 따라 적절한 Repository 메서드 호출
        Page<Bbs> bbsPage;
        String searchType = pageDTO.getSearchType();
        String searchKeyword = pageDTO.getSearchKeyword();

        if (searchKeyword == null || searchKeyword.trim().isEmpty()) {
            // 검색어 없음: 전체 조회
            bbsPage = bbsRepository.findByDelYn("N", pageable);
        } else {
            // 검색어 있음: 검색 타입에 따라 분기
            if ("title".equals(searchType)) {
                // 제목 검색
                bbsPage = bbsRepository.searchByTitle(searchKeyword, "N", pageable);
            } else if ("titleContent".equals(searchType)) {
                // 제목 + 내용 검색
                bbsPage = bbsRepository.searchByTitleAndContent(searchKeyword, "N", pageable);
            } else if ("writer".equals(searchType)) {
                // 작성자 검색
                bbsPage = bbsRepository.searchByWriter(searchKeyword, "N", pageable);
            } else {
                // 기본값: 제목 검색
                bbsPage = bbsRepository.searchByTitle(searchKeyword, "N", pageable);
            }
        }

        // 3. Page 객체를 BbsPageDTO로 변환
        pageDTO.setContent(bbsPage.getContent());
        pageDTO.setTotalElements(bbsPage.getTotalElements());
        pageDTO.setTotalPages(bbsPage.getTotalPages());
        pageDTO.setHasNext(bbsPage.hasNext());
        pageDTO.setHasPrevious(bbsPage.hasPrevious());

        return pageDTO;
    }


    /**
     * 게시물 상세정보 조회
     * @param pstSn - 게시물 일련번호
     * @return BbsVO 게시물 상세정보
     */
    @Transactional(readOnly = true)
    public Bbs findPostById(Long pstSn) {
        return bbsRepository.findByPstSnAndDelYn(pstSn, "N")
                .orElse(null);
    }

    /**
     * 게시물 수정
     *
     * @param bbs - 수정할 게시글 정보
     * @param userId 현재 로그인한 사용자 ID (권한 검증용)
     * @return boolean [true: 수정 성공, false: 권한 없음 또는 게시글 없음]
     */
    @Transactional
    public boolean updatePost(Bbs bbs, String userId) {
        try {
            // 1. 권한 체크
            if (!hasPermission(bbs.getPstSn(), userId)) {
                return false;
            }

            // 2. 기존 게시글 조회
            Bbs existingBbs = bbsRepository.findByPstSnAndDelYn(bbs.getPstSn(), "N")
                    .orElse(null);

            if (existingBbs == null) {
                return false;
            }

            // 3. 수정 가능한 필드만 업데이트
            existingBbs.update(bbs.getPstTtl(), bbs.getPstCn());

            // 4. JPA가 자동으로 UPDATE 쿼리 실행 (Dirty Checking)
            bbsRepository.save(existingBbs);

            return true;
        } catch (Exception e) {
            log.error("게시물 수정 실패: {}", e.getMessage());
            return false;
        }
    }


    /**
     * 게시물 삭제
     *
     * @param pstSn - 삭제할 게시글 일련번호
     * @param userId 현재 로그인한 사용자 ID (권한 검증용)
     * @return boolean [true: 수정 성공, false: 권한 없음 또는 게시글 없음]
     */
    @Transactional
    public boolean deletePost(Long pstSn, String userId) {
        try {
            // 1. 권한 체크
            if (!hasPermission(pstSn, userId)) {
                return false;
            }

            // 2. 소프트 삭제 실행
            int count = bbsRepository.softDeleteByPstSn(pstSn);
            return count > 0;
        } catch (Exception e) {
            log.error("게시물 삭제 실패: {}", e.getMessage());
            return false;
        }
    }


    /**
     * 게시물 수정/삭제 권한 확인
     * @param pstSn 권한 확인할 게시글 일련번호
     * @param userId 현재 로그인한 사용자 ID
     * @return boolean [true: 권한 있음, false: 권한 없음 또는 게시글 없음]
     */
    @Transactional(readOnly = true)
    public boolean hasPermission(Long pstSn, String userId) {
        // 1. 파라미터 유효성 검사
        if (pstSn == null || userId == null) {
            return false;
        }

        // 2. 게시글 존재 여부 확인
        Bbs post = bbsRepository.findByPstSnAndDelYn(pstSn, "N")
                .orElse(null);

        if (post == null) {
            return false;
        }

        // 3. 작성자 본인 여부 확인
        return userId.equals(post.getUser().getUserId());
    }

}
