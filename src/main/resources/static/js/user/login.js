document.addEventListener('DOMContentLoaded', function() {
    // URL 파라미터에서 error 체크
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('error') === 'true') {
        setTimeout(() => {
            showAlert("아이디 또는 비밀번호가 잘못되었습니다.");
        }, 100);
    }

    // 로그인 버튼에 클릭 이벤트 리스너 추가
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault(); // 기본 submit 동작 막기

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // 유효성 검증
            if (!username || !password) {
                showAlert("아이디와 비밀번호를 모두 입력해주세요.");
                return;
            }

            // 유효성 검증 통과 시 폼 제출
            document.querySelector('form[action="/login"]').submit();
        });
    }
});
