let alertModalInstance;

window.addEventListener('DOMContentLoaded', () => {
    const alertModalEl = document.getElementById('alertModal');
    if (alertModalEl) {
        alertModalInstance = new bootstrap.Modal(alertModalEl);
    }
});

/**
 * 사용자에게 알림 메시지를 표시하는 모달 함수
 * @param {string} message - 사용자에게 보여줄 메시지 내용
 * @param {string} title - 모달 제목 (기본값 '알림')
 * @param {function|null} callback - 모달 닫힌 후 실행할 콜백 함수 (선택사항)
 */
function showAlert(message, title = '알림', callback = null) {
    // 모달의 타이틀 영역 텍스트 설정
    document.getElementById('alertModalTitle').innerText = title;
    // 모달 바디 영역에 메시지 출력
    document.getElementById('alertModalBody').innerText = message;

    // 모달 푸터 영역 내용을 확인 버튼 하나로 교체
    document.getElementById('alertModalFooter').innerHTML =
        '<button type="button" class="btn btn-primary" id="alertModalOk">확인</button>';

    const okBtn = document.getElementById('alertModalOk');
    okBtn.onclick = () => {
        alertModalInstance.hide();

        alertModalInstance._element.addEventListener('hidden.bs.modal', function handler() {
            alertModalInstance._element.removeEventListener('hidden.bs.modal', handler);
            if (callback) callback();
        });
    };

    // 모달 화면에 표시
    alertModalInstance.show();
}

/**
 * 사용자에게 확인/취소 선택지를 보여주는 모달 함수
 * @param {string} message - 모달에 표시할 메시지
 * @param {string} title - 모달 타이틀 (기본값 '확인')
 * @param {function|null} okCallback - 확인 버튼 클릭 시 실행할 콜백 함수
 * @param {function|null} cancelCallback - 취소 버튼 클릭 시 실행할 콜백 함수
 */
function showConfirm(message, title = '확인', okCallback = null, cancelCallback = null) {
    // 모달 타이틀 영역 텍스트 설정
    document.getElementById('alertModalTitle').innerText = title;
    // 모달 본문에 메시지 출력
    document.getElementById('alertModalBody').innerText = message;

    // 모달 푸터에 확인, 취소 버튼 생성
    document.getElementById('alertModalFooter').innerHTML =
        '<button type="button" class="btn btn-primary" id="alertModalYes">확인</button>' +
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="alertModalNo">취소</button>';

    const yesBtn = document.getElementById('alertModalYes');
    const noBtn = document.getElementById('alertModalNo');

    yesBtn.onclick = () => {
        alertModalInstance.hide();

        alertModalInstance._element.addEventListener('hidden.bs.modal', function handler() {
            alertModalInstance._element.removeEventListener('hidden.bs.modal', handler);
            if (okCallback) okCallback();
        });
    };

    noBtn.onclick = () => {
        alertModalInstance.hide();

        alertModalInstance._element.addEventListener('hidden.bs.modal', function handler() {
            alertModalInstance._element.removeEventListener('hidden.bs.modal', handler);
            if (cancelCallback) cancelCallback();
        });
    };

    // 모달 화면에 표시
    alertModalInstance.show();
}
