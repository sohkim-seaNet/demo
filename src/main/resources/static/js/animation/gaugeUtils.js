/**
 * 게이지 애니메이션 공통 유틸리티 함수
 *
 * 여러 게이지(Pitch, Roll, Rudder 등)에서 공통으로 사용하는 헬퍼 함수 모음
 */

/**
 * API에서 게이지 설정 정보 로드
 * DB에서 계기판 설정값을 조회
 *
 * @param {string} apiEndpoint - 게이지 설정 API URL
 * @param {Object} defaultConfig - API 호출 실패 시 사용할 기본 설정
 * @returns {Promise<Object>} 게이지 설정 객체
 */
async function loadGaugeConfig(apiEndpoint, defaultConfig) {
    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        return {
            minValue: parseFloat(data.minValue),
            maxValue: parseFloat(data.maxValue),
            minAngle: parseFloat(data.minAngle),
            maxAngle: parseFloat(data.maxAngle)
        };
    } catch (error) {
        console.error('DB 조회 실패, 기본값 사용:', error);
        return defaultConfig;
    }
}

/**
 * 값을 지정된 범위 내로 제한
 *
 * 입력값이 최소/최대 범위를 벗어나지 않도록 보정
 *
 * @param {number} value - 제한할 값
 * @param {number} min - 최소값
 * @param {number} max - 최대값
 * @returns {number} 범위 내로 제한된 값
 */
function clampValue(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

/**
 * 입력값을 게이지 회전 각도로 변환
 *
 * 입력값 범위를 각도 범위로 매핑
 *
 * @param {number} value - 변환할 입력값
 * @param {Object} gaugeConfig - 게이지 설정 객체
 * @returns {number} 계산된 회전 각도
 */
function valueToAngle(value, gaugeConfig) {
    const { minValue, maxValue, minAngle, maxAngle } = gaugeConfig;
    const clampedValue = clampValue(value, minValue, maxValue);

    return ( (clampedValue - minValue) / (maxValue - minValue) ) * (maxAngle - minAngle) + minAngle;
}

/**
 * 입력 필드와 버튼에 이벤트 리스너 설정
 *
 * 버튼 클릭 또는 Enter 키 입력 시 콜백 함수를 실행
 *
 * @param {string} inputSelector - 입력 필드 CSS 선택자
 * @param {string} buttonSelector - 버튼 CSS 선택자
 * @param {Function} updateCallback - 값 업데이트 시 호출될 콜백 함수
 */
function setupGaugeEvents(inputSelector, buttonSelector, updateCallback) {
    const input = document.querySelector(inputSelector);
    const button = document.querySelector(buttonSelector);

    // 버튼 클릭 시 입력값 읽어서 콜백 실행
    button.addEventListener('click', () => {
        const value = parseFloat(input.value) || 0;
        updateCallback(value);
    });

    // Enter 키 입력 시 버튼 클릭과 동일하게 동작
    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            button.click();
        }
    });
}