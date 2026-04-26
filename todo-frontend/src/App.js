import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [auth, setAuth] = useState(null); // will store { username, password }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={auth ? <Navigate to="/home" /> : <Login setAuth={setAuth} />} />
       <Route path="/home" element={auth ? <Home auth={auth} setAuth={setAuth} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;