import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const headers = {
      'Authorization': 'Basic ' + btoa(username + ':' + password),
      'Content-Type': 'application/json'
    };
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/test-lock`, { headers });
      if (res.ok) {
        const meRes = await fetch(`${process.env.REACT_APP_API_URL}/api/get-me`, { headers });
        const meData = await meRes.json();
        setAuth({ username, password, id: meData.id });
        navigate('/home');
      } else {
        setError('Invalid username or password!');
      }
    } catch (err) {
      setError('Cannot connect to server!');
    }
  };

  const handleRegister = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/post-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) alert('User created! Now login.');
      else alert('Registration failed!');
    } catch (err) {
      alert('Cannot connect to server!');
    }
  };

 return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        margin: 0,
        backgroundColor: '#1e1f22',
        fontFamily: "'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
    }}>
        <div style={{
            backgroundColor: '#2b2d31',
            padding: '32px',
            borderRadius: '8px',
            width: '480px',
            boxShadow: '0 2px 10px 0 rgba(0,0,0,0.2)'
        }}>
            <h2 style={{
                color: '#ffffff',
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '20px',
                textAlign: 'center'
            }}>Login</h2> <h4 style={{
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '20px',
                textAlign: 'center'
            }}> kindly wait till the server starts :) reister if you are new then click login ;)git </h4>
            
            <input 
                placeholder="Username" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#1e1f22',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontSize: '16px',
                    marginBottom: '16px',
                    boxSizing: 'border-box'
                }}
            />
            
            <input 
                placeholder="Password" 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#1e1f22',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#ffffff',
                    fontSize: '16px',
                    marginBottom: '16px',
                    boxSizing: 'border-box'
                }}
            />
            
            {error && <p style={{ color: '#ed4245', fontSize: '14px', marginBottom: '16px' }}>{error}</p>}
            
            <button 
                onClick={handleLogin}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#5865f2',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    marginBottom: '12px'
                }}
            >Login</button>
            
            <button 
                onClick={handleRegister}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#4e5058',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer'
                }}
            >Register</button>
        </div>
    </div>
)
}

export default Login;