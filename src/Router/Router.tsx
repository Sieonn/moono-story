import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WorldView from 'pages/WorldView';
import Intro from 'pages/Intro';
import LoginPage from 'pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import RegisterPage from 'pages/RegisterPage';
import Main from 'pages/Main';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<WorldView />} />
        <Route path="/" element={<Intro />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          {/* 로그인이 필요한 라우트 같은 경우에는 아래에 작성. */}
          <Route path="/start" element={<WorldView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
