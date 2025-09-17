// 전역 변수
let currentPage = 1;
let currentSearchType = '';
let currentSearchKeyword = '';

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    initSearchEvents();
});

// 게시글 목록 로드
function loadPosts() {
    const params = new URLSearchParams({
        page: currentPage,
        size: 10
    });

    // 검색 조건이 있으면 추가
    if (currentSearchKeyword && currentSearchKeyword.trim() !== '') {
        params.append('searchType', currentSearchType);
        params.append('searchKeyword', currentSearchKeyword.trim());
    }

    fetch(`/api/post/search?${params}`)
        .then(response => {
            if (!response.ok) throw new Error('네트워크 응답 오류');
            return response.json();
        })
        .then(data => {
            renderPostList(data.content);
            renderPagination(data);
        })
        .catch(error => {
            console.error('게시물 로드 실패:', error);
            const tbody = document.getElementById('postsList');
            tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">게시물을 불러오는 데 실패했습니다.</td></tr>';
            showAlert('게시물을 불러오는 데 실패했습니다.', 'Error');
        });
}

// 게시글 목록 렌더링
function renderPostList(posts) {
    const tbody = document.getElementById('postsList');
    tbody.innerHTML = '';

    if (!posts || posts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center">게시물이 없습니다.</td></tr>';
        return;
    }

    posts.forEach(post => {
        const tr = document.createElement('tr');
        const formattedDate = new Date(post.regDt).toLocaleDateString();

        tr.innerHTML = `
            <td>${post.pstSn}</td>
            <td><a href="/post/${post.pstSn}">${post.pstTtl}</a></td>
            <td>${post.pblrNm}</td>
            <td>${formattedDate}</td>`;

        tbody.appendChild(tr);
    });
}

// 페이징 버튼 렌더링
function renderPagination(pageData) {
    const pagination = document.getElementById('pagination');

    // 페이지가 1개뿐이면 페이징 숨기기
    if (pageData.totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = '<ul class="pagination">';

    // 이전 버튼
    if (pageData.hasPrevious) {
        html += `<li class="page-item">
            <a class="page-link" href="#" onclick="goToPage(${currentPage - 1})">&laquo;</a>
        </li>`;
    } else {
        html += `<li class="page-item disabled">
            <a class="page-link" href="#">&laquo;</a>
        </li>`;
    }

    // 페이지 번호 범위 계산 (최대 5개만 표시)
    const maxButtons = 5;
    let startPage, endPage;

    if (pageData.totalPages <= maxButtons) {
        // 전체 페이지가 5개 이하면 모두 표시
        startPage = 1;
        endPage = pageData.totalPages;
    } else {
        // 전체 페이지가 5개 이상일 때
        const half = Math.floor(maxButtons / 2); // 2

        if (currentPage <= half) {
            // 앞쪽 경계: 1, 2페이지일 때
            startPage = 1;
            endPage = maxButtons; // 5
        } else if (currentPage >= pageData.totalPages - half) {
            // 뒤쪽 경계: 마지막에서 2번째, 마지막일 때
            startPage = pageData.totalPages - maxButtons + 1;
            endPage = pageData.totalPages;
        } else {
            // 중간: 항상 현재 페이지가 가운데
            startPage = currentPage - half;
            endPage = currentPage + half;
        }
    }

    // 페이지 번호 버튼들
    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            html += `<li class="page-item active">
                <a class="page-link" href="#">${i}</a>
            </li>`;
        } else {
            html += `<li class="page-item">
                <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
            </li>`;
        }
    }

    // 다음 버튼
    if (pageData.hasNext) {
        html += `<li class="page-item">
            <a class="page-link" href="#" onclick="goToPage(${currentPage + 1})">&raquo;</a>
        </li>`;
    } else {
        html += `<li class="page-item disabled">
            <a class="page-link" href="#">&raquo;</a>
        </li>`;
    }

    html += '</ul>';
    pagination.innerHTML = html;
}

// 페이지 이동
function goToPage(page) {
    currentPage = page;
    loadPosts();
}

// 검색 실행
function executeSearch() {
    // 검색 조건 업데이트
    currentSearchType = document.getElementById('searchType').value;
    currentSearchKeyword = document.getElementById('searchKeyword').value;

    // 첫 페이지로 리셋
    currentPage = 1;

    // 데이터 로드
    loadPosts();
}

// 검색 이벤트 초기화
function initSearchEvents() {
    // 검색 버튼 클릭
    document.getElementById('btnSearch').addEventListener('click', executeSearch);

    // Enter 키 검색
    document.getElementById('searchKeyword').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    });
}
