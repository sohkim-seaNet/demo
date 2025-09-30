package com.seanet.demo.service;

import com.seanet.demo.mappers.sub.DummyMapper;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class AnimationService {

    private final DummyMapper dummyMapper;
    private final SimpMessagingTemplate messagingTemplate;
    private Integer lastOrder = null; // 마지막으로 전송한 값을 저장하기 위한 변수

    public AnimationService(DummyMapper dummyMapper, SimpMessagingTemplate messagingTemplate) {
        this.dummyMapper = dummyMapper;
        this.messagingTemplate = messagingTemplate;
    }

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

            // 2-2) "/topic/telegraph" 요청한 클라이언트에게 값을 전송
            messagingTemplate.convertAndSend("/topic/telegraph", formattedOrder);
        }
    }

}
