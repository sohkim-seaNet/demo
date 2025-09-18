// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {

    // 중복확인 상태 및 타이머
    let userIdChecked = false;
    let nicknameChecked = false;
    let userIdTimer = null;
    let nicknameTimer = null;

    // 1. 아이디 자동 중복확인
    document.getElementById('userId')?.addEventListener('input', (e) => {
        const userId = e.target.value.trim();
        const checkDiv = document.getElementById('userIdCheck');

        userIdChecked = false;

        // 기존 타이머 클리어
        if (userIdTimer) clearTimeout(userIdTimer);

        if (!userId) {
            checkDiv.innerHTML = '';
            return;
        }

        // 체크 중 표시
        checkDiv.innerHTML = '<span class="text-muted">확인 중... <span class="spinner-border spinner-border-sm"></span></span>';

        // 0.5초 후 중복확인 실행
        userIdTimer = setTimeout(async () => {
            try {
                const response = await fetch('/api/user/check-userid', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: userId })
                });

                if (!response.ok) throw new Error('아이디 중복확인 실패');

                const exists = await response.json();

                if (exists) {
                    checkDiv.innerHTML = '<span class="text-danger">❌ 이미 사용중인 아이디입니다.</span>';
                    userIdChecked = false;
                } else {
                    checkDiv.innerHTML = '<span class="text-success">✅ 사용 가능한 아이디입니다.</span>';
                    userIdChecked = true;
                }

            } catch (error) {
                console.error('아이디 중복확인 에러:', error);
                checkDiv.innerHTML = '<span class="text-danger">⚠️ 확인 중 오류가 발생했습니다.</span>';
                userIdChecked = false;
            }
        }, 500); // 0.5초 딜레이
    });

    // 2. 닉네임 자동 중복확인
    document.getElementById('nickname')?.addEventListener('input', (e) => {
        const nickname = e.target.value.trim();
        const checkDiv = document.getElementById('nicknameCheck');

        nicknameChecked = false;

        // 기존 타이머 클리어
        if (nicknameTimer) clearTimeout(nicknameTimer);

        if (!nickname) {
            checkDiv.innerHTML = '';
            return;
        }

        // 체크 중 표시
        checkDiv.innerHTML = '<span class="text-muted">확인 중... <span class="spinner-border spinner-border-sm"></span></span>';

        // 0.5초 후 중복확인 실행
        nicknameTimer = setTimeout(async () => {
            try {
                const response = await fetch('/api/user/check-nickname', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nickname: nickname })
                });

                if (!response.ok) throw new Error('닉네임 중복확인 실패');

                const exists = await response.json();

                if (exists) {
                    checkDiv.innerHTML = '<span class="text-danger">❌ 이미 사용중인 닉네임입니다.</span>';
                    nicknameChecked = false;
                } else {
                    checkDiv.innerHTML = '<span class="text-success">✅ 사용 가능한 닉네임입니다.</span>';
                    nicknameChecked = true;
                }

            } catch (error) {
                console.error('닉네임 중복확인 에러:', error);
                checkDiv.innerHTML = '<span class="text-danger">⚠️ 확인 중 오류가 발생했습니다.</span>';
                nicknameChecked = false;
            }
        }, 500); // 0.5초 딜레이
    });

    // 3. 비밀번호 확인 실시간 체크
    function checkPasswordMatch() {
        const userPwd = document.getElementById('userPwd').value;
        const confirmPwd = document.getElementById('confirmPwd').value;
        const checkDiv = document.getElementById('passwordCheck');

        if (confirmPwd === '') {
            checkDiv.innerHTML = '';
            return;
        }

        if (userPwd === confirmPwd) {
            checkDiv.innerHTML = '<span class="text-success">✅ 비밀번호가 일치합니다.</span>';
        } else {
            checkDiv.innerHTML = '<span class="text-danger">❌ 비밀번호가 일치하지 않습니다.</span>';
        }
    }

    document.getElementById('userPwd')?.addEventListener('input', checkPasswordMatch);
    document.getElementById('confirmPwd')?.addEventListener('input', checkPasswordMatch);

    // 4. 회원가입 제출
    document.getElementById('btnSubmit')?.addEventListener('click', async (e) => {
        e.preventDefault();

        // 유효성 검증
        const userId = document.getElementById('userId').value.trim();
        const userNm = document.getElementById('userNm').value.trim();
        const nickname = document.getElementById('nickname').value.trim();
        const userPwd = document.getElementById('userPwd').value.trim();
        const confirmPwd = document.getElementById('confirmPwd').value.trim();

        if (!userId) {
            showAlert('아이디를 입력해주세요.');
            return;
        }

        if (!userNm) {
            showAlert('이름을 입력해주세요.');
            return;
        }

        if (!nickname) {
            showAlert('닉네임을 입력해주세요.');
            return;
        }

        if (!userPwd) {
            showAlert('비밀번호를 입력해주세요.');
            return;
        }

        if (userPwd !== confirmPwd) {
            showAlert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 자동 중복확인 결과 체크
        if (!userIdChecked) {
            showAlert('아이디를 다시 확인해주세요.');
            return;
        }

        if (!nicknameChecked) {
            showAlert('닉네임을 다시 확인해주세요.');
            return;
        }

        // 회원가입 API 호출
        try {
            const userData = {
                userId: userId,
                userNm: userNm,
                nickname: nickname,
                userPwd: userPwd
            };

            const response = await fetch('/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) throw new Error('회원가입 실패');

            showAlert('회원가입이 완료되었습니다.', 'Success', () => {
                window.location.href = 'user/login';
            });

        } catch (error) {
            console.error('회원가입 에러:', error);
            showAlert('회원가입에 실패했습니다. 다시 시도해주세요.', 'Error');
        }
    });
});
