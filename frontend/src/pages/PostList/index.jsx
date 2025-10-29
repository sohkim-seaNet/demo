/**
 * PostList/index.jsx - 게시글 목록 페이지
 * - 게시글 목록 조회 및 검색
 * - 페이징 처리
 */

import React, { useState, useEffect } from 'react';
import { showAlert } from '../../components/common/AlertModal';
import { useNavigate } from 'react-router-dom';

function PostList() {

    const navigate = useNavigate();

    // [상태 관리] 검색 조건
    const [searchType, setSearchType] = useState('title');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    // [상태 관리] 게시글 데이터
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // [상태 관리] 페이징 정보
    const [pageData, setPageData] = useState({
        totalPages: 0,      // 전체 페이지 수
        hasNext: false,     // 다음 페이지 존재 여부
        hasPrevious: false  // 이전 페이지 존재 여부
    });

    /**
     * loadPosts - 서버에서 게시글 목록 가져오기
     * - 검색 조건과 페이지 번호에 따라 데이터 조회
     */
    const loadPosts = async () => {
        try {
            setLoading(true);
            setError(null);

            // API 요청 파라미터 구성
            const params = new URLSearchParams({
               page: currentPage,
               size: 10
            });

            // 검색 조건이 있으면 파라미터 추가
            if (searchKeyword && searchKeyword.trim() !== '') {
                params.append('searchType', searchType);
                params.append('searchKeyword', searchKeyword.trim());
            }

            // REST API 호출
            const response = await fetch(`/api/post/search?${params}`, {
               credentials: 'include'
            });

            if (!response.ok) throw new Error('네트워크 응답 오류');

            const data = await response.json();
            console.log('API 응답:', data);

            // 게시글 목록 저장
            setPosts(data.content);

            // 페이징 정보 저장
            setPageData({
                totalPages: data.totalPages,
                hasNext: data.hasNext,
                hasPrevious: data.hasPrevious
            });
        } catch (error) {
            console.error('게시물 로드 실패:', error);
            setError('게시물을 불러오는 데 실패했습니다.');
            showAlert('게시물을 불러오는 데 실패했습니다.', 'Error');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPosts();
    }, [currentPage]);

    // [이벤트 핸들러] 검색 버튼 클릭
    const handleSearch = () => {
        setCurrentPage(1);  // 검색 시 첫 페이지로
        loadPosts();
    };

    // [이벤트 핸들러] Enter 키 입력 시 검색
    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleSearch();
        }
    };

    // [페이징] 특정 페이지로 이동
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    /**
     * renderPagination - 페이징 버튼 렌더링
     * - 현재 페이지 기준으로 최대 5개 버튼 표시
     * - 이전/다음 버튼 포함
     */
    const renderPagination = () => {
        if (pageData.totalPages <= 1) return null;

        const maxButtons = 5;
        let startPage, endPage;

        // 페이지 버튼 범위 계산
        if (pageData.totalPages <= maxButtons) {
            startPage = 1;
            endPage = pageData.totalPages;
        } else {
            const half = Math.floor(maxButtons / 2);
            if (currentPage <= half) {
                startPage = 1;
                endPage = maxButtons;
            } else if (currentPage >= pageData.totalPages - half) {
                startPage = pageData.totalPages - maxButtons + 1;
                endPage = pageData.totalPages;
            } else {
                startPage = currentPage - half;
                endPage = currentPage + half;
            }
        }

        // 페이지 번호 버튼 생성
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                    <a
                        className="page-link"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            goToPage(i);
                        }}
                    >
                        {i}
                    </a>
                </li>
            );
        }

        return (
            <nav>
                <ul className="pagination">
                    {/* 이전 페이지 버튼 */}
                    <li className={`page-item ${!pageData.hasPrevious ? 'disabled' : ''}`}>
                        <a
                            className="page-link"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if(pageData.hasPrevious) {
                                    goToPage(currentPage - 1);
                                }
                            }}
                        >
                            &laquo;
                        </a>
                    </li>
                    {/* 페이지 번호 버튼들 */}
                    {pages}
                    {/* 다음 페이지 버튼 */}
                    <li className={`page-item ${!pageData.hasNext ? 'disabled' : ''}`}>
                        <a
                            className="page-link"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if(pageData.hasNext) {
                                    goToPage(currentPage + 1);
                                }
                            }}
                        >
                            &raquo;
                        </a>
                    </li>
                </ul>
            </nav>
        );
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>게시판 목록</h2>
            </div>

            {/* 검색 영역 */}
            <div className="d-flex justify-content-end mb-3">
                <div className="input-group" style={{ width: 'auto', maxWidth: '400px' }}>
                    {/* 검색 타입 선택 드롭다운 */}
                    <select
                        className="form-select"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                        style={{ flex: '0 0 140px' }}
                    >
                        <option value="title">제목</option>
                        <option value="titleContent">제목+내용</option>
                        <option value="writer">작성자</option>
                    </select>

                    {/* 검색어 입력 */}
                    <input
                        type="text"
                        className="form-control"
                        placeholder="검색어를 입력하세요"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />

                    {/* 검색 버튼 */}
                    <button
                        className="btn btn-primary"
                        onClick={handleSearch}
                    >
                        검색
                    </button>
                </div>
            </div>

            {/* 게시글 목록 테이블 */}
            <table className="table table-striped">
                <thead className="table-light">
                <tr>
                    <th scope="col">번호</th>
                    <th scope="col">제목</th>
                    <th scope="col">작성자</th>
                    <th scope="col">등록일</th>
                </tr>
                </thead>
                <tbody>
                    {/* 조건부 렌더링: 로딩/에러/데이터 없음/정상 */}
                    {loading ? (
                        <tr>
                            <td colSpan="4" className="text-center">로딩 중...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan="4" className="text-center text-danger">{error}</td>
                        </tr>
                    ) : posts.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center">게시물이 없습니다.</td>
                        </tr>
                    ) : (
                        // 게시글 목록 렌더링
                        posts.map(post => (
                            <tr key={post.pstSn}>
                                <td>{post.pstSn}</td>
                                <td>
                                    <a href={`/board/detail/${post.pstSn}`}>{post.pstTtl}</a>
                                </td>
                                <td>{post.pblrNm}</td>
                                <td>{new Date(post.regDt).toLocaleDateString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* 글 작성 버튼 */}
            <div className="d-flex justify-content-end mt-3 mb-5">
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/board/write')}
                >
                    글 작성
                </button>
            </div>

            {/* 페이징 버튼 영역 */}
            <div className="d-flex justify-content-center">
                {renderPagination()}
            </div>
        </div>

    );
}

export default PostList;