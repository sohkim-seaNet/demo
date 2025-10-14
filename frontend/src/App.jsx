import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import AlertModal from './components/common/AlertModal';
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import PostWrite from './pages/PostWrite';
import Login from './pages/Login';

// Layout 컴포넌트 - 모든 페이지에 공통 적용
function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <AlertModal />
        </>
    );
}

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route element={<Layout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/board/list" element={<PostList />} />
                  <Route path="/board/detail/:id" element={<PostDetail />} />
                  <Route path="/board/write" element={<PostWrite />} />
                  <Route path="/user/login" element={<Login />} />
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
