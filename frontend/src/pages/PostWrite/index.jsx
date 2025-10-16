/**
 * PostWrite/index.jsx - 게시글 작성 페이지
 * - 새 게시글 작성 폼
 * - 로그인한 사용자만 접근 가능 (권한 체크)
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../../components/common/AlertModal';

function PostWrite() {
    const navigate = useNavigate();

    // [상태 관리] 폼 입력값
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [nickname, setNickname] = useState('');
    const [loading, setLoading] = useState(false);              // 작성 요청 중 (중복 제출 방지)
    const [initialLoading, setInitialLoading] = useState(true); // 페이지 초기 로딩

    // [useEffect] 페이지 로드 시 로그인 상태 확인
    useEffect(() => {
        /**
         * checkUser - 사용자 인증 상태 확인
         * - 비로그인 시 로그인 페이지로 리다이렉트
         */
        const checkUser = async () => {
            try {
                const response = await fetch('/api/auth/me', {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('사용자 정보 조회 실패');
                }

                const userInfo = await response.json();

                // [권한 체크] 로그인 상태 확인
                if (!userInfo.isAuthenticated) {
                    showAlert('로그인이 필요합니다.', '알림', () => {
                        navigate('/user/login');
                    });
                    return;
                }

                // 닉네임 설정
                setNickname(userInfo.nickname);
            } catch (error) {
                console.error('사용자 정보 조회 실패:', error);
                showAlert('사용자 정보를 불러올 수 없습니다.', '오류', () => {
                    navigate('/user/login');
                });
            } finally {
                setInitialLoading(false);
            }
        };

        checkUser();
    }, [navigate]);

    /**
     * handleSubmit - 폼 제출 핸들러 (게시글 작성)
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
            setLoading(true);

            // 서버로 전송할 데이터 (JSON 형식)
            const postData = {
                pstTtl: title.trim(),
                pstCn: content.trim()
            };

            // POST 요청으로 게시글 작성
            const response = await fetch('/api/post/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData),
                credentials: 'include'
            });

            // HTTP 상태 코드별 처리
            if (response.status === 401) {
                // 인증 필요
                showAlert('로그인이 필요합니다.', '알림', () => {
                    navigate('/user/login');
                });
                return;
            }

            if (response.status === 403) {
                // 권한 없음
                showAlert('글 작성 권한이 없습니다.');
                return;
            }

            if (!response.ok) {
                throw new Error('글 작성에 실패했습니다.');
            }

            // 작성 성공 - 목록 페이지로 이동
            showAlert('글이 성공적으로 작성되었습니다.', '완료', () => {
                navigate('/board/list');
            });

        } catch (error) {
            console.error('글 작성 실패:', error);
            showAlert(error.message || '글 작성 중 오류가 발생했습니다.', '오류');
        } finally {
            setLoading(false);
        }
    };

    // [조건부 렌더링] 초기 로딩 중
    if (initialLoading) {
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
            <h2>글 작성</h2>

            <form onSubmit={handleSubmit}>
                {/* 제목 */}
                <div className="mb-3">
                    <label htmlFor="pstTtl" className="form-label">제목</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pstTtl"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={loading}
                    />
                </div>

                {/* 내용 */}
                <div className="mb-3">
                    <label htmlFor="pstCn" className="form-label">내용</label>
                    <textarea
                        className="form-control"
                        id="pstCn"
                        rows="5"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        disabled={loading}
                    />
                </div>

                {/* 작성자 (읽기 전용) */}
                <div className="mb-3">
                    <label htmlFor="pblrNm" className="form-label">작성자</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pblrNm"
                        value={nickname}
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
                        onClick={() => navigate('/board/list')}
                        disabled={loading}
                    >
                        취소
                    </button>
                    {/* 작성 완료 버튼 */}
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? '작성 중...' : '작성 완료'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PostWrite;
