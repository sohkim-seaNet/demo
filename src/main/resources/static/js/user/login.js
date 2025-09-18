document.addEventListener('DOMContentLoaded', function() {

    // URL 파라미터에서 error 체크 (지연 호출)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('error') === 'true') {
        setTimeout(() => {
            showAlert("아이디 또는 비밀번호가 잘못되었습니다!");
        }, 100);  // 100ms 지연
    }

    // 로그인 폼 유효성 검증
    const loginForm = document.querySelector('form[action="/login"]');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!username || !password) {
                e.preventDefault();
                showAlert("아이디와 비밀번호를 모두 입력해주세요!");
                return false;
            }
        });
    }
});
