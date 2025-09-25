// ==================== 설정 상수 ====================
const DEFAULT_CONFIG = { minValue: 0, maxValue: 800, minAngle: -90, maxAngle: 90 };
const API_ENDPOINT = '/api/animation/THRUSTER_GAUGE';

// ==================== 전역 변수 ====================
let gaugeConfig = null;
const needle = document.getElementById('needle');

/**
 * SVG 게이지 바늘 회전 함수
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
        // 게이지 설정 정보 로드
        gaugeConfig = await loadGaugeConfig(API_ENDPOINT, DEFAULT_CONFIG);

        // SVG 바늘의 회전 중심점 설정 (SVG 좌표계 기준)
        needle.style.transformOrigin = '299.14px 261.73px';

        // 초기값을 최소값(0)으로 설정
        updateGauge(gaugeConfig.minValue);

        // 입력 이벤트 리스너 등록
        setupGaugeEvents('#valueInput', '#updateButton', updateGauge);

        console.log('[Thruster] 게이지 초기화 완료');
    } catch (error) {
        console.error('[Thruster] 초기화 실패:', error);
    }
});
