/**
 * PostEdit/index.jsx - 게시글 수정 페이지
 * - 기존 게시글 데이터를 불러와서 수정
 * - 작성자 본인만 수정 가능 (권한 체크)
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showAlert } from '../../components/common/AlertModal';

function PostEdit() {

    const { id } = useParams();
    const navigate = useNavigate();

    // [상태 관리] 폼 입력값
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(true);           // 데이터 로딩 중
    const [submitting, setSubmitting] = useState(false);    // 수정 요청 중 (중복 제출 방지)

    useEffect(() => {
        loadPostAndCheckAuth();
    }, [id]);

    /**
     * loadPostAndCheckAuth - 게시글 데이터와 사용자 인증 정보 동시 로드
     * - Promise.all로 2개의 API를 병렬로 호출
     */
    const loadPostAndCheckAuth = async () => {
        try {
            const [postResponse, userResponse] = await Promise.all([
                fetch(`/api/post/${id}`, { credentials: 'include' }),
                fetch(`/api/auth/me`, { credentials: 'include' }),
            ]);

            // HTTP 응답 상태 검증
            if (!postResponse.ok) {
                throw new Error('게시글을 불러오는 데 실패했습니다.');
            }
            if (!userResponse.ok) {
                throw new Error('사용자 정보를 불러오는 데 실패했습니다.');
            }

            // 응답 데이터 파싱
            const post = await postResponse.json();
            const userInfo = await userResponse.json();

            // [권한 체크 1] 로그인 상태 확인
            if (!userInfo.isAuthenticated) {
                showAlert('로그인이 필요합니다.', '알림', () => {
                    navigate('/user/login');
                });
                return;
            }

            // [권한 체크 2] 작성자 본인 확인
            if (post.userId !== userInfo.userId) {
                showAlert('본인이 작성한 글만 수정할 수 있습니다.', '권한 없음', () => {
                    navigate(-1); // history.back()
                });
                return;
            }

            // 기존 게시글 데이터를 state에 설정
            setTitle(post.pstTtl);
            setContent(post.pstCn);
            setAuthor(post.pblrNm);
        } catch (error) {
            console.error('게시글 로드 실패: ', error);
            showAlert(error.message, '오류', () => {
                navigate('board/list');
            });
        } finally {
            setLoading(false);
        }
    };

    /**
     * handleSubmit - 폼 제출 핸들러 (수정 요청)
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 입력값 검증
        if (!title.trim()) {
            showAlert('제목을 입력해주세요.');
            return;
        }
        if (!content.trim()) {
            showAlert('내용을 입력해주세요.');
            return;
        }

        try {
            setSubmitting(true);

            // 서버로 전송할 데이터
            const updateData = {
                pstTtl: title.trim(),
                pstCn: content.trim()
            };

            // PUT 요청으로 게시글 수정
            const response = await fetch(`/api/post/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData),
                credentials: 'include'
            });

            // HTTP 상태 코드별 처리
            if (response.status === 401) {
                showAlert('로그인이 필요합니다.', '알림', () => {
                    navigate('user/login');
                })
                return;
            }

            if (response.status === 403) {
                showAlert('수정 권한이 없습니다.')
                return;
            }

            if (!response.ok) {
                throw new Error('수정에 실패했습니다.');
            }

            //수정 성공
            showAlert('글이 성공적으로 수정되었습니다.', '완료', () => {
                navigate(`/board/detail/${id}`);
            })

        } catch (error) {
            console.error('수정 실패:', error);
            showAlert(error.message, '오류');
        } finally {
            setSubmitting(false);
        }
    };

    // [조건부 렌더링] 로딩 중
    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>글 수정</h2>

            <form onSubmit={handleSubmit}>
                {/* 제목 입력 */}
                <div className="mb-3">
                    <label htmlFor="pstTtl" className="form-label">제목</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pstTtl"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={submitting}
                    />
                </div>

                {/* 내용 입력 */}
                <div className="mb-3">
                    <label htmlFor="pstCn" className="form-label">내용</label>
                    <textarea
                        className="form-control"
                        id="pstCn"
                        rows="5"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        disabled={submitting}
                    />
                </div>

                {/* 작성자 (읽기 전용) */}
                <div className="mb-3">
                    <label htmlFor="pblrNm" className="form-label">작성자</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pblrNm"
                        value={author}
                        readOnly
                        style={{ backgroundColor: '#f8f9fa' }}
                    />
                </div>

                {/* 버튼 영역 */}
                <div className="d-flex justify-content-end mt-3">
                    {/* 취소 버튼 */}
                    <button
                        type="button"
                        className="btn btn-secondary me-2"
                        onClick={() => navigate(-1)}
                        disabled={submitting}
                    >
                        취소
                    </button>
                    {/* 수정 완료 버튼 */}
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                    >
                        {submitting ? '수정 중...' : '수정 완료'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PostEdit;