package com.seanet.demo.controller;

import com.seanet.demo.service.SseService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

/**
 * SSE (Server-Sent Events) 연결을 위한 Controller
 * 서버에서 클라이언트로 실시간 데이터를 단방향으로 전송하는 SSE 구현
 */
@RestController
public class SseController {

    private final SseService sseService;

    public SseController(SseService sseService) {
        this.sseService = sseService;
    }

    /**
     * 클라이언트가 SSE 스트림을 구독하기 위한 엔드포인트
     *
     * 클라이언트가 이 엔드포인트에 연결하면 서버는 SseEmitter 객체를 생성하여 반환,
     * 이후 서버에서 원하는 시점에 해당 연결을 통해 데이터를 실시간으로 전송 가능
     *
     * produces = MediaType.TEXT_EVENT_STREAM_VALUE:
     * - SSE 표준 프로토콜임을 브라우저에 알림
     * - 이 설정이 있어야 브라우저의 EventSource API가 정상 작동
     *
     * @return SseEmitter 객체 - 각 클라이언트와의 연결을 유지하고 데이터를 보낼 수 있는 통로
     */
    @GetMapping(value = "/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe() {
        // 실제 Emitter 생성 및 관리는 SseService에 위임
        return sseService.addEmitter();
    }

}
