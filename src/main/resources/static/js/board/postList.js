/**
 * 게시판 목록 페이지 - 페이징 및 검색 기능
 */

// 전역 변수 - 현재 상태 관리
let currentPage = 1;            // 현재 페이지 번호
let currentSearchType = '';      // 현재 검색 타입 (title, titleContent, writer)
let currentSearchKeyword = '';   // 현재 검색 키워드

/**
 * 페이지 로드 시 초기화
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. 초기 게시글 목록 로드
    loadPosts();
    // 2. 검색 관련 이벤트 초기화
    initSearchEvents();
});

/**
 * 게시글 목록 로드 (페이징 + 검색 통합)
 */
async function loadPosts() {
    try {
        // 1. API 요청 파라미터 구성
        const params = new URLSearchParams({
            page: currentPage,
            size: 10
        });

        // 2. 검색 조건이 있으면 파라미터 추가
        if (currentSearchKeyword && currentSearchKeyword.trim() !== '') {
            params.append('searchType', currentSearchType);
            params.append('searchKeyword', currentSearchKeyword.trim());
        }

        // 3. REST API 호출
        const response = await fetch(`/api/post/search?${params}`);
        if (!response.ok) throw new Error('네트워크 응답 오류');

        // 4. JSON 데이터 파싱
        const data = await response.json();

        // 5. UI 렌더링
        renderPostList(data.content);   // 게시글 목록 표시
        renderPagination(data);         // 페이징 버튼 표시
    } catch (error) {
        // 6. 에러 처리
        console.error('게시물 로드 실패:', error);
        const tbody = document.getElementById('postsList');
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">게시물을 불러오는 데 실패했습니다.</td></tr>';
        showAlert('게시물을 불러오는 데 실패했습니다.', 'Error');
    }
}

/**
 * 게시글 목록 렌더링
 * @param posts 게시글 목록 데이터
 */
function renderPostList(posts) {
    const tbody = document.getElementById('postsList');
    tbody.innerHTML = '';

    // 1. 게시글이 없는 경우
    if (!posts || posts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center">게시물이 없습니다.</td></tr>';
        return;
    }

    // 2. 게시글 목록을 테이블로 렌더링
    posts.forEach(post => {
        const tr = document.createElement('tr');
        const formattedDate = new Date(post.regDt).toLocaleDateString();

        tr.innerHTML = `
            <td>${post.pstSn}</td>
            <td><a href="/board/detail/${post.pstSn}">${post.pstTtl}</a></td>
            <td>${post.pblrNm}</td>
            <td>${formattedDate}</td>`;

        tbody.appendChild(tr);
    });
}

/**
 * 페이징 네비게이션 버튼 렌더링
 * @param pageData 페이징 데이터
 */
function renderPagination(pageData) {
    const pagination = document.getElementById('pagination');

    // 1. 페이지가 1개뿐이면 페이징 숨기기
    if (pageData.totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = '<ul class="pagination">';

    // 2. 이전 버튼 렌더링
    if (pageData.hasPrevious) {
        html += `<li class="page-item">
            <a class="page-link" href="#" onclick="goToPage(${currentPage - 1})">&laquo;</a>
        </li>`;
    } else {
        html += `<li class="page-item disabled">
            <a class="page-link" href="#">&laquo;</a>
        </li>`;
    }

    // 3. 페이지 번호 범위 계산 (최대 5개 버튼만 표시)
    const maxButtons = 5;
    let startPage, endPage;

    if (pageData.totalPages <= maxButtons) {
        // 3-1. 전체 페이지가 5개 이하면 모두 표시
        startPage = 1;
        endPage = pageData.totalPages;
    } else {
        // 3-2. 전체 페이지가 5개 이상일 때: 현재 페이지 중심으로 5개 표시
        const half = Math.floor(maxButtons / 2); // 2

        if (currentPage <= half) {
            // 3-2-1. 앞쪽 경계가 1, 2페이지일 때: 1,2,3,4,5 표시
            startPage = 1;
            endPage = maxButtons; // 5
        } else if (currentPage >= pageData.totalPages - half) {
            // 3-2-2. 뒤쪽 경계가 마지막에서 2번째, 마지막일 때
            startPage = pageData.totalPages - maxButtons + 1;
            endPage = pageData.totalPages;
        } else {
            // 3-2-3. 항상 현재 페이지가 가운데
            startPage = currentPage - half;
            endPage = currentPage + half;
        }
    }

    // 4. 페이지 번호 버튼 렌더링
    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            // 4-1. 현재 페이지는 active 상태로 표시
            html += `<li class="page-item active">
                <a class="page-link" href="#">${i}</a>
            </li>`;
        } else {
            // 4-2. 다른 페이지는 클릭 가능한 링크로 표시
            html += `<li class="page-item">
                <a class="page-link" href="#" onclick="goToPage(${i})">${i}</a>
            </li>`;
        }
    }

    // 5. 다음 버튼 렌더링
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

/**
 * 특정 페이지로 이동
 * @param page 이동할 페이지 번호
 */
function goToPage(page) {
    // 1. 현재 페이지 상태 업데이트
    currentPage = page;
    // 2. 게시글 목록 다시 로드
    loadPosts();
}

/**
 * 검색 실행
 */
function executeSearch() {
    // 1. 검색 조건 전역 변수에 저장
    currentSearchType = document.getElementById('searchType').value;
    currentSearchKeyword = document.getElementById('searchKeyword').value;

    // 2. 검색 시 첫 페이지로 리셋
    currentPage = 1;

    // 3. 검색 조건으로 데이터 로드
    loadPosts();
}

/**
 * 검색 관련 이벤트 초기화
 */
function initSearchEvents() {
    // 1. 검색 버튼 클릭 이벤트
    document.getElementById('btnSearch').addEventListener('click', executeSearch);

    // 2. 검색어 입력 필드에서 Enter 키 이벤트
    document.getElementById('searchKeyword').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    });
}
