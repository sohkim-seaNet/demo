/**
 * Telegraph 애니메이션 스크립트
 *
 * SSE를 통해 서버로부터 실시간으로 Telegraph 위치 데이터를 받아
 * 바늘을 수직 이동시키는 기능 구현
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
     * SSE 연결 설정 및 실시간 데이터 수신
     *
     * EventSource API를 사용하여 서버의 '/subscribe' 엔드포인트에 연결
     * 서버가 'telegraph-update' 이벤트를 보낼 때마다 바늘을 업데이트
     */

    // 1. SSE 연결 생성 (/subscribe 엔드포인트)
    const eventSource = new EventSource('/subscribe');

    // 2. 'telegraph-update' 이벤트 리스너 등록
    // 서버에서 새로운 Telegraph 위치가 전송될 때마다 실행
    eventSource.addEventListener('telegraph-update', function(event) {
        // event.data에 서버가 보낸 실제 데이터(텔레그래프 위치 코드)가 담겨 있음
        const newPosition = event.data;
        console.log("새로운 데이터 수신:", newPosition);

        // 수신한 데이터로 바늘을 이동시키는 함수를 호출
        moveTelegraphVertical(newPosition);
    });

    // 3. 연결 성공 이벤트
    eventSource.onopen = function(event) {
        console.log("SSE 연결 성공!");
    };

    // 4. 에러 처리
    eventSource.onerror = function(error) {
        console.error("EventSource 에러 발생:", error);
    };

});