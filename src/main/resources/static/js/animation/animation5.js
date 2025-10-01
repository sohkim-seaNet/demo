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

    /**
     * 2) 텔레그래프 바늘을 특정 위치로 이동시키는 함수
     * @param {string} pos - 서버로부터 받은 위치 코드 (예: "5", "11")
     */
    function moveTelegraphVertical(pos) {
        const needle = document.getElementById('needle');
        const y = TELEGRAPH_Y[pos];
        needle.style.transform = `translateY(${y}px)`;
    }

    /**
     * 3) SSE(Server-Sent Events) 연결을 설정하고 서버로부터 오는 이벤트를 처리
     * SSE는 별도의 라이브러리 없이 브라우저에 내장된 'EventSource' API를 사용
     */

    // 3-1) EventSource 객체 생성 및 서버에 구독 요청
    // 이 코드가 실행되는 즉시, 브라우저는 서버의 '/subscribe' 주소로 연결을 시도
    const eventSource = new EventSource('/subscribe');

    // 3-2) 'telegraph-update' 이벤트 리스너 등록
    // 서버가 'telegraph-update'라는 이름으로 이벤트를 보낼 때마다 이 함수가 실행
    eventSource.addEventListener('telegraph-update', function(event) {
        // event.data에 서버가 보낸 실제 데이터(텔레그래프 위치 코드)가 담겨 있음
        const newPosition = event.data;
        console.log("새로운 데이터 수신:", newPosition);

        // 수신한 데이터로 바늘을 이동시키는 함수를 호출
        moveTelegraphVertical(newPosition);
    });

    // 연결이 처음 성공했을 때 발생하는 'open' 이벤트 처리
    eventSource.onopen = function(event) {
        console.log("SSE 연결 성공!");
    };

    // 에러 발생 시 이벤트 처리
    eventSource.onerror = function(error) {
        console.error("EventSource 에러 발생:", error);
    };

});