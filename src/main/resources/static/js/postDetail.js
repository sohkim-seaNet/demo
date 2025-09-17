document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const postSn = path.substring(path.lastIndexOf('/') + 1);

    if (!postSn) {
        showAlert('잘못된 접근입니다.', 'Error', () => {
            window.location.href = '/post';
        });
        return;
    }

    fetch(`/api/post/${postSn}`)
        .then(response => {
            if (!response.ok) throw new Error('네트워크 응답 오류');
            return response.json();
        })
        .then(post => {
            document.getElementById('pstTtl').textContent  = post.pstTtl;
            document.getElementById('pstCn').textContent  = post.pstCn;
            document.getElementById('pblrNm').textContent  = post.pblrNm;
            document.getElementById('regDt').textContent  = new Date(post.regDt).toLocaleString();

            const btnEdit = document.getElementById('btnEdit');
            btnEdit.href = `/post/edit/${postSn}`;

        })
        .catch(error => {
            console.error('게시글 상세 조회 실패:', error);
            showAlert('게시글을 불러오는 데 실패했습니다.', 'Error', () => {
                window.location.href = '/post';
            });
        });

    // 삭제 기능 초기화
    initDeleteButton(postSn, showAlert, showConfirm, showPasswordInputModal);


    // 1. 프로미스 체인
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.error(err));

    // 2. async/await
    async function getData() {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }


});