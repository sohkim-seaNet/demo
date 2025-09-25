// ==================== 설정 상수 ====================
const DEFAULT_CONFIG = { minValue: 0, maxValue: 360, minAngle: 0, maxAngle: 360 };
const API_ENDPOINT = '/api/animation/WIND_INDICATOR';

// ==================== 전역 변수 ====================
let gaugeConfig = null;
const windNeedle = document.getElementById('windNeedle');
const windDirectionText = document.getElementById('windDirectionText');

/**
 * Wind Indicator 게이지 바늘 회전 함수
 */
function updateWindDirection(inputValue) {
    const angle = valueToAngle(inputValue, gaugeConfig);

    // 바늘 회전 (SVG 중심점 기준)
    windNeedle.style.transformOrigin = '184.59px 223.09px';
    windNeedle.style.transform = `rotate(${angle}deg)`;

    // 방향 텍스트 업데이트
    windDirectionText.textContent = inputValue.toFixed(2) + '˚';
}

/**
 * 페이지 로딩 완료 시 True Wind 게이지 초기화 실행
 */
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // 게이지 설정 정보 로드
        gaugeConfig = await loadGaugeConfig(API_ENDPOINT, DEFAULT_CONFIG);

        // 초기 방향을 0도(북쪽)로 설정
        updateWindDirection(gaugeConfig.minValue);

        // 입력 이벤트 리스너 등록 (입력창, 버튼, Enter 키)
        setupGaugeEvents('#windDirectionInput', '#updateWindBtn', updateWindDirection);

        console.log('[True Wind] 게이지 초기화 완료');
    } catch (error) {
        console.error('[True Wind] 초기화 실패:', error);
    }
});