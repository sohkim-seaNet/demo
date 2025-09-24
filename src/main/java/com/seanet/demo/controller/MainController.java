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

    @GetMapping("animation/1")
    public String animation1() {
        return "animation/animation1";
    }

    @GetMapping("animation/2")
    public String animation2() {
        return "animation/animation2";
    }

    @GetMapping("animation/3")
    public String animation3() {
        return "animation/animation3";
    }

    @GetMapping("animation/4")
    public String animation4() {
        return "animation/animaion4";
    }

    @GetMapping("animation/5")
    public String animation5() {
        return "animation/animation5";
    }

}
