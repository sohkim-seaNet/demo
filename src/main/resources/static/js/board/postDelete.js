/**
 * 삭제 기능 초기화
 */
window.initDeleteFunction = function(postSn) {
    const btnDelete = document.getElementById('btnDelete');
    if (!btnDelete) return;

    btnDelete.addEventListener('click', () => {
        deletePost(postSn);
    });
};

/**
 * 게시글 삭제
 */
function deletePost(postSn) {
    showConfirm('정말 삭제하시겠습니까?', '삭제 확인', () => {
        fetch(`/api/post/${postSn}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    showAlert('게시글이 삭제되었습니다.', '알림', () => {
                        location.href = '/board/list';
                    });
                } else if (response.status === 403) {
                    showAlert('삭제 권한이 없습니다.');
                } else if (response.status === 401) {
                    showAlert('로그인이 필요합니다.');
                } else {
                    showAlert('삭제 중 오류가 발생했습니다.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('삭제 중 오류가 발생했습니다.');
            });
    });
}
