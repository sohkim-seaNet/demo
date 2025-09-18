document.addEventListener('DOMContentLoaded', async () => {
    // 페이지 로드시 사용자 정보 확인 및 닉네임 자동 설정
    try {
        const response = await fetch('/api/auth/me');

        if (!response.ok) {
            throw new Error('사용자 정보 조회 실패');
        }

        const userInfo = await response.json();

        if (!userInfo.isAuthenticated) {
            showAlert('로그인이 필요합니다.', '알림', () => {
                location.href = '/user/login';
            });
            return;
        }

        // 닉네임을 작성자 필드에 자동 설정
        document.getElementById('pblrNm').value = userInfo.nickname;

    } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        showAlert('사용자 정보를 불러올 수 없습니다.', '오류', () => {
            location.href = '/user/login';
        });
        return;
    }

    // 글 작성 완료 버튼 이벤트
    document.getElementById('btnSubmit').addEventListener('click', async () => {
        // 입력값 검증
        const title = document.getElementById('pstTtl').value.trim();
        const content = document.getElementById('pstCn').value.trim();

        if (!title) {
            showAlert('제목을 입력해주세요.');
            return;
        }

        if (!content) {
            showAlert('내용을 입력해주세요.');
            return;
        }

        // 서버로 전송할 데이터 (닉네임, 사용자ID는 서버에서 자동 설정)
        const postData = {
            pstTtl: title,
            pstCn: content
        };

        try {
            const response = await fetch('/api/post/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (response.status === 401) {
                showAlert('로그인이 필요합니다.', '알림', () => {
                    location.href = '/user/login';
                });
                return;
            }

            if (response.status === 403) {
                showAlert('글 작성 권한이 없습니다.');
                return;
            }

            if (!response.ok) {
                throw new Error('글 작성에 실패했습니다.');
            }

            // 성공시 목록 페이지로 이동
            showAlert('글이 성공적으로 작성되었습니다.', '완료', () => {
                window.location.href = '/board/list';
            });

        } catch (error) {
            console.error('글 작성 실패:', error);
            showAlert(error.message, '오류');
        }
    });
});
