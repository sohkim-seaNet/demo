document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/post')
        .then(response => {
            if (!response.ok) throw new Error('네트워크 응답 오류');
            return response.json();
        })
        .then(data => {
            const tbody = document.getElementById('postsList');
            tbody.innerHTML = '';

            if (!data || data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" class="text-center">게시물이 없습니다.</td></tr>';
                return;
            }

            data.forEach(post => {
                const tr = document.createElement('tr');
                const formattedDate = new Date(post.regDt).toLocaleDateString();

                tr.innerHTML = `
                    <td>${post.pstSn}</td>
                    <td><a href="/post/${post.pstSn}">${post.pstTtl}</a></td>
                    <td>${post.pblrNm}</td>
                    <td>${formattedDate}</td>`;

                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('게시물 로드 실패:', error);
            const tbody = document.getElementById('postsList');
            tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">게시물을 불러오는 데 실패했습니다.</td></tr>';

            // 모달로 에러 메시지 표시 (common.js의 showAlert 함수 활용)
            showAlert('게시물을 불러오는 데 실패했습니다.', 'Error');
        });
});