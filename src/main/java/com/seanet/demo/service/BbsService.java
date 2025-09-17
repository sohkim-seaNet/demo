package com.seanet.demo.service;

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
