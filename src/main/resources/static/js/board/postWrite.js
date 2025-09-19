/**
 * 게시글 작성 페이지 초기화 및 작성 처리
 */
document.addEventListener('DOMContentLoaded', async () => {

    try {
        // 1. 페이지 로드시 사용자 정보 확인
        const response = await fetch('/api/auth/me');

        // 1-1. 응답 상태 검증
        if (!response.ok) {
            throw new Error('사용자 정보 조회 실패');
        }
        // 1-2. JSON 데이터 파싱
        const userInfo = await response.json();

        // 2. 로그인 상태 체크
        if (!userInfo.isAuthenticated) {
            showAlert('로그인이 필요합니다.', '알림', () => {
                location.href = '/user/login';
            });
            return;
        }

        // 3. 닉네임을 작성자 필드에 자동 설정
        document.getElementById('pblrNm').value = userInfo.nickname;

    } catch (error) {
        // 4. 사용자 정보 조회 실패 처리
        console.error('사용자 정보 조회 실패:', error);
        showAlert('사용자 정보를 불러올 수 없습니다.', '오류', () => {
            location.href = '/user/login';
        });
        return;
    }

    /**
     * 글 작성 완료 버튼 이벤트 바인딩
     */
    document.getElementById('btnSubmit').addEventListener('click', async () => {
        // 1. 입력값 검증
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

        // 2. 서버로 전송할 데이터 세팅 (닉네임, 사용자ID는 서버에서 자동 설정)
        const postData = {
            pstTtl: title,
            pstCn: content
        };

        try {
            // 3. 게시글 작성 API 호출
            const response = await fetch('/api/post/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            // 4. HTTP 상태 코드별 처리
            // 4-1. HTTP 401 Unauthorized: 인증 필요
            if (response.status === 401) {
                showAlert('로그인이 필요합니다.', '알림', () => {
                    location.href = '/user/login';
                });
                return;
            }
            // 4-2. HTTP 403 Forbidden: 권한 없음
            if (response.status === 403) {
                showAlert('글 작성 권한이 없습니다.');
                return;
            }
            // 4-3. 기타 서버 오류
            if (!response.ok) {
                throw new Error('글 작성에 실패했습니다.');
            }

            // 5. 작성 성공 처리
            showAlert('글이 성공적으로 작성되었습니다.', '완료', () => {
                window.location.href = '/board/list';
            });

        } catch (error) {
            // 6. 네트워크 오류 처리
            console.error('글 작성 실패:', error);
            showAlert(error.message, '오류');
        }
    });
});