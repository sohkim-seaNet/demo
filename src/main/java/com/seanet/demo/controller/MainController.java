package com.seanet.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * 애플리케이션 메인 페이지 Controller
 */
@Controller
public class MainController {

    @GetMapping("/")
    public String index() {
        return "index";  // /WEB-INF/jsp/index.jsp
    }
}
