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

import java.util.List;

/**
 * 게시판 관련 REST API Controller
 */
@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class BbsRestController {

    private final BbsService bbsService;

    /**
     * 현재 로그인 사용자 ID 조회 (내부용)
     */
    private String getCurrentUserId() {
        // Spring Security SecurityContext에서 현재 로그인한 사용자의 ID를 조회
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 비로그인 상태일때 null 반환
        if (authentication == null || !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {
            return null;
        }

        return authentication.getName();
    }

    // 게시물 작성
    @PostMapping("/")
    public ResponseEntity<Void> savePost(@RequestBody BbsVO bbsVO){
        String currentUserId = getCurrentUserId();

        if (currentUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();  // HTTP 401 Unauthorized
        }

        bbsService.savePost(bbsVO, currentUserId);
        return ResponseEntity.status(HttpStatus.CREATED).build();   // HTTP 201 Created
    }

    // 전체 게시물 목록 조회
    @GetMapping
    public ResponseEntity<List<BbsVO>> getAllPosts() {
        List<BbsVO> list = bbsService.findAllPost();
        return ResponseEntity.ok(list); // HTTP 200 OK
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

        // 서비스에서 페이징 및 검색 로직 처리
        BbsPageDTO result = bbsService.searchPostsWithPaging(pageDTO);

        return ResponseEntity.ok(result);   // HTTP 200 OK
    }

    // 게시물 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<BbsVO> getPost(@PathVariable Long id) {
        BbsVO post = bbsService.findPostById(id);
        if(post == null) {
            return ResponseEntity.notFound().build();   // HTTP 404 Not Found
        }
        return ResponseEntity.ok(post);
    }

    // 게시물 수정
    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePost(@PathVariable Long id, @RequestBody BbsVO bbsVO) {
        String currentUserId = getCurrentUserId();
        if (currentUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();  // HTTP 401 Unauthorized
        }

        bbsVO.setPstSn(id);
        boolean updated = bbsService.updatePost(bbsVO, currentUserId);

        // 게시글이 없거나 작성자가 다른 경우
        if(!updated) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // HTTP 403 Forbidden
        }

        return ResponseEntity.noContent().build();  // HTTP 204 No Content
    }

    // 게시물 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        String currentUserId = getCurrentUserId();
        if (currentUserId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();  // HTTP 401 Unauthorized
        }
        // Service에서 권한 검증과 함께 삭제 처리
        boolean deleted = bbsService.deletePost(id, currentUserId);

        // 게시글이 없거나 작성자가 다른 경우
        if(!deleted) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // HTTP 403 Forbidden
        }

        return ResponseEntity.noContent().build();  // HTTP 204 No Content
    }

}
