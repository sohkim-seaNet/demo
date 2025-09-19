/**
 * 게시글 상세 페이지 초기화 및 데이터 로딩
 */
document.addEventListener('DOMContentLoaded', async () => {
    // 1. URL에서 게시글 ID 추출
    const path = window.location.pathname;
    const postSn = path.substring(path.lastIndexOf('/') + 1);

    // 1-1. 게시글 ID 유효성 검사
    if (!postSn) {
        showAlert('잘못된 접근입니다.', 'Error', () => {
            window.location.href = '/board/list';
        });
        return;
    }

    try {
        // 2. 게시글 정보와 사용자 정보 동시 요청
        const [postResponse, userResponse] = await Promise.all([
            fetch(`/api/post/${postSn}`),
            fetch('/api/auth/me')
        ]);

        // 2-1. 응답 상태 검증
        if (!postResponse.ok) throw new Error('게시글 조회 실패');
        if (!userResponse.ok) throw new Error('사용자 정보 조회 실패');

        // 2-2. JSON 데이터 파싱
        const post = await postResponse.json();
        const userInfo = await userResponse.json();

        // 3. 게시글 정보 표시
        document.getElementById('pstTtl').textContent = post.pstTtl;
        document.getElementById('pstCn').textContent = post.pstCn;
        document.getElementById('pblrNm').textContent = post.pblrNm;
        document.getElementById('regDt').textContent = new Date(post.regDt).toLocaleString();

        // 4. 권한 체크 후 작성자 전용 버튼 표시
        checkPermissionAndShowButtons(post, userInfo, postSn);

    } catch (error) {
        // 5. 에러 처리: 네트워크, 서버 오류 등
        console.error('데이터 조회 실패:', error);
        showAlert('데이터를 불러오는 데 실패했습니다.', 'Error', () => {
            window.location.href = '/board/list';
        });
    }
});

/**
 * 권한 체크 후 작성자 전용 버튼 표시
 * @param post 게시글 정보
 * @param userInfo 현재 사용자 정보
 * @param postSn 게시글 일련번호
 */
function checkPermissionAndShowButtons(post, userInfo, postSn) {
    // 1. 로그인 상태 확인
    if (!userInfo.isAuthenticated) {
        return;
    }

    // 2. 작성자 본인 여부 확인
    if (post.userId === userInfo.userId) {
        // 2-1. 작성자 버튼 영역 표시
        const authorButtons = document.getElementById('authorButtons');
        if (authorButtons) {
            authorButtons.style.display = 'block';
        }

        // 2-2. 수정 버튼 링크 설정
        const btnEdit = document.getElementById('btnEdit');
        if (btnEdit) {
            btnEdit.href = `/board/edit/${postSn}`;
        }

        // 2-3. 삭제 기능 초기화 (postDelete.js 에서 처리)
        if (window.initDeleteFunction) {
            window.initDeleteFunction(postSn);
        }
    }
}
