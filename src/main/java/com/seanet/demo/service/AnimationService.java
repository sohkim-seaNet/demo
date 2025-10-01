package com.seanet.demo.service;

import com.seanet.demo.mappers.sub.DummyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

/**
 * 주기적으로 데이터베이스를 확인하여
 * 애니메이션에 필요한 데이터를 SSE로 전송하도록 요청하는 서비스
 */
@Service
@RequiredArgsConstructor
public class AnimationService {

    @Autowired
    private final DummyMapper dummyMapper;
    @Autowired
    private final SseService sseService;
    private Integer lastOrder = null; // (중복 전송 방지) 마지막으로 전송한 값을 저장하기 위한 변수

    /**
     * 2초마다 데이터베이스를 확인하여 최신 _order 값을 클라이언트로 전송
     */
    @Scheduled(fixedRate = 2000)
    public void checkAndBroadcastLatestOrder() {
        // 1) 가장 최근의 _order 값을 조회
        Integer latestOrder = dummyMapper.findLatestTelegraphOrder();

        // 2) 조회된 값이 있고, 이전에 보냈던 값과 다를 경우에만 메시지를 전송
        if (latestOrder != null && !latestOrder.equals(lastOrder)) {
            this.lastOrder = latestOrder;

            // 2-1) DB 값을 문자열 코드로 변환
            String formattedOrder = String.valueOf(latestOrder);

            // 2-2) SseService에 모든 클라이언트에게 이 값을 전송해달라고 요청
            sseService.broadcast(formattedOrder);
        }
    }
}
