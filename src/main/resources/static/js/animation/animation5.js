// 1) 각 위치별 Y 오프셋만 정의
const TELEGRAPH_Y = {
    "05":   -280,
    "04":   -228,
    "03":   -170,
    "02":   -112,
    "01":   -54,
    "00":   0,
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

document.addEventListener('DOMContentLoaded', () => {
    // 대상 코드 배열
    const CODES = ["05","04","03","02","01","00","11","12","13","14","15"];

    // 2초 간격으로 랜덤 호출
    setInterval(() => {
        const code = CODES[Math.floor(Math.random() * CODES.length)];
        moveTelegraphVertical(code);
    }, 2000);
});
