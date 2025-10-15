/**
 * Telegraph 애니메이션 스크립트 (WebSocket + STOMP 방식)
 *
 * WebSocket과 STOMP 프로토콜을 사용하여 서버로부터 실시간으로
 * Telegraph 위치 데이터를 받아 바늘을 수직 이동시키는 기능 구현
 *
 */
document.addEventListener('DOMContentLoaded', () => {

    // ==================== 설정 상수 ====================
    // 각 위치 코드별 Y축 이동 거리 (px)
    const TELEGRAPH_Y = {
        "5":   -280,
        "4":   -228,
        "3":   -170,
        "2":   -112,
        "1":   -54,
        "0":   0,
        "11":   58,
        "12":   116,
        "13":   174,
        "14":   232,
        "15":   290
    };

    /**
     * Telegraph 바늘 수직 이동 함수
     *
     * @param {string} pos - 위치 코드
     */
    function moveTelegraphVertical(pos) {
        const needle = document.getElementById('needle');
        const y = TELEGRAPH_Y[pos];
        needle.style.transform = `translateY(${y}px)`;
    }

    /**
     * WebSocket + STOMP 연결 설정 함수
     *
     * SockJS를 통해 WebSocket 연결을 생성하고
     * STOMP 프로토콜로 메시지 브로커와 통신
     */
    function connect() {
        // 1. SockJS를 통해 WebSocket 연결 생성
        // '/ws' 엔드포인트로 연결
        const socket = new SockJS('/ws');

        // 2. STOMP 클라이언트 생성
        // SockJS 연결 위에 STOMP 프로토콜 적용
        const stompClient = Stomp.over(socket);

        // 3. STOMP 서버에 연결
        stompClient.connect({}, function (frame) {
            console.log('STOMP Connected: ' + frame);

            // 4. '/topic/telegraph' 주제 구독
            // 서버가 이 주제로 메시지를 발행하면 콜백 함수 실행
            stompClient.subscribe('/topic/telegraph', function (message) {
                // 5. 메시지 수신 시 바늘 이동
                const newPosition = message.body;
                console.log("새로운 데이터 수신:", newPosition);
                moveTelegraphVertical(newPosition);
            });
        }, function(error) {
            // 연결 실패 시 에러 로그 출력 후 5초 후 재연결 시도
            console.error('STOMP connection error:', error);
            setTimeout(connect, 5000);
        });
    }

    // 페이지 로드 시 WebSocket 연결 시작
    connect();
});