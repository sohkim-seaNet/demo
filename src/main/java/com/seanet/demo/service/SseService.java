package com.seanet.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * SSE Emitter들을 관리하고, 이벤트를 브로드캐스트하는 서비스
 */
@Service
public class SseService {

    // 연결된 클라이언트(Emitter)들을 저장하는 리스트
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    /**
     * 새로운 클라이언트가 구독을 요청할 때 호출
     * 클라이언트 하나당 SseEmitter 객체 하나가 생성되고 리스트에 추가
     * @return 생성된 SseEmitter 객체. 컨트롤러를 통해 클라이언트에게 반환
     */
    public SseEmitter addEmitter() {
        // 1. SseEmitter 객체 생성. 타임아웃을 매우 길게(Long.MAX_VALUE) 설정하여 연결이 끊어지지 않도록 함
        //    만약 타임아웃이 발생하면, 브라우저는 자동으로 서버에 재연결을 시도
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);

        // 2. Emitter가 만료(complete), 타임아웃, 에러 등으로 종료될 때,
        //    반드시 emitters 리스트에서 제거되도록 콜백 함수 등록
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((e) -> emitters.remove(emitter));

        // 3. 생성된 Emitter를 리스트에 추가
        emitters.add(emitter);

        // 4. 클라이언트에게 첫 연결이 성공했음을 알리는 더미 데이터를 보냄
        //    이벤트 이름('connect')을 지정하여 클라이언트가 특정 이벤트를 구분해서 처리할 수 있게 함
        try {
            emitter.send(SseEmitter.event().name("connect").data("!!Connected!!"));
        } catch (IOException e) {
            // 초기 연결 시 클라이언트가 페이지를 바로 닫는 등의 이유로 IOException이 발생할 수 있음
            // 이 경우 해당 Emitter를 즉시 제거
            emitters.remove(emitter);
        }
        return emitter;
    }

    /**
     * AnimationService에서 호출하는 메서드
     * 모든 구독 중인 클라이언트에게 동일한 데이터를 전송
     * @param data 전송할 데이터 : 텔레그래프 위치 코드
     */
    public void broadcast(String data) {
        // emitters 리스트에 있는 모든 Emitter를 순회하며 데이터를 전송
        emitters.forEach(emitter -> {
            try {
                // 'telegraph-update'라는 이벤트 이름으로 데이터를 전송
                emitter.send(SseEmitter.event().name("telegraph-update").data(data));
            } catch (IOException e) {
                // 데이터를 보내는 도중 클라이언트와의 연결이 끊어졌을 때 IOException이 발생
                // 이 경우, 더 이상 유효하지 않은 Emitter이므로 리스트에서 제거
                emitters.remove(emitter);
            }
        });
    }
}