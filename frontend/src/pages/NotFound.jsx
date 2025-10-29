// src/pages/NotFound.jsx
import React from 'react';

function NotFound() {
    return (
        <div style={styles.container}>
            <h1 style={styles.code}>404</h1>
            <p style={styles.message}>요청하신 페이지를 찾을 수 없습니다.</p>
            <button style={styles.button} onClick={() => window.location.href = '/'}>
                홈으로 돌아가기
            </button>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '80px 20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#333'
    },
    code: {
        fontSize: '96px',
        fontWeight: 'bold',
        marginBottom: '24px',
        color: '#ff6b6b'
    },
    message: {
        fontSize: '24px',
        marginBottom: '12px'
    },
    button: {
        backgroundColor: '#1e90ff',
        color: '#fff',
        border: 'none',
        padding: '12px 32px',
        fontSize: '16px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    }
};

export default NotFound;
