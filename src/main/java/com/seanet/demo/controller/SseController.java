package com.seanet.demo.controller;

import com.seanet.demo.service.SseService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

/**
 * SSE (Server-Sent Events) 연결을 위한 컨트롤러
 */
@RestController
public class SseController {

    private final SseService sseService;

    public SseController(SseService sseService) {
        this.sseService = sseService;
    }

    /**
     * 클라이언트가 SSE 스트림을 구독하기 위한 엔드포인트
     * produces = MediaType.TEXT_EVENT_STREAM_VALUE 이 엔드포인트가 SSE 스트림을 반환함을 나타냄
     * @return SseEmitter 객체. 각 클라이언트와의 연결을 유지하고 데이터를 보낼 수 있는 통로
     */
    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe() {
        // 실제 Emitter 생성 및 관리는 SseService에 위임
        return sseService.addEmitter();
    }

}
