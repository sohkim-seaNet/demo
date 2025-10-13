import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="main-content" style={{
            height: 'calc(100vh - 56px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card" style={{
                            borderRadius: '10px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            padding: '2rem'
                        }}>
                            <div className="text-center">
                                <h1 className="mb-4">게시판 시스템</h1>
                                <p className="text-muted mb-4">간단한 게시판입니다</p>

                                <div className="d-grid gap-3">
                                    <Link to="/board/list" className="btn btn-primary btn-lg">
                                        게시판 보기
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
