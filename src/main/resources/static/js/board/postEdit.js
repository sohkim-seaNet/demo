document.addEventListener('DOMContentLoaded', async () => {
    const path = window.location.pathname;
    const postSn = path.substring(path.lastIndexOf('/') + 1);

    if (!postSn) {
        showAlert('잘못된 접근입니다.', '오류', () => {
            window.location.href = '/board/list';
        });
        return;
    }

    // 로그인 체크 및 권한 체크
    try {
        const [postResponse, userResponse] = await Promise.all([
            fetch(`/api/post/${postSn}`),
            fetch('/api/auth/me')
        ]);

        if (!postResponse.ok) {
            throw new Error('게시글을 불러오는 데 실패했습니다.');
        }

        if (!userResponse.ok) {
            throw new Error('사용자 정보를 불러오는 데 실패했습니다.');
        }

        const post = await postResponse.json();
        const userInfo = await userResponse.json();

        // 로그인 체크
        if (!userInfo.isAuthenticated) {
            showAlert('로그인이 필요합니다.', '알림', () => {
                location.href = '/user/login';
            });
            return;
        }

        // 권한 체크 (본인 글만 수정 가능)
        if (post.userId !== userInfo.userId) {
            showAlert('본인이 작성한 글만 수정할 수 있습니다.', '권한 없음', () => {
                history.back();
            });
            return;
        }

        // 기존 게시글 데이터 설정
        document.getElementById('pstTtl').value = post.pstTtl;
        document.getElementById('pstCn').value = post.pstCn;
        document.getElementById('pblrNm').value = post.pblrNm;

    } catch (error) {
        console.error('데이터 로드 실패:', error);
        showAlert(error.message, '오류', () => {
            window.location.href = '/board/list';
        });
        return;
    }

    // 수정 완료 버튼 이벤트
    document.getElementById('btnEdit').addEventListener('click', async () => {
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

        // 서버로 전송할 데이터 (제목, 내용만)
        const updateData = {
            pstTtl: title,
            pstCn: content
        };

        try {
            const response = await fetch(`/api/post/${postSn}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            if (response.status === 401) {
                showAlert('로그인이 필요합니다.', '알림', () => {
                    location.href = '/user/login';
                });
                return;
            }

            if (response.status === 403) {
                showAlert('수정 권한이 없습니다.');
                return;
            }

            if (!response.ok) {
                throw new Error('수정에 실패했습니다.');
            }

            // 성공시 상세 페이지로 이동
            showAlert('글이 성공적으로 수정되었습니다.', '완료', () => {
                window.location.href = `/board/detail/${postSn}`;
            });

        } catch (error) {
            console.error('수정 실패:', error);
            showAlert(error.message, '오류');
        }
    });
});
