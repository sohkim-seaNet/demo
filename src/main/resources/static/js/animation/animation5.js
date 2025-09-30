document.addEventListener('DOMContentLoaded', () => {

    // 1) 각 위치별 Y 오프셋만 정의
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

    // 2) 이동 함수: translateY만 적용
    function moveTelegraphVertical(pos) {
        const needle = document.getElementById('needle');
        const y = TELEGRAPH_Y[pos];
        needle.style.transform = `translateY(${y}px)`;
    }

    // 3) Stomp 클라이언트 설정 및 연결 함수
    function connect() {
        // 서버의 WebSocket 엔드포인트(/ws)로 SockJS 연결을 생성
        const socket = new SockJS('/ws');
        const stompClient = Stomp.over(socket);

        // STOMP 프로토콜을 통해 서버에 연결
        stompClient.connect({}, function (frame) {
            console.log('STOMP Connected: ' + frame);

            // 서버로부터 메시지를 받을 주제("/topic/telegraph")를 구독
            stompClient.subscribe('/topic/telegraph', function (message) {
                // 서버에서 메시지가 오면, 메시지 본문(body)을 가져와서 애니메이션 함수를 호출
                const newPosition = message.body;
                console.log("새로운 데이터 수신:", newPosition);
                moveTelegraphVertical(newPosition);
            });
        }, function(error) {
            // 연결 실패 시 에러를 로그에 남기고, 5초 후 재연결 시도
            console.error('STOMP connection error:', error);
            setTimeout(connect, 5000);
        });
    }

    // 페이지가 로드되면 WebSocket 연결
    connect();
});