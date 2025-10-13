import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import PostList from './pages/PostList';

// Layout 컴포넌트 - 모든 페이지에 공통 적용
function Layout() {
    return (
        <>
            <Header />
            <Outlet />
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
              </Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
