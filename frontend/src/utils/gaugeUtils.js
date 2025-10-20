/** ====================================
 * 게이지 애니메이션 공통 유틸리티 함수
 * ===================================*/

/**
 * API에서 게이지 설정 정보를 가져오는 함수
 * @param apiEndpoint - 게이지 설정 API URL
 * @param defaultConfig - API 호출 실패 시 사용할 기본 설정
 */
export async function loadGaugeConfig(apiEndpoint, defaultConfig) {
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
 * 값을 지정된 범위 내로 제한하는 함수
 * @param value - 제한할 값
 * @param min - 최소값
 * @param max - 최대값
 * @returns 범위 내로 제한된 값
 */
export function clampValue(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

/**
 * 입력값을 게이지 회전각으로 변환하는 함수
 * @param value - 변환할 입력값
 * @param gaugeConfig - 게이지 설정 객체
 * @returns 계산된 회전각도
 */
export function valueToAngle(value, gaugeConfig) {
    const { minValue, maxValue, minAngle, maxAngle } = gaugeConfig;
    const clampedValue = clampValue(value, minValue, maxValue);

    return ( (clampedValue - minValue) / (maxValue - minValue) ) * (maxAngle - minAngle) + minAngle;
}

/**
 * 입력 필드와 버튼에 공통 이벤트 리스너를 설정하는 함수
 * @param inputSelector - 입력 필드 CSS 선택자
 * @param buttonSelector - 버튼 CSS 선택자
 * @param updateCallback - 값 업데이트 시 호출될 콜백 함수
 */
function setupGaugeEvents(inputSelector, buttonSelector, updateCallback) {
    const input = document.querySelector(inputSelector);
    const button = document.querySelector(buttonSelector);

    button.addEventListener('click', () => {
        const value = parseFloat(input.value) || 0;
        updateCallback(value);
    });

    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            button.click();
        }
    });
}