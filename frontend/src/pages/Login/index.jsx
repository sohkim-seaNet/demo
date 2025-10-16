/**
 * Login/index.jsx - 로그인 페이지
 * - 사용자 인증을 처리하는 폼
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../../components/common/AlertModal';

function Login() {
    const navigate = useNavigate();

    // [폼 제출 핸들러] 로그인 버튼 클릭 시 실행
    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!username || !password) {
            showAlert('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

            // 서버에 로그인 요청 (Spring의 /login 매핑과 연결)
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
                credentials: 'include'
            });

            const data = await response.json();

            if (data.success) {
                // 로그인 성공 - 메인 페이지로 이동
                navigate('/');
                window.location.reload();  // 헤더 사용자 정보 갱신
            } else {
                // 로그인 실패 - 에러 메시지 표시
                showAlert(data.message || '로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error('로그인 실패:', error);
            showAlert('로그인 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container mt-4">
            {/* 상단 게시판 이동 버튼 */}
            <div className="d-flex justify-content-end align-items-center mb-3">
                <button
                    className="btn btn-outline-info btn-sm"
                    onClick={() => navigate('/board/list')}
                >
                    게시판으로
                </button>
            </div>

            {/* 로그인 폼 영역 */}
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card" style={{
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div className="card-header">
                            <h4 className="mb-0 text-center">환영합니다!</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/* 아이디 입력 */}
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        아이디
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                    />
                                </div>
                                {/* 비밀번호 입력 */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        비밀번호
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                    />
                                </div>
                                {/* 버튼 영역 */}
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">
                                        로그인
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        onClick={() => navigate('/user/signup')}
                                    >
                                        회원가입
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;