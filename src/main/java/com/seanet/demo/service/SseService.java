package com.seanet.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * SSE 연결 관리 및 실시간 데이터 브로드캐스트 서비스
 *
 * 여러 클라이언트의 SSE 연결을 관리하고,
 * 특정 이벤트 발생 시 모든 클라이언트에게 동시 전송
 */
@Service
public class SseService {

    // 연결된 모든 클라이언트(Emitter)를 저장
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    /**
     * 새로운 클라이언트의 SSE 연결 생성 및 등록
     *
     * @return SseEmitter 생성된 SSE 연결 객체
     */
    public SseEmitter addEmitter() {
        // 1. SseEmitter 객체 생성. 타임아웃을 최대값으로 설정하여 장시간 연결 유지
        //    만약 타임아웃이 발생하면, 브라우저는 자동으로 서버에 재연결을 시도
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);

        // 2. Emitter가 만료(complete), 타임아웃, 에러 등으로 종료될 때,
        //    반드시 emitters 리스트에서 제거되도록 콜백 함수 등록
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((e) -> emitters.remove(emitter));

        // 3. 생성된 Emitter를 리스트에 추가
        emitters.add(emitter);

        // 4. 클라이언트에게 연결 성공 메시지 전송 (이벤트명: 'connect')
        try {
            emitter.send(SseEmitter.event().name("connect").data("!!Connected!!"));
        } catch (IOException e) {
            // 초기 연결 실패 시 즉시 제거
            emitters.remove(emitter);
        }
        return emitter;
    }

    /**
     * 모든 연결된 클라이언트에게 데이터 브로드캐스트
     *
     * AnimationService에서 새로운 Telegraph 위치 코드 발생 시 호출
     *
     * @param data 전송할 데이터 : 텔레그래프 위치 코드(_order)
     */
    public void broadcast(String data) {
        // emitters 리스트에 있는 모든 Emitter를 순회하며 데이터를 전송
        emitters.forEach(emitter -> {
            try {
                // 'telegraph-update'라는 이벤트 이름으로 데이터를 전송
                emitter.send(SseEmitter.event().name("telegraph-update").data(data));
            } catch (IOException e) {
                // 전송 실패 시 해당 클라이언트 제거 (연결 끊김)
                emitters.remove(emitter);
            }
        });
    }
}