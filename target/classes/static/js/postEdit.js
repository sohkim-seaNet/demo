document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const postSn = path.substring(path.lastIndexOf('/') + 1);

    if (!postSn) {
        showAlert('잘못된 접근입니다.', 'Error', () => window.location.href = '/post');
        return;
    }

    // 기존 게시글 데이터 불러오기
    fetch(`/api/post/${postSn}`)
        .then(response => {
            if (!response.ok) throw new Error('게시글을 불러오는 데 실패했습니다.');
            return response.json();
        })
        .then(post => {
            document.getElementById('pstTtl').value = post.pstTtl;
            document.getElementById('pstCn').value = post.pstCn;
            document.getElementById('pblrNm').value = post.pblrNm;
        })
        .catch(error => {
            showAlert(error.message, 'Error', () => window.location.href = '/post');
        });

    // 폼 제출 이벤트 처리
    document.getElementById('editForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const data = {
            pstTtl: document.getElementById('pstTtl').value.trim(),
            pstCn: document.getElementById('pstCn').value.trim(),
            pblrNm: document.getElementById('pblrNm').value.trim(),
            pstPswd: document.getElementById('pstPswd').value
        };

        fetch(`/api/post/${postSn}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 401) throw new Error('비밀번호가 일치하지 않습니다.');
                if (!res.ok) throw new Error('수정에 실패했습니다.');
                showAlert('글이 성공적으로 수정되었습니다.', 'Success', () => {
                    window.location.href = `/post/${postSn}`;
                });
            })
            .catch(err => {
                showAlert(err.message, 'Error');
            });
    });
});