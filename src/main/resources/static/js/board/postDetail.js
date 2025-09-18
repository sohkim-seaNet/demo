document.addEventListener('DOMContentLoaded', async () => {
    const path = window.location.pathname;
    const postSn = path.substring(path.lastIndexOf('/') + 1);

    if (!postSn) {
        showAlert('잘못된 접근입니다.', 'Error', () => {
            window.location.href = '/board/list';
        });
        return;
    }

    try {
        // 게시글 정보와 사용자 정보 동시 요청
        const [postResponse, userResponse] = await Promise.all([
            fetch(`/api/post/${postSn}`),
            fetch('/api/auth/me')
        ]);

        if (!postResponse.ok) throw new Error('게시글 조회 실패');
        if (!userResponse.ok) throw new Error('사용자 정보 조회 실패');

        const post = await postResponse.json();
        const userInfo = await userResponse.json();

        // 게시글 정보 표시
        document.getElementById('pstTtl').textContent = post.pstTtl;
        document.getElementById('pstCn').textContent = post.pstCn;
        document.getElementById('pblrNm').textContent = post.pblrNm;
        document.getElementById('regDt').textContent = new Date(post.regDt).toLocaleString();

        // 권한 체크 후 버튼 표시
        checkPermissionAndShowButtons(post, userInfo, postSn);

    } catch (error) {
        console.error('데이터 조회 실패:', error);
        showAlert('데이터를 불러오는 데 실패했습니다.', 'Error', () => {
            window.location.href = '/board/list';
        });
    }
});

/**
 * 권한 체크 후 버튼 표시
 */
function checkPermissionAndShowButtons(post, userInfo, postSn) {
    if (!userInfo.isAuthenticated) {
        return;
    }

    if (post.userId === userInfo.userId) {
        const authorButtons = document.getElementById('authorButtons');
        if (authorButtons) {
            authorButtons.style.display = 'block';
        }

        // 수정 버튼 링크 설정
        const btnEdit = document.getElementById('btnEdit');
        if (btnEdit) {
            btnEdit.href = `/board/edit/${postSn}`;
        }

        // ✅ 삭제 기능 초기화 (postDelete.js에서 처리)
        if (window.initDeleteFunction) {
            window.initDeleteFunction(postSn);
        }
    }
}
