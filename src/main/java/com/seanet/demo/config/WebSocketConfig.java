package com.seanet.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 클라이언트가 메시지를 구독할 때 사용할 경로(prefix)를 설정
        // "/topic"으로 시작하는 경로로 메시지를 보내면, 해당 경로를 구독하는 클라이언트에게 메시지가 전달됨
        registry.enableSimpleBroker("/topic");

        // 클라이언트에서 서버로 메시지를 보낼 때 사용할 경로(prefix)를 설정
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 클라이언트가 WebSocket에 연결할 때 사용할 엔드포인트를 등록
        // SockJS를 사용하여 WebSocket을 지원하지 않는 브라우저에서도 통신이 가능하도록 함
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }
}
