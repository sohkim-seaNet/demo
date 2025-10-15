/**
 * Pitch 계기판 애니메이션 스크립트
 *
 * 사용자 입력값에 따라 계기판 바늘을 회전시키는 기능 제공
 */

// ==================== 설정 상수 ====================
const DEFAULT_CONFIG = { minValue: -40, maxValue: 40, minAngle: -120, maxAngle: 120 };
const API_ENDPOINT = '/api/animation/DEG_PITCH';

// ==================== 전역 변수 ====================
let gaugeConfig = null;
const needle = document.querySelector('.gauge-needle'); // 회전할 바늘 요소

/**
 * Pitch 바늘 회전 함수
 *
 * 입력된 degree 값을 각도로 변환하여 바늘을 회전
 * translateX(-50%)로 중앙 정렬을 유지
 *
 * @param {number} degree - 회전할 각도 값
 */
function setAngle(degree) {
    const angle = valueToAngle(degree, gaugeConfig);
    needle.style.transform = `translateX(-50%) rotate(${angle}deg)`;
}

/**
 * 페이지 로딩 완료 시 Pitch 게이지 초기화 실행
 */
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // 1. DB에서 게이지 설정 정보 로드 (실패 시 DEFAULT_CONFIG 사용)
        gaugeConfig = await loadGaugeConfig(API_ENDPOINT, DEFAULT_CONFIG);

        // 2. 초기 각도를 0도(중앙)로 설정
        setAngle(0);

        // 3. 입력 이벤트 리스너 등록
        setupGaugeEvents('#angle-input', '#angle-submit-btn', setAngle);

        console.log('[Pitch] 게이지 초기화 완료');
    } catch (error) {
        console.error('[Pitch] 초기화 실패:', error);
    }
});

/*
       // [변경] GSAP를 사용해 애니메이션 적용
       // gsap.to(타겟, {애니메이션 속성});
       gsap.to(needle, {
           rotation: cssAngle,   // 'transform: rotate()'
           duration: 0.5,        // 애니메이션 지속 시간
           ease: 'bounce.out',   // 옵션
           transformOrigin: "50% 85%" // 회전축을 다시 명시
       });
*/