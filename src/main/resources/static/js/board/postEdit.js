/**
 * 게시글 수정 페이지 초기화 및 수정처리
 */
document.addEventListener('DOMContentLoaded', async () => {
    // 1. URL에서 게시글 ID 추출
    const path = window.location.pathname;
    const postSn = path.substring(path.lastIndexOf('/') + 1);

    // 1-1. 게시글 ID 유효성 검사
    if (!postSn) {
        showAlert('잘못된 접근입니다.', '오류', () => {
            window.location.href = '/board/list';
        });
        return;
    }

    try {
        // 2-1. 게시글 정보와 사용자 정보 동시 요청
        const [postResponse, userResponse] = await Promise.all([
            fetch(`/api/post/${postSn}`),
            fetch('/api/auth/me')
        ]);

        // 2-2. 응답 상태 검증
        if (!postResponse.ok) {
            throw new Error('게시글을 불러오는 데 실패했습니다.');
        }
        if (!userResponse.ok) {
            throw new Error('사용자 정보를 불러오는 데 실패했습니다.');
        }

        // 2-3. JSON 데이터 파싱
        const post = await postResponse.json();
        const userInfo = await userResponse.json();

        // 3. 로그인 상태 체크
        if (!userInfo.isAuthenticated) {
            showAlert('로그인이 필요합니다.', '알림', () => {
                location.href = '/user/login';
            });
            return;
        }

        // 4. 권한 체크 (본인 글만 수정 가능)
        if (post.userId !== userInfo.userId) {
            showAlert('본인이 작성한 글만 수정할 수 있습니다.', '권한 없음', () => {
                history.back();
            });
            return;
        }

        // 5. 기존 게시글 데이터를 폼에 설정
        document.getElementById('pstTtl').value = post.pstTtl;
        document.getElementById('pstCn').value = post.pstCn;
        document.getElementById('pblrNm').value = post.pblrNm;

    } catch (error) {
        // 6. 데이터 로드 실패 처리
        console.error('데이터 로드 실패:', error);
        showAlert(error.message, '오류', () => {
            window.location.href = '/board/list';
        });
        return;
    }

    /**
     * 수정 완료 버튼 이벤트 등록
     */
    document.getElementById('btnEdit').addEventListener('click', async () => {
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

        // 2. 서버로 전송할 데이터 세팅
        const updateData = {
            pstTtl: title,
            pstCn: content
        };

        try {
            // 3. 게시글 수정 API 호출
            const response = await fetch(`/api/post/${postSn}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
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
                showAlert('수정 권한이 없습니다.');
                return;
            }
            // 4-3. 기타 서버 오류
            if (!response.ok) {
                throw new Error('수정에 실패했습니다.');
            }

            // 5. 수정 성공 처리
            showAlert('글이 성공적으로 수정되었습니다.', '완료', () => {
                window.location.href = `/board/detail/${postSn}`;
            });

        } catch (error) {
            // 6. 네트워크 오류 처리
            console.error('수정 실패:', error);
            showAlert(error.message, '오류');
        }
    });
});
