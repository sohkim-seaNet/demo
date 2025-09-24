// 제어할 요소 선언
let gaugeConfig = null;
const needle = document.querySelector('.gauge-needle');
const angleInput = document.querySelector('#angle-input');
const submitButton = document.querySelector('#angle-submit-btn');

// 페이지 로딩 시 실행
document.addEventListener('DOMContentLoaded', async function() {
    // DB에서 게이지 정보 가져오기
    try {
        const response = await fetch('/api/animation/DEG_PITCH');
        const data = await response.json();
        console.log(data);

        gaugeConfig = {
            minValue: parseFloat(data.minValue),  // 예: -40
            maxValue: parseFloat(data.maxValue),  // 예: 40
            minAngle: parseFloat(data.minAngle),  // 예: -120 (CSS 각도)
            maxAngle: parseFloat(data.maxAngle)   // 예: 120 (CSS 각도)
        };
    } catch (error) {
        console.error('DB 조회 실패, 기본값 사용:', error);
        // 기본값 사용 (기존 하드코딩 값)
        gaugeConfig = {
            minValue: -40,
            maxValue: 40,
            minAngle: -120,  // -40 * 3
            maxAngle: 120    // 40 * 3
        };
    }

    // 초기 각도를 0으로 설정
    setAngle(0);
});

/**
 * 바늘을 지정된 각도로 회전시키는 함수
 * @param degree - 회전시킬 각도 (예: 20, -30)
 */
function setAngle(degree) {

    const MIN_VALUE = gaugeConfig.minValue;
    const MAX_VALUE = gaugeConfig.maxValue;
    const MIN_ANGLE = gaugeConfig.minAngle;
    const MAX_ANGLE = gaugeConfig.maxAngle;

    // 게이지의 최소/최대값을 벗어나지 않도록 값을 보정
    const clampedValue = Math.max(MIN_VALUE, Math.min(MAX_VALUE, degree));

    // 입력값을 CSS 각도로 변환 (비례 계산)
    const cssAngle = ((clampedValue - MIN_VALUE) / (MAX_VALUE - MIN_VALUE)) * (MAX_ANGLE - MIN_ANGLE) + MIN_ANGLE;

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

    // 중앙 정렬을 유지하면서, 입력받은 각도(degree)만큼 회전
    needle.style.transform = `translateX(-50%) rotate(${cssAngle}deg)`;
    console.log(`입력값: ${degree} -> 보정값: ${clampedValue} -> CSS 회전각: ${cssAngle}deg`);
}

// 적용 버튼에 클릭 이벤트 추가
submitButton.addEventListener('click', () => {
    // 입력창(input)에 있는 값을 가져옴
    const inputValue = angleInput.value;

    // 가져온 값(문자열)을 숫자(정수)로 변환
    const degree = parseInt(inputValue, 10);

    // 변환된 숫자 값으로 setAngle 함수를 호출
    setAngle(degree);
});

// Enter 키 지원
angleInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        submitButton.click();
    }
});