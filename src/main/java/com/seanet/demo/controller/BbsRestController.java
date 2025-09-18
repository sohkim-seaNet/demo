package com.seanet.demo.controller;

import com.seanet.demo.domain.BbsPageDTO;
import com.seanet.demo.domain.BbsVO;
import com.seanet.demo.mappers.BbsMapper;
import com.seanet.demo.service.BbsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class BbsRestController {

    private final BbsService bbsService;
    private final BbsMapper bbsMapper;

    /**
     * 현재 로그인 사용자 ID 조회 (내부용)
     */
    private String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {
            return null;
        }

        return authentication.getName();
    }

    //게시물 작성
    @PostMapping("/")
    public ResponseEntity<Void> savePost(@RequestBody BbsVO bbsVO){
        String currentUserId = getCurrentUserId();

        if (currentUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();  // 401
        }

        bbsService.savePost(bbsVO, currentUserId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // 게시물 리스트 조회
    @GetMapping
    public ResponseEntity<List<BbsVO>> getAllPosts() {
        List<BbsVO> list = bbsService.findAllPost();
        return ResponseEntity.ok(list);
    }

    // 게시물 페이징 + 검색 조회
    @GetMapping("/search")
    public ResponseEntity<BbsPageDTO> searchPosts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String searchType,
            @RequestParam(required = false) String searchKeyword) {

        // 요청 DTO 생성
        BbsPageDTO pageDTO = BbsPageDTO.builder()
                .page(page)
                .size(size)
                .searchType(searchType)
                .searchKeyword(searchKeyword)
                .build();

        // 서비스 호출
        BbsPageDTO result = bbsService.searchPostsWithPaging(pageDTO);

        return ResponseEntity.ok(result);
    }

    // 게시물 단건 조회
    @GetMapping("/{id}")
    public ResponseEntity<BbsVO> getPost(@PathVariable Long id) {
        BbsVO post = bbsService.findPostById(id);
        if(post == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(post);
    }

    // 게시물 수정
    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePost(@PathVariable Long id, @RequestBody BbsVO bbsVO) {
        String currentUserId = getCurrentUserId();
        if (currentUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();  // 401
        }

        bbsVO.setPstSn(id);
        boolean updated = bbsService.updatePost(bbsVO, currentUserId);

        if(!updated) {
            // 권한 없음 또는 게시글 없음
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.noContent().build();
    }

    // 게시물 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        String currentUserId = getCurrentUserId();
        if (currentUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();  // 401
        }
        boolean deleted = bbsService.deletePost(id, currentUserId);  // ← userId 파라미터 추가

        if(!deleted) {
            // 권한 없음 또는 게시글 없음
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 403
        }
        return ResponseEntity.noContent().build();  // 204
    }

}
