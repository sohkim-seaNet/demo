/**
 * Thruster 계기판 애니메이션 스크립트
 *
 * SVG 요소로 구현된 계기판 바늘을 회전시키는 기능
 */

// ==================== 설정 상수 ====================
const DEFAULT_CONFIG = { minValue: 0, maxValue: 800, minAngle: -90, maxAngle: 90 };
const API_ENDPOINT = '/api/animation/THRUSTER_GAUGE';

// ==================== 전역 변수 ====================
let gaugeConfig = null;
const needle = document.getElementById('needle');

/**
 * SVG 계기판 바늘 회전 함수
 *
 * 입력값을 각도로 변환하여 SVG 바늘을 회전
 * SVG 요소이므로 transformOrigin을 SVG 좌표계(px)로 직접 지정
 *
 * @param {number} value - 회전할 값 (0 ~ 800)
 */
function updateGauge(value) {
    const angle = valueToAngle(value, gaugeConfig);
    needle.style.transform = `rotate(${angle}deg)`;
}

/**
 * 페이지 로딩 완료 시 Thruster 게이지 초기화 실행
 */
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // 1. DB에서 게이지 설정 정보 로드 (실패 시 DEFAULT_CONFIG 사용)
        gaugeConfig = await loadGaugeConfig(API_ENDPOINT, DEFAULT_CONFIG);

        // 2. SVG 바늘의 회전 중심점 설정
        // SVG 좌표계 기준 좌표 (299.14px, 261.73px)를 회전축으로 사용
        needle.style.transformOrigin = '299.14px 261.73px';

        // 3. 초기값을 최소값(0)으로 설정
        updateGauge(gaugeConfig.minValue);

        // 4. 입력 이벤트 리스너 등록
        setupGaugeEvents('#valueInput', '#updateButton', updateGauge);

        console.log('[Thruster] 게이지 초기화 완료');
    } catch (error) {
        console.error('[Thruster] 초기화 실패:', error);
    }
});
