/**
 * Wind Indicator 계기판 애니메이션 스크립트
 *
 * SVG 기반 풍향 계기판 바늘 회전 및 방향 텍스트 표시
 */

// ==================== 설정 상수 ====================
const DEFAULT_CONFIG = { minValue: 0, maxValue: 360, minAngle: 0, maxAngle: 360 };
const API_ENDPOINT = '/api/animation/WIND_INDICATOR';

// ==================== 전역 변수 ====================
let gaugeConfig = null;
const windNeedle = document.getElementById('windNeedle');
const windDirectionText = document.getElementById('windDirectionText');

/**
 * Wind Indicator 바늘 회전 및 텍스트 업데이트 함수
 *
 * 입력된 풍향값에 따라 바늘을 회전시키고 방향을 텍스트로 표시
 *
 * @param {number} inputValue - 풍향 각도
 */
function updateWindDirection(inputValue) {
    const angle = valueToAngle(inputValue, gaugeConfig);

    // SVG 바늘 회전 (SVG 좌표계 기준 회전축)
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
        // 1. DB에서 게이지 설정 정보 로드
        gaugeConfig = await loadGaugeConfig(API_ENDPOINT, DEFAULT_CONFIG);

        // 2. 초기 방향을 0도(북쪽)로 설정
        updateWindDirection(gaugeConfig.minValue);

        // 3. 입력 이벤트 리스너 등록
        setupGaugeEvents('#windDirectionInput', '#updateWindBtn', updateWindDirection);

        console.log('[True Wind] 게이지 초기화 완료');
    } catch (error) {
        console.error('[True Wind] 초기화 실패:', error);
    }
});