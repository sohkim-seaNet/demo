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

@Service(value = "bbsService")
@RequiredArgsConstructor
public class BbsService {

    private final BbsMapper bbsMapper;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    /**
     * 게시물 저장
     */
    @Transactional
    public Long savePost(BbsVO bbsVO, String userId) {
        // 현재 로그인한 사용자 정보 설정
        bbsVO.setUserId(userId);

        // 사용자 닉네임을 작성자명으로 설정
        UserVO user = userService.findByUserId(userId);
        if (user != null) {
            bbsVO.setPblrNm(user.getNickname());
        }

        // 비밀번호 암호화 (나중에 제거 예정)
        if (bbsVO.getPstPswd() != null) {
            String encodedPassword = encodePstPswd(bbsVO.getPstPswd());
            bbsVO.setPstPswd(encodedPassword);
        }

        // 데이터 저장
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
     * @param pstSn - 게시물일련번호
     * @return pstSn
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
     * 비밀번호 암호화
     * @param pstPswd - 게시물비밀번호
     * @return encodedPstPswd
     */
    public String encodePstPswd(String pstPswd) {
        return passwordEncoder.encode(pstPswd);
    }

    /**
     * 게시물 수정/삭제 권한 확인
     */
    public boolean hasPermission(Long pstSn, String userId) {
        BbsVO post = bbsMapper.findBySn(pstSn);
        if (post == null || userId == null) {
            return false;
        }
        return post.getUserId().equals(userId);
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
