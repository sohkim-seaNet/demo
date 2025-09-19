/**
 * 회원가입 페이지 - 실시간 검증 및 회원가입 처리
 */
document.addEventListener('DOMContentLoaded', function() {

    // 중복확인 상태 및 타이머
    let userIdChecked = false;
    let nicknameChecked = false;
    let userIdTimer = null;
    let nicknameTimer = null;

    /**
     * 1. 아이디 실시간 중복확인
     */
    document.getElementById('userId')?.addEventListener('input', (e) => {
        const userId = e.target.value.trim();
        const checkDiv = document.getElementById('userIdCheck');

        // 1-1. 중복확인 상태 초기화
        userIdChecked = false;

        // 1-2. 기존 타이머 클리어
        if (userIdTimer) {
            clearTimeout(userIdTimer);
        }
        // 1-3. 입력값이 없으면 메시지 제거
        if (!userId) {
            checkDiv.innerHTML = '';
            return;
        }

        // 1-4. 로딩 상태 표시
        checkDiv.innerHTML = '<span class="text-muted">확인 중... <span class="spinner-border spinner-border-sm"></span></span>';

        // 1-5. 0.5초 후 중복확인 실행
        userIdTimer = setTimeout(async () => {
            try {
                // 1-5-1. 아이디 중복확인 API 호출
                const response = await fetch('/api/user/check-userid', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: userId })
                });
                if (!response.ok) throw new Error('아이디 중복확인 실패');

                // 1-5-2. 응답 결과 처리
                const exists = await response.json();

                if (exists) {
                    checkDiv.innerHTML = '<span class="text-danger">❌ 이미 사용중인 아이디입니다.</span>';
                    userIdChecked = false;
                } else {
                    checkDiv.innerHTML = '<span class="text-success">✅ 사용 가능한 아이디입니다.</span>';
                    userIdChecked = true;
                }

            } catch (error) {
                // 1-5-3. 에러 처리
                console.error('아이디 중복확인 에러:', error);
                checkDiv.innerHTML = '<span class="text-danger">⚠️ 확인 중 오류가 발생했습니다.</span>';
                userIdChecked = false;
            }
        }, 500); // 0.5초 딜레이
    });

    /**
     * 2. 닉네임 실시간 중복확인
     */
    document.getElementById('nickname')?.addEventListener('input', (e) => {
        const nickname = e.target.value.trim();
        const checkDiv = document.getElementById('nicknameCheck');

        // 2-1. 중복확인 상태 초기화
        nicknameChecked = false;
        // 2-2. 기존 타이머 클리어
        if (nicknameTimer) {
            clearTimeout(nicknameTimer);
        }
        // 2-3. 입력값이 없으면 메시지 제거
        if (!nickname) {
            checkDiv.innerHTML = '';
            return;
        }

        // 2-4. 로딩 상태 표시
        checkDiv.innerHTML = '<span class="text-muted">확인 중... <span class="spinner-border spinner-border-sm"></span></span>';

        // 2-5. 0.5초 후 중복확인 실행
        nicknameTimer = setTimeout(async () => {
            try {
                // 2-5-1. 닉네임 중복확인 API 호출
                const response = await fetch('/api/user/check-nickname', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nickname: nickname })
                });

                if (!response.ok) throw new Error('닉네임 중복확인 실패');
                // 2-5-2. 응답 결과 처리
                const exists = await response.json();

                if (exists) {
                    checkDiv.innerHTML = '<span class="text-danger">❌ 이미 사용중인 닉네임입니다.</span>';
                    nicknameChecked = false;
                } else {
                    checkDiv.innerHTML = '<span class="text-success">✅ 사용 가능한 닉네임입니다.</span>';
                    nicknameChecked = true;
                }

            } catch (error) {
                // 2-5-3. 에러 처리
                console.error('닉네임 중복확인 에러:', error);
                checkDiv.innerHTML = '<span class="text-danger">⚠️ 확인 중 오류가 발생했습니다.</span>';
                nicknameChecked = false;
            }
        }, 500); // 0.5초 딜레이
    });

    /**
     * 3. 비밀번호 확인 실시간 체크
     */
    function checkPasswordMatch() {
        const userPwd = document.getElementById('userPwd').value;
        const confirmPwd = document.getElementById('confirmPwd').value;
        const checkDiv = document.getElementById('passwordCheck');

        // 3-1. 비밀번호 확인 필드가 비어있으면 메시지 제거
        if (confirmPwd === '') {
            checkDiv.innerHTML = '';
            return;
        }

        // 3-2. 비밀번호 일치 여부 확인
        if (userPwd === confirmPwd) {
            checkDiv.innerHTML = '<span class="text-success">✅ 비밀번호가 일치합니다.</span>';
        } else {
            checkDiv.innerHTML = '<span class="text-danger">❌ 비밀번호가 일치하지 않습니다.</span>';
        }
    }
    // 3-3. 비밀번호 입력 필드에 실시간 검증 이벤트 등록
    document.getElementById('userPwd')?.addEventListener('input', checkPasswordMatch);
    document.getElementById('confirmPwd')?.addEventListener('input', checkPasswordMatch);

    /**
     * 4. 회원가입 제출 처리
     */
    document.getElementById('btnSubmit')?.addEventListener('click', async (e) => {
        e.preventDefault();

        // 4-1. 입력값 추출 및 유효성 검증
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

        // 4-2. 실시간 중복확인 결과 체크
        if (!userIdChecked) {
            showAlert('아이디를 다시 확인해주세요.');
            return;
        }
        if (!nicknameChecked) {
            showAlert('닉네임을 다시 확인해주세요.');
            return;
        }

        // 4-3. 회원가입 API 호출
        try {
            // 4-3-1. 서버로 전송할 사용자 데이터 구성
            const userData = {
                userId: userId,
                userNm: userNm,
                nickname: nickname,
                userPwd: userPwd
            };
            // 4-3-2. 회원가입 REST API 호출
            const response = await fetch('/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) throw new Error('회원가입 실패');

            // 4-3-3. 회원가입 성공 처리
            showAlert('회원가입이 완료되었습니다.', 'Success', () => {
                window.location.href = '/user/login';
            });

        } catch (error) {
            // 4-3-4. 회원가입 실패 처리
            console.error('회원가입 에러:', error);
            showAlert('회원가입에 실패했습니다. 다시 시도해주세요.', 'Error');
        }
    });
});
