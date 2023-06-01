import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage.js';
import AdmPage from './pages/AdmPage/AdmPage.js';
import SupPage from './pages/SupPage/index.js';
import ErrorPage from './pages/ErrorPage/ErrorPage.js';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<AdmPage />} />
        <Route path="/suporte" element={<SupPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;