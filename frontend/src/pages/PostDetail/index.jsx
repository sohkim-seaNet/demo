import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function PostDetail() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // 게시글 정보 상태
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 게시글 상세 정보 가져오기
    useEffect(() => {
        loadPosts();
    }, [id]);

    const loadPosts = async () => {

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`/api/post/${id}`, {
                credentials: 'include'
            });

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

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">로딩 중...</div>
            </div>
        );
    }

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

    const isAuthor = user && post.userId === user.userId;

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h3>{post.pstTtl}</h3>
                </div>
                <div className="card-body">
                    <p className="mb-4" style={{ whiteSpace: 'pre-wrap' }}>
                        {post.pstCn}
                    </p>
                    <div className="mb-3 text-muted">
                        <span>작성자: <strong>{post.pblrNm}</strong></span> |{' '}
                        <span>작성일: <strong>{new Date(post.regDt).toLocaleString()}</strong></span>
                    </div>
                    <div className="d-flex gap-2 justify-content-end">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate('/board/list')}
                        >
                            글목록
                        </button>

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
                                    onClick={() => alert('삭제 기능은 나중에 구현 예정')}
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