/**
 * useAuth.js - 사용자 인증 상태 관리 커스텀 훅
 * - 로그인된 사용자 정보를 가져오고 관리
 */
import { useState, useEffect } from 'react';

function useAuth() {

    // [상태 관리]
    const [user, setUser] = useState(null);                 // 사용자 정보 (로그인 안되어 있으면 null)
    const [loading, setLoading] = useState(true);   // 인증 확인 중인지 여부

    useEffect(() => {
        checkAuth();
    }, []);

    /**
     * checkAuth - 서버에서 현재 로그인 상태 확인
     */
    const checkAuth = async () => {
        try {
            // 서버에 인증 상태 확인 요청
            const response = await fetch('/api/auth/me',{
                credentials: 'include'  // 세션 쿠키 포함
            });

            if(!response.ok) {
                throw new Error('인증 확인 실패');
            }

            // JSON 응답 파싱
            const data = await response.json();

            // 서버에서 인증된 사용자 정보 반환 시
            if(data.isAuthenticated) {
                setUser({
                    userId: data.userId,
                    nickname: data.nickname
                });
            } else {
                // 비로그인 상태
                setUser(null);
            }
        } catch (error) {
            console.error('인증 확인 실패: ', error);
            // 에러 발생 시 비로그인 처리
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, checkAuth };
}

export default useAuth;