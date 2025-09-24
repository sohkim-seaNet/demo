// 전역 변수
let gaugeConfig = null;
const needle = document.getElementById('needle');
const valueInput = document.getElementById('valueInput');
const updateButton = document.getElementById('updateButton');

// 페이지 로딩 시 실행
document.addEventListener('DOMContentLoaded', async function() {
    // DB에서 게이지 정보 가져오기
    try {
        const response = await fetch('/api/animation/THRUSTER_GAUGE');
        const data = await response.json();
        console.log(data);

        gaugeConfig = {
            minValue: parseFloat(data.minValue),
            maxValue: parseFloat(data.maxValue),
            minAngle: parseFloat(data.minAngle),
            maxAngle: parseFloat(data.maxAngle)
        };
    } catch (error) {
        // 기본값 사용
        gaugeConfig = { minValue: 0, maxValue: 800, minAngle: -90, maxAngle: 90 };
    }

    // 초기 설정
    needle.style.transformOrigin = '299.14px 261.73px';
    updateGauge(gaugeConfig.minValue);
});

// 계기판 업데이트 함수
function updateGauge(value) {
    const MIN_VALUE = gaugeConfig.minValue;
    const MAX_VALUE = gaugeConfig.maxValue;
    const MIN_ANGLE = gaugeConfig.minAngle;
    const MAX_ANGLE = gaugeConfig.maxAngle;

    const clampedValue = Math.max(MIN_VALUE, Math.min(value, MAX_VALUE));
    const angle = ((clampedValue - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * (MAX_ANGLE - MIN_ANGLE) + MIN_ANGLE;

    needle.style.transform = `rotate(${angle}deg)`;
}

// 이벤트 리스너
updateButton.addEventListener('click', () => {
    const value = parseFloat(valueInput.value) || 0;
    updateGauge(value);
});

valueInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        updateButton.click();
    }
});
