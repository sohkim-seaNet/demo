package com.seanet.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/post")
@RequiredArgsConstructor
public class BbsController {

    // 게시글 작성
    @GetMapping("/write")
    public String writeForm() { return "board/postWriteForm"; }

    // 게시글 목록
    @GetMapping("")
    public String list() { return "board/postList"; }

    // 게시글 상세 조회
    @GetMapping("/{id}")
    public String detail() { return "board/postDetail"; }

    // 게시글 수정
    @GetMapping("/edit/{id}")
    public String editForm() { return "board/postEditForm"; }

}
