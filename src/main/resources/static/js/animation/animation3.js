let currentAngle = 0;

document.addEventListener('DOMContentLoaded', function() {
    const rotatableGroup = document.querySelector('.rotatable-group');
    const angleText = document.querySelector('.b09d5a79-aa13-4213-821d-9a021bfbf0bd');
    const angleInput = document.getElementById('angleInput');
    const btn = document.getElementById('rotateBtn');

    btn.addEventListener('click', function() {
        const inputValue = parseFloat(angleInput.value);
        currentAngle = Math.round(inputValue * 100) / 100;

        // 회전할 그룹만 회전
        rotatableGroup.style.transform = `rotate(${-currentAngle}deg)`;

        // 텍스트 내용만 업데이트
        angleText.textContent = currentAngle.toFixed(2) + '°';
        angleInput.value = currentAngle.toFixed(2);
    });

    angleInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            btn.click();
        }
    });
});