import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { Posts } from './pages/post';

function App() {
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/post" element={<Posts/>} />
          <Route path="*" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
