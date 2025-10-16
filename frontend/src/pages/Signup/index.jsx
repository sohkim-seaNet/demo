/**
 * Signup/index.jsx - 회원가입 페이지
 * - 실시간 아이디/닉네임 중복 확인
 * - 비밀번호 일치 여부 확인
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showAlert } from '../../components/common/AlertModal';

function Signup() {

    const navigate = useNavigate();

    // [상태 관리] 폼 입력값
    const [formData, setFormData] = useState({
        userId: '',
        userPwd: '',
        confirmPwd: '',
        userNm: '',
        nickname: ''
    });

    // [상태 관리] 중복 확인 결과
    const [userIdChecked, setUserIdChecked] = useState(false);      // 아이디 중복확인 통과 여부
    const [nicknameChecked, setNicknameChecked] = useState(false);  // 닉네임 중복확인 통과 여부

    // [상태 관리] 실시간 검증 메시지
    const [userIdMsg, setUserIdMsg] = useState('');     // 아이디 중복확인 메시지
    const [nicknameMsg, setNicknameMsg] = useState(''); // 닉네임 중복확인 메시지
    const [passwordMsg, setPasswordMsg] = useState(''); // 비밀번호 일치 여부 메시지

    // [useRef] 디바운싱용 타이머
    // - 사용자가 타이핑을 멈춘 후 0.5초 뒤에 중복확인 실행
    const userIdTimer = useRef(null);
    const nicknameTimer = useRef(null);

    // [상태 관리] 제출 중 여부
    const [submitting, setSubmitting] = useState(false);


    // [useEffect] 아이디 실시간 중복확인
    useEffect(() => {
        const userId = formData.userId.trim();

        // 중복확인 상태 초기화
        setUserIdChecked(false);

        // 기존 타이머 클리어
        if (userIdTimer.current) {
            clearTimeout(userIdTimer.current);
        }

        // 입력값이 없으면 메시지 제거
        if (!userId) {
            setUserIdMsg('');
            return;
        }

        // 로딩 상태 표시
        setUserIdMsg('loading');

        // 0.5초 후 중복확인 실행
        userIdTimer.current = setTimeout(async () => {
            try {
                const response = await fetch('/api/user/check-userid', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: userId }),
                    credentials: 'include'
                });

                if (!response.ok) throw new Error('아이디 중복확인 실패');

                const exists = await response.json();

                if (exists) {
                    setUserIdMsg('exists');
                    setUserIdChecked(false);
                } else {
                    setUserIdMsg('available');
                    setUserIdChecked(true);
                }

            } catch (error) {
                console.error('아이디 중복확인 에러:', error);
                setUserIdMsg('error');
                setUserIdChecked(false);
            }
        }, 500);

        // cleanup
        return () => {
            if (userIdTimer.current) {
                clearTimeout(userIdTimer.current);
            }
        };
    }, [formData.userId]);


    // [useEffect] 닉네임 실시간 중복확인
    useEffect(() => {
        const nickname = formData.nickname.trim();

        // 중복확인 상태 초기화
        setNicknameChecked(false);

        // 기존 타이머 클리어
        if (nicknameTimer.current) {
            clearTimeout(nicknameTimer.current);
        }

        // 입력값이 없으면 메시지 제거
        if (!nickname) {
            setNicknameMsg('');
            return;
        }

        // 로딩 상태 표시
        setNicknameMsg('loading');

        // 0.5초 후 중복확인 실행
        nicknameTimer.current = setTimeout(async () => {
            try {
                const response = await fetch('/api/user/check-nickname', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nickname: nickname }),
                    credentials: 'include'
                });

                if (!response.ok) throw new Error('닉네임 중복확인 실패');

                const exists = await response.json();

                if (exists) {
                    setNicknameMsg('exists');
                    setNicknameChecked(false);
                } else {
                    setNicknameMsg('available');
                    setNicknameChecked(true);
                }

            } catch (error) {
                console.error('닉네임 중복확인 에러:', error);
                setNicknameMsg('error');
                setNicknameChecked(false);
            }
        }, 500);

        // cleanup
        return () => {
            if (nicknameTimer.current) {
                clearTimeout(nicknameTimer.current);
            }
        };
    }, [formData.nickname]);

    // [useEffect] 비밀번호 일치 여부 실시간 확인
    useEffect(() => {
        if (formData.confirmPwd === '') {
            setPasswordMsg('');
            return;
        }

        if (formData.userPwd === formData.confirmPwd) {
            setPasswordMsg('match');    // 일치
        } else {
            setPasswordMsg('mismatch'); // 불일치
        }
    }, [formData.userPwd, formData.confirmPwd]);

    /**
     * handleChange - 입력값 변경 핸들러
     * - 모든 input의 onChange에서 호출
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * handleSubmit - 회원가입 폼 제출 핸들러
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // [입력값 검증]
        if (!formData.userId.trim()) {
            showAlert('아이디를 입력해주세요.');
            return;
        }
        if (!formData.userNm.trim()) {
            showAlert('이름을 입력해주세요.');
            return;
        }
        if (!formData.nickname.trim()) {
            showAlert('닉네임을 입력해주세요.');
            return;
        }
        if (!formData.userPwd.trim()) {
            showAlert('비밀번호를 입력해주세요.');
            return;
        }
        if (formData.userPwd !== formData.confirmPwd) {
            showAlert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 실시간 중복확인 결과 체크
        if (!userIdChecked) {
            showAlert('아이디를 다시 확인해주세요.');
            return;
        }
        if (!nicknameChecked) {
            showAlert('닉네임을 다시 확인해주세요.');
            return;
        }

        try {
            setSubmitting(true);

            // 서버로 전송할 데이터 (JSON 형식)
            const userData = {
                userId: formData.userId.trim(),
                userNm: formData.userNm.trim(),
                nickname: formData.nickname.trim(),
                userPwd: formData.userPwd.trim()
            };

            // POST 요청으로 회원가입
            const response = await fetch('/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
                credentials: 'include'
            });

            if (!response.ok) throw new Error('회원가입 실패');

            // 회원가입 성공 - 로그인 페이지로 이동
            showAlert('회원가입이 완료되었습니다.', 'Success', () => {
                navigate('/user/login');
            });

        } catch (error) {
            console.error('회원가입 에러:', error);
            showAlert('회원가입에 실패했습니다. 다시 시도해주세요.', 'Error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-end align-items-center mb-3">
                <Link to="/board/list" className="btn btn-outline-info btn-sm">
                    게시판으로
                </Link>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{ borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <div className="card-header">
                            <h4 className="mb-0 text-center">새 계정 만들기</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/* 아이디 입력 */}
                                <div className="mb-3">
                                    <label htmlFor="userId" className="form-label">아이디</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="userId"
                                        name="userId"
                                        value={formData.userId}
                                        onChange={handleChange}
                                        disabled={submitting}
                                        required
                                    />
                                    {/* 실시간 중복확인 메시지 */}
                                    <div className="form-text">
                                        {userIdMsg === 'loading' && (
                                            <span className="text-muted">
                                                확인 중... <span className="spinner-border spinner-border-sm"></span>
                                            </span>
                                        )}
                                        {userIdMsg === 'exists' && (
                                            <span className="text-danger">❌ 이미 사용중인 아이디입니다.</span>
                                        )}
                                        {userIdMsg === 'available' && (
                                            <span className="text-success">✅ 사용 가능한 아이디입니다.</span>
                                        )}
                                        {userIdMsg === 'error' && (
                                            <span className="text-danger">⚠️ 확인 중 오류가 발생했습니다.</span>
                                        )}
                                    </div>
                                </div>

                                {/* 비밀번호 입력 */}
                                <div className="mb-3">
                                    <label htmlFor="userPwd" className="form-label">비밀번호</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="userPwd"
                                        name="userPwd"
                                        value={formData.userPwd}
                                        onChange={handleChange}
                                        disabled={submitting}
                                        required
                                    />
                                </div>

                                {/* 비밀번호 확인 */}
                                <div className="mb-3">
                                    <label htmlFor="confirmPwd" className="form-label">비밀번호 확인</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPwd"
                                        name="confirmPwd"
                                        value={formData.confirmPwd}
                                        onChange={handleChange}
                                        disabled={submitting}
                                        required
                                    />
                                    {/* 비밀번호 일치 여부 메시지 */}
                                    <div className="form-text">
                                        {passwordMsg === 'match' && (
                                            <span className="text-success">✅ 비밀번호가 일치합니다.</span>
                                        )}
                                        {passwordMsg === 'mismatch' && (
                                            <span className="text-danger">❌ 비밀번호가 일치하지 않습니다.</span>
                                        )}
                                    </div>
                                </div>

                                {/* 이름 입력 */}
                                <div className="mb-3">
                                    <label htmlFor="userNm" className="form-label">이름</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="userNm"
                                        name="userNm"
                                        value={formData.userNm}
                                        onChange={handleChange}
                                        disabled={submitting}
                                        required
                                    />
                                </div>

                                {/* 닉네임 입력 */}
                                <div className="mb-3">
                                    <label htmlFor="nickname" className="form-label">닉네임</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nickname"
                                        name="nickname"
                                        value={formData.nickname}
                                        onChange={handleChange}
                                        disabled={submitting}
                                        required
                                    />
                                    {/* 실시간 중복확인 메시지 */}
                                    <div className="form-text">
                                        {nicknameMsg === 'loading' && (
                                            <span className="text-muted">
                                                확인 중... <span className="spinner-border spinner-border-sm"></span>
                                            </span>
                                        )}
                                        {nicknameMsg === 'exists' && (
                                            <span className="text-danger">❌ 이미 사용중인 닉네임입니다.</span>
                                        )}
                                        {nicknameMsg === 'available' && (
                                            <span className="text-success">✅ 사용 가능한 닉네임입니다.</span>
                                        )}
                                        {nicknameMsg === 'error' && (
                                            <span className="text-danger">⚠️ 확인 중 오류가 발생했습니다.</span>
                                        )}
                                    </div>
                                </div>

                                {/* 버튼 영역 */}
                                <div className="d-grid gap-2">
                                    {/* 회원가입 버튼 */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={submitting}
                                    >
                                        {submitting ? '회원가입 중...' : '회원가입'}
                                    </button>
                                    {/* 로그인 페이지로 이동 */}
                                    <Link to="/user/login" className="btn btn-light">
                                        로그인으로
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;