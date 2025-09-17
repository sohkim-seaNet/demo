package com.seanet.demo.controller;

import com.seanet.demo.domain.BbsPageDTO;
import com.seanet.demo.domain.BbsVO;
import com.seanet.demo.service.BbsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class BbsRestController {

    private final BbsService bbsService;

    //게시물 작성
    @PostMapping("/")
    public ResponseEntity<Void> savePost(@RequestBody BbsVO bbsVO){

        // 패스워드 암호화
        String encodedPstPswd = bbsService.encodePstPswd(bbsVO.getPstPswd());
        bbsVO.setPstPswd(encodedPstPswd);

        bbsService.savePost(bbsVO);
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
        if (!bbsService.verifyPassword(id, bbsVO.getPstPswd())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        bbsVO.setPstSn(id);
        boolean updated = bbsService.updatePost(bbsVO);
        if(!updated) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    //비밀번호 검증용
    @PostMapping("/{id}/verifyPassword")
    public ResponseEntity<Void> verifyPassword(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String inputPassword = request.get("pstPswd");
        if (inputPassword == null || !bbsService.verifyPassword(id, inputPassword)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok().build();
    }

    // 게시물 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        boolean deleted = bbsService.deletePost(id);
        if(!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

}
