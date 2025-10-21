import React, { useState, useEffect, useRef } from 'react';
import TelegraphGauge from '../../components/svg/TelegraphGauge';

// 텔레그래프 위치별 Y 오프셋 정의
const TELEGRAPH_Y = {
    "5": -280,    // NAV. FULL
    "4": -228,    // FULL
    "3": -170,    // HALF
    "2": -112,    // SLOW
    "1": -54,     // DEAD SLOW
    "0": 0,       // STOP
    "11": 58,     // DEAD SLOW (ASTERN)
    "12": 116,    // SLOW (ASTERN)
    "13": 174,    // HALF (ASTERN)
    "14": 232,    // FULL (ASTERN)
    "15": 290     // CRASH ASTERN
};

function Animation5() {
    const [position, setPosition] = useState("0"); // 현재 위치
    const needleRef = useRef(null);
    const eventSourceRef = useRef(null);

    /**
     * 컴포넌트 마운트 시 SSE 연결
     */
    useEffect(() => {
        // SSE 연결 설정
        const eventSource = new EventSource('/subscribe');
        eventSourceRef.current = eventSource;

        // 연결 성공
        eventSource.onopen = () => {
            console.log("SSE 연결 성공!");
        };

        // telegraph-update 이벤트 수신
        eventSource.addEventListener('telegraph-update', (event) => {
            const newPosition = event.data;
            console.log("새로운 데이터 수신:", newPosition);
            setPosition(newPosition);
        });

        // 에러 처리
        eventSource.onerror = (error) => {
            console.error("EventSource 에러 발생:", error);
        };

        // 컴포넌트 언마운트 시 SSE 연결 종료
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                console.log("SSE 연결 종료");
            }
        };
    }, []);

    /**
     * position 변경 시 바늘 이동
     */
    useEffect(() => {
        if (needleRef.current) {
            const y = TELEGRAPH_Y[position] || 0;
            needleRef.current.style.transform = `translateY(${y}px)`;
            needleRef.current.style.transition = 'transform 0.5s ease-in-out';
        }
    }, [position]);

    return (
        <div className="container mt-5">
            <TelegraphGauge needleRef={needleRef} />

            {/* 현재 위치 표시 (디버깅용 - 필요시 제거) */}
            <div className="text-center mt-3">
                <p>현재 위치: {position}</p>
            </div>
        </div>
    );
}

export default Animation5;
