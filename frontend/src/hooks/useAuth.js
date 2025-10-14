import { useState, useEffect } from 'react';

function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/me',{
                credentials: 'include'  // 세션 쿠키 포함
            });

            if(!response.ok) {
                throw new Error('인증 확인 실패');
            }

            const data = await response.json();

            if(data.isAuthenticated) {
                setUser({
                    userId: data.userId,
                    nickname: data.nickname
                });
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('인증 확인 실패: ', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    return { user, loading, checkAuth };
}

export default useAuth;