/**
 * 게시글 삭제 기능 초기화
 * @param postSn 삭제할 게시글 일련번호
 */
window.initDeleteFunction = function(postSn) {
    // 삭제 버튼 요소 찾기
    const btnDelete = document.getElementById('btnDelete');
    if (!btnDelete) return;

    // 클릭 이벤트 리스너 등록
    btnDelete.addEventListener('click', () => {
        void deletePost(postSn);
    });
};

/**
 * 게시글 삭제 처리
 * @param postSn 삭제할 게시글 일련번호
 */
async function deletePost(postSn) {
    // 1. 사용자 확인 confirm 표시
    showConfirm('정말 삭제하시겠습니까?', '삭제 확인', async () => {
        try {
            // 2. 삭제 요청 REST API 호출
            const response = await fetch(`/api/post/${postSn}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // 3. HTTP 상태 코드별 처리
            // 3-1. HTTP 200/204: 삭제 성공
            if (response.ok) {
                showAlert('게시글이 삭제되었습니다.', '알림', () => {
                    location.href = '/board/list';
                });
            // 3-2. HTTP 403 Forbidden: 권한 없음
            } else if (response.status === 403) {
                showAlert('삭제 권한이 없습니다.');
            // 3-3. HTTP 401 Unauthorized: 인증 필요
            } else if (response.status === 401) {
                showAlert('로그인이 필요합니다.');
            // 3-4. HTTP 500 등 기타 서버 오류
            } else {
                showAlert('삭제 중 오류가 발생했습니다.');
            }
        // 4. 네트워크 오류 처리
        } catch (error) {
            console.error('Error: ', error);
            showAlert('삭제 중 오류가 발생했습니다.');
        }
    });
}
