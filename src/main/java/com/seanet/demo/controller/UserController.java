package com.seanet.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 사용자 관련 View 페이지 이동 Controller
 */
@Controller
@RequestMapping("/user")
public class UserController {

    // 로그인 페이지
    @GetMapping("/login")
    public String login() {
        return "user/login";
    }

    // 회원가입 페이지
    @GetMapping("/signup")
    public String signup() {
        return "user/signup";
    }
}