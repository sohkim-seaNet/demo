/**
 * Bootstrap 모달 기반 알림/확인
 * 브라우저 기본 alert(), confirm() 대체용 커스텀 모달
 */
let alertModalInstance; // Bootstrap Modal 인스턴스 전역 변수

/**
 * Bootstrap Modal 인스턴스 초기화
 */
window.addEventListener('DOMContentLoaded', () => {
    const alertModalEl = document.getElementById('alertModal');
    if (alertModalEl) {
        alertModalInstance = new bootstrap.Modal(alertModalEl);
    }
});

/**
 * 사용자에게 알림 메시지를 표시하는 모달 함수
 * @param message - 사용자에게 보여줄 메시지 내용
 * @param title - 모달 제목 (기본값 '알림')
 * @param callback - 모달 닫힌 후 실행할 콜백 함수 (선택)
 */
function showAlert(message, title = '알림', callback = null) {
    // 1. 모달 내용 구성
    document.getElementById('alertModalTitle').innerText = title;
    document.getElementById('alertModalBody').innerText = message;
    document.getElementById('alertModalFooter').innerHTML =
        '<button type="button" class="btn btn-primary" id="alertModalOk">확인</button>';

    // 2. 확인 버튼 이벤트 처리
    const okBtn = document.getElementById('alertModalOk');
    okBtn.onclick = () => {
        // 2-1. 모달 숨기기
        alertModalInstance.hide();
        // 2-2. 모달 완전히 숨겨진 후 콜백 실행
        alertModalInstance._element.addEventListener('hidden.bs.modal', function handler() {
            alertModalInstance._element.removeEventListener('hidden.bs.modal', handler);
            if (callback) callback();
        });
    };

    // 3. 모달 표시
    alertModalInstance.show();
}

/**
 * 사용자에게 확인/취소 선택지를 보여주는 모달 함수
 * @param message - 모달에 표시할 메시지
 * @param title - 모달 타이틀 (기본값 '확인')
 * @param okCallback - 확인 버튼 클릭 시 실행할 콜백 함수
 * @param cancelCallback - 취소 버튼 클릭 시 실행할 콜백 함수
 */
function showConfirm(message, title = '확인', okCallback = null, cancelCallback = null) {
    // 1. 모달 내용 구성
    document.getElementById('alertModalTitle').innerText = title;
    document.getElementById('alertModalBody').innerText = message;
    document.getElementById('alertModalFooter').innerHTML =
        '<button type="button" class="btn btn-primary" id="alertModalYes">확인</button>' +
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="alertModalNo">취소</button>';

    // 2. 버튼 요소 참조
    const yesBtn = document.getElementById('alertModalYes');
    const noBtn = document.getElementById('alertModalNo');

    // 3. 확인 버튼 이벤트 처리
    yesBtn.onclick = () => {
        // 3-1. 모달 숨기기
        alertModalInstance.hide();
        // 3-2. 모달 완전히 숨겨진 후 확인 콜백 실행
        alertModalInstance._element.addEventListener('hidden.bs.modal', function handler() {
            alertModalInstance._element.removeEventListener('hidden.bs.modal', handler);
            if (okCallback) okCallback();
        });
    };

    // 4. 취소 버튼 이벤트 처리
    noBtn.onclick = () => {
        // 3-1. 모달 숨기기
        alertModalInstance.hide();
        // 4-2. 모달 완전히 숨겨진 후 취소 콜백 실행
        alertModalInstance._element.addEventListener('hidden.bs.modal', function handler() {
            alertModalInstance._element.removeEventListener('hidden.bs.modal', handler);
            if (cancelCallback) cancelCallback();
        });
    };

    // 5. 모달 표시
    alertModalInstance.show();
}
