/**
 * Gyro 계기판 애니메이션 스크립트
 *
 * 360도 전방위 회전 계기판 구현
 * 회전 그룹 전체를 회전시키고 각도 텍스트를 실시간 업데이트
 */


// ==================== 설정 상수 ====================
const DEFAULT_CONFIG = { minValue: 0, maxValue: 360, minAngle: 0, maxAngle: 360 };
const API_ENDPOINT = '/api/animation/GYRO';

// ==================== 전역 변수 ====================
let gaugeConfig = null;

/**
 * Gyro 게이지 회전 및 텍스트 업데이트 함수
 *
 * 입력값을 각도로 변환하여 회전 그룹을 회전
 *
 * @param {number} inputValue - 회전할 각도 값 (0 ~ 360)
 */
function updateAngle(inputValue) {

    const angle = valueToAngle(inputValue, gaugeConfig);

    // DOM 요소들 참조
    const rotatableGroup = document.querySelector('.rotatable-group');
    const angleText = document.querySelector('.b09d5a79-aa13-4213-821d-9a021bfbf0bd');

    // 회전 그룹에 음수 각도 적용 (시계 반대 방향)
    rotatableGroup.style.transform = `rotate(${-angle}deg)`;

    // 화면에 표시될 각도 텍스트 업데이트
    angleText.textContent = angle + '°';
}

/**
 * 페이지 로딩 완료 시 Gyro 게이지 초기화 실행
 */
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // 1. DB에서 게이지 설정 정보 로드
        gaugeConfig = await loadGaugeConfig(API_ENDPOINT, DEFAULT_CONFIG);

        // 2. 초기 각도를 0도로 설정
        updateAngle(gaugeConfig.minValue);

        // 3. 입력 이벤트 리스너 등록
        setupGaugeEvents('#angleInput', '#rotateBtn', updateAngle);

        console.log('[Gyro] 게이지 초기화 완료');
    } catch (error) {
        console.error('[Gyro] 초기화 실패:', error);
    }
});
