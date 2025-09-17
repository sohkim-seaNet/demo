let passwordInputModalInstance;

window.addEventListener('DOMContentLoaded', () => {
    const passwordModalEl = document.getElementById('passwordInputModal');
    if (passwordModalEl) {
        passwordInputModalInstance = new bootstrap.Modal(passwordModalEl);
    }
});

function showPasswordInputModal(callback) {
    const inputPassword = document.getElementById('inputPassword');
    inputPassword.value = '';

    const submitBtn = document.getElementById('passwordSubmitBtn');

    submitBtn.addEventListener('click', () => {
        const pwd = inputPassword.value.trim();
        if (!pwd) {
            showAlert('비밀번호를 입력해주세요.');
            return;
        }
        passwordInputModalInstance.hide();
        callback(pwd);
    });

    passwordInputModalInstance.show();
}

function initDeleteButton(postSn, showAlert, showConfirm, showPasswordInputModal) {
    const btnDelete = document.getElementById('btnDelete');
    if (!btnDelete) return;

    btnDelete.addEventListener('click', () => {
        showPasswordInputModal((inputPassword) => {
            // 1단계: 비밀번호 검증
            fetch(`/api/post/${postSn}/verifyPassword`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({pstPswd: inputPassword})
            })
                .then(res => {
                    if (res.status === 401) throw new Error('비밀번호가 일치하지 않습니다.');
                    if (!res.ok) throw new Error('비밀번호 확인 실패');
                    // 2단계: 삭제 최종 확인 모달
                    showConfirm('정말로 삭제하시겠습니까?', '삭제 확인', () => {
                        // 3단계: 삭제 요청
                        fetch(`/api/post/${postSn}`, {
                            method: 'DELETE',
                        })
                            .then(delRes => {
                                if (!delRes.ok) throw new Error('삭제 실패');
                                showAlert('게시글이 삭제되었습니다.', '삭제 완료', () => {
                                    window.location.href = '/post';
                                });
                            })
                            .catch(err => showAlert(err.message, '삭제 오류'));
                    });
                })
                .catch(err => showAlert(err.message, '비밀번호 오류'));
        });
    });
}