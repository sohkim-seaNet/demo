package com.seanet.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * WebSocket 및 STOMP 메시징 설정 클래스
 * 실시간 양방향 통신을 위한 WebSocket과 STOMP 프로토콜을 설정
 */
@Configuration
@EnableWebSocketMessageBroker // WebSocket 메시지 브로커 활성화
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * 메시지 브로커 설정
     * 클라이언트와 서버 간의 메시지 라우팅 규칙을 정의
     *
     * 메시지 흐름:
     * 1. 클라이언트 → 서버: "/app" prefix 경로로 메시지 발행(publish)
     * 2. 서버 → 클라이언트: "/topic" prefix 경로로 메시지 구독(subscribe)
     *
     * @param registry 메시지 브로커 레지스트리
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 클라이언트가 메시지를 구독할 때 사용할 경로 설정
        registry.enableSimpleBroker("/topic");

        // 클라이언트에서 서버로 메시지를 보낼 때 사용할 경로설정
        registry.setApplicationDestinationPrefixes("/app");
    }

    /**
     * STOMP 엔드포인트 등록
     *
     * 클라이언트가 WebSocket 서버에 연결하기 위한 엔드포인트를 설정
     * SockJS를 활성화하여 WebSocket을 지원하지 않는 환경에서도 동작 가능
     *
     * 연결 순서:
     * 1. 클라이언트가 /ws 엔드포인트로 WebSocket 연결 시도
     * 2. WebSocket 지원 시: WebSocket 프로토콜 사용
     * 3. WebSocket 미지원 시: SockJS가 자동으로 대체 방식 선택
     *
     * @param registry STOMP 엔드포인트 레지스트리
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // WebSocket 연결 엔드포인트 등록
        // 클라이언트는 ws://localhost:8080/ws 로 연결
        registry.addEndpoint("/ws")
                // CORS 설정: 모든 도메인에서 접근 허용 (개발 환경용)
                .setAllowedOriginPatterns("*")
                // WebSocket을 지원하지 않는 브라우저에서도
                // HTTP 기반의 통신으로 자동 전환되어 동작
                .withSockJS();
    }
}
