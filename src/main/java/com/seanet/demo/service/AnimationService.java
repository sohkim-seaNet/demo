package com.seanet.demo.service;

import com.seanet.demo.mappers.sub.DummyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

/**
 * SSE 애니메이션 데이터 전송 서비스
 *
 * Sub DB의 Telegraph 테이블을 주기적으로 폴링하여
 * 변경된 주문 번호를 모든 연결된 클라이언트에게 실시간 전송
 */
@Service
@RequiredArgsConstructor
public class AnimationService {

    private final DummyMapper dummyMapper;
    private final SseService sseService;

    // 중복 전송 방지용: 마지막으로 브로드캐스트한 주문 번호 저장
    private Integer lastOrder = null;

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

            // 3. 문자열로 변환 후 SSE 브로드캐스트
            String formattedOrder = String.valueOf(latestOrder);
            sseService.broadcast(formattedOrder);
        }
    }
}
