import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Header() {
    const { user, loading } = useAuth();

    const handleLogout = async () => {
        try {
            await fetch('/logout', {
               method: 'POST',
               credentials: 'include'
            });
            window.location.href = "/";
        } catch (error) {
            console.error('로그아웃 실패: ', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">홈</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/board/list">게시판</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/animation/1">애니메이션1</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/animation/2">애니메이션2</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/animation/3">애니메이션3</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/animation/4">애니메이션4</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/animation/5">애니메이션5</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        {loading ? (
                            <li className="nav-item">
                                <span className="nav-link">로딩중...</span>
                            </li>
                        ) : user ? (
                            // 로그인 한 상태 - nickname 표시
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                >
                                    {user.nickname}님
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleLogout();
                                            }}
                                        >
                                            로그아웃
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            // 로그인 안 한 상태
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user/login">로그인</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user/signup">회원가입</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;