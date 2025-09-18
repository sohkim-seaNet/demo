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
        const response = await fetch(`/api/post/${postSn}`);
        if (!response.ok) throw new Error('네트워크 응답 오류');

        const post = await response.json();

        document.getElementById('pstTtl').textContent = post.pstTtl;
        document.getElementById('pstCn').textContent = post.pstCn;
        document.getElementById('pblrNm').textContent = post.pblrNm;
        document.getElementById('regDt').textContent = new Date(post.regDt).toLocaleString();

        const btnEdit = document.getElementById('btnEdit');
        btnEdit.href = `/board/edit/${postSn}`;

    } catch (error) {
        console.error('게시글 상세 조회 실패:', error);
        showAlert('게시글을 불러오는 데 실패했습니다.', 'Error', () => {
            window.location.href = '/post';
        });
    }

    // 삭제 기능 초기화
    initDeleteButton(postSn, showAlert, showConfirm, showPasswordInputModal);
});