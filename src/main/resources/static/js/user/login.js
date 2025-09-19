/**
 * 로그인 페이지 초기화 및 폼 처리
 */
document.addEventListener('DOMContentLoaded', function() {
    // 1. URL 파라미터에서 로그인 실패 여부 체크
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('error') === 'true') {
        // 1-1. DOM 렌더링 완료 후 에러 메시지 표시
        setTimeout(() => {
            showAlert("아이디 또는 비밀번호가 잘못되었습니다.");
        }, 100);
    }

    // 2. 로그인 버튼 이벤트 등록
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault(); // 기본 submit 동작 막기

            // 2-1. 입력값 추출 및 공백 제거
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // 2-2. 유효성 검증
            if (!username || !password) {
                showAlert("아이디와 비밀번호를 모두 입력해주세요.");
                return;
            }

            // 2-3. 유효성 검증 통과 시 Spring Security로 폼 제출
            document.querySelector('form[action="/login"]').submit();
        });
    }
});
