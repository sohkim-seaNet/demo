/**
 * App.jsx - 애플리케이션 라우팅 설정
 * - URL 경로에 따라 어떤 페이지를 보여줄지 관리
 */

// React와 라우터 관련 라이브러리
import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// 공통 레이아웃 컴포넌트
import Header from './components/layout/Header';
import AlertModal from './components/common/AlertModal';

// 페이지 컴포넌트들
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import PostWrite from './pages/PostWrite';
import PostEdit from './pages/PostEdit';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Animation1 from './pages/Animation1';
import Animation2 from './pages/Animation2';
import Animation3 from './pages/Animation3';
import Animation4 from './pages/Animation4';
import Animation5 from './pages/Animation5';

/**
 * Layout 컴포넌트
 *
 * [역할] 모든 페이지에 공통으로 적용되는 레이아웃 구조를 정의
 * - JSP의 <jsp:include>와 비슷한 개념
 *
 * [구조]
 * ┌───────────────────┐
 * │   <Header />      │ ← 모든 페이지 상단에 고정
 * ├───────────────────┤
 * │   <Outlet />      │ ← URL에 따라 내용이 바뀌는 영역
 * ├───────────────────┤
 * │   <AlertModal />  │ ← 알림이 필요할 때만 표시
 * └───────────────────┘
 */
function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <AlertModal />
        </>
    );
}

/**
 * App 컴포넌트 (메인 컴포넌트)
 *
 * [역할] 애플리케이션의 모든 라우팅 규칙을 정의
 * - Spring의 @RequestMapping과 비슷한 개념
 */
function App() {
  return (
      /* BrowserRouter: 브라우저 URL 감지 및 관리 */
      <BrowserRouter>
          {/* Routes: 여러 Route 중 일치하는 하나만 렌더링 */}
          <Routes>
              {/* 부모 Route: Layout을 모든 페이지의 공통 레이아웃으로 사용 */}
              <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/board/list" element={<PostList />} />
                  <Route path="/board/detail/:id" element={<PostDetail />} />
                  <Route path="/board/write" element={<PostWrite />} />
                  <Route path="/board/edit/:id" element={<PostEdit />} />
                  <Route path="/user/login" element={<Login />} />
                  <Route path="/user/signup" element={<Signup />} />

                  <Route path="/animation/1" element={<Animation1 />} />
                  <Route path="/animation/2" element={<Animation2 />} />
                  <Route path="/animation/3" element={<Animation3 />} />
                  <Route path="/animation/4" element={<Animation4 />} />
                  <Route path="/animation/5" element={<Animation5 />} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
