/**
 * PostDetail/index.jsx - 게시글 상세보기 페이지
 * - URL 파라미터로 받은 id로 게시글 조회
 * - 작성자만 수정/삭제 가능 (권한 체크)
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { showAlert, showConfirm } from '../../components/common/AlertModal';

function PostDetail() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // [상태 관리] 게시글 정보와 로딩/에러 상태
    const [post, setPost] = useState(null);                 // 게시글 데이터
    const [loading, setLoading] = useState(true);   // 로딩 중 여부
    const [error, setError] = useState(null);               // 에러 메시지

    // 게시글 상세 정보 가져오기
    useEffect(() => {
        loadPosts();
    }, [id]);

    /**
     * loadPosts - 서버에서 게시글 상세 정보 가져오기
     */
    const loadPosts = async () => {

        try {
            setLoading(true);
            setError(null);

            // GET 요청: /api/post/{id}
            const response = await fetch(`/api/post/${id}`, {
                credentials: 'include'
            });

            // HTTP 상태 코드별 에러 처리
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('게시글을 찾을 수 없습니다.');
                }
                throw new Error('게시글 조회 실패');
            }

            const data = await response.json();
            console.log('게시글 정보: ', data);
            setPost(data);
        } catch (error) {
            console.error('게시글 로드 실패: ', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    /**
     * handleDelete - 게시글 삭제 핸들러
     * - showConfirm으로 사용자에게 확인 후 삭제
     */
    const handleDelete = () => {
        // 확인 모달 표시
        showConfirm('정말 삭제하시겠습니까?', '삭제 확인', async () => {
            try {
                // DELETE 요청
                const response = await fetch(`/api/post/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                // HTTP 상태 코드별 처리
                if (response.ok) {
                    showAlert('게시글이 삭제되었습니다.', '알림', () => {
                        navigate('/board/list');
                    });
                } else if (response.status === 403) {
                    showAlert('삭제 권한이 없습니다.');
                } else if (response.status === 401) {
                    showAlert('로그인이 필요합니다.');
                } else {
                    showAlert('삭제 중 오류가 발생했습니다.');
                }
            } catch (error) {
                console.error('Error:', error);
                showAlert('삭제 중 오류가 발생했습니다.');
            }
        });
    };

    // [조건부 렌더링 1] 로딩 중일 때
    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">로딩 중...</div>
            </div>
        );
    }

    // [조건부 렌더링 2] 게시글이 없을 때
    if (!post) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning">게시글을 찾을 수 없습니다.</div>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/board/list')}
                >
                    목록으로
                </button>
            </div>
        );
    }

    // [권한 체크] 현재 로그인한 사용자가 작성자인지 확인
    const isAuthor = user && post.userId === user.userId;

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                {/* 게시글 제목 */}
                <div className="card-header bg-primary text-white">
                    <h3>{post.pstTtl}</h3>
                </div>
                <div className="card-body">
                    {/* 게시글 내용 */}
                    <p className="mb-4" style={{ whiteSpace: 'pre-wrap' }}>
                        {post.pstCn}
                    </p>
                    {/* 게시글 정보 (작성자, 작성일) */}
                    <div className="mb-3 text-muted">
                        <span>작성자: <strong>{post.pblrNm}</strong></span> |{' '}
                        <span>작성일: <strong>{new Date(post.regDt).toLocaleString()}</strong></span>
                    </div>
                    {/* 버튼 영역 */}
                    <div className="d-flex gap-2 justify-content-end">
                        {/* 목록 버튼 - 모든 사용자에게 표시 */}
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate('/board/list')}
                        >
                            글목록
                        </button>
                        {/* 수정/삭제 버튼 - 작성자에게만 표시 (조건부 렌더링) */}
                        {isAuthor && (
                            <>
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => navigate(`/board/edit/${id}`)}
                                >
                                    수정
                                </button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={handleDelete}
                                >
                                    삭제
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;