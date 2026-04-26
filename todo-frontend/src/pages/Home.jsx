import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ auth, setAuth }) {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDes, setEditDes] = useState('');
  const navigate = useNavigate();

  const headers = {
    'Authorization': 'Basic ' + btoa(auth.username + ':' + auth.password),
    'Content-Type': 'application/json'
  };

  const fetchTodos = async () => {
    const res = await fetch('http://localhost:8080/api/get-all', { headers });
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async () => {
    if (!title || !des) return alert('Fill both fields!');
    const res = await fetch('http://localhost:8080/api/post-todo', {
      method: 'POST',
      headers,
      body: JSON.stringify({ title, des })
    });
    if (res.ok) {
      setTitle('');
      setDes('');
      fetchTodos();
    }
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:8080/api/delete-todo/${id}`, {
      method: 'DELETE',
      headers
    });
    fetchTodos();
  };

  const openEdit = (todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
    setEditDes(todo.des);
  };

  const saveEdit = async () => {
    await fetch(`http://localhost:8080/api/update-title/${editId}`, {
      method: 'PATCH',
      headers,
      body: editTitle
    });
    await fetch(`http://localhost:8080/api/update-desc/${editId}`, {
      method: 'PATCH',
      headers,
      body: editDes
    });
    setEditId(null);
    fetchTodos();
  };

  const deleteAccount = async () => {
    const confirm = window.confirm('Are you sure you want to delete your account?');
    if (!confirm) return;
    await fetch(`http://localhost:8080/api/delete-user/${auth.id}`, {
      method: 'DELETE',
      headers
    });
    setAuth(null);
    navigate('/');
  };

  const logout = () => {
    setAuth(null);
    navigate('/');
  };

  return (
    <div style={{
      backgroundColor: '#1e1f22',
      minHeight: '100vh',
      fontFamily: "'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        padding: '28px',
        boxShadow: '0 2px 10px 0 rgba(0,0,0,0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '28px',
          paddingBottom: '16px',
          borderBottom: '1px solid #1e1f22'
        }}>
          <h2 style={{
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: '600',
            margin: 0
          }}>Welcome, {auth.username}! :)</h2>
          <div>
            <button onClick={logout} style={{
              backgroundColor: '#4e5058',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 14px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              marginRight: '10px',
              transition: 'background-color 0.2s'
            }}>Logout</button>
            <button onClick={deleteAccount} style={{
              backgroundColor: '#da373c',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 14px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}>Delete Account</button>
          </div>
        </div>

        <div style={{
          backgroundColor: '#1e1f22',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <input 
            placeholder="Title" 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#2b2d31',
              border: 'none',
              borderRadius: '4px',
              color: '#ffffff',
              fontSize: '16px',
              marginBottom: '12px',
              boxSizing: 'border-box'
            }}
          />
          <input 
            placeholder="Description" 
            value={des} 
            onChange={e => setDes(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#2b2d31',
              border: 'none',
              borderRadius: '4px',
              color: '#ffffff',
              fontSize: '16px',
              marginBottom: '12px',
              boxSizing: 'border-box'
            }}
          />
          <button onClick={createTodo} style={{
            backgroundColor: '#5865f2',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 16px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}>Create Todo</button>
        </div>

        <div>
          <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Your Todos:</h3>
          {todos.length === 0 && (
            <p style={{ color: '#949ba4', textAlign: 'center', padding: '40px' }}>No todos yet!</p>
          )}
          {todos.map(todo => (
            <div key={todo.id} style={{
              backgroundColor: '#1e1f22',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '12px'
            }}>
              {editId === todo.id ? (
                <div>
                  <input 
                    value={editTitle} 
                    onChange={e => setEditTitle(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#2b2d31',
                      border: 'none',
                      borderRadius: '4px',
                      color: '#ffffff',
                      fontSize: '14px',
                      marginBottom: '12px',
                      boxSizing: 'border-box'
                    }}
                  />
                  <input 
                    value={editDes} 
                    onChange={e => setEditDes(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#2b2d31',
                      border: 'none',
                      borderRadius: '4px',
                      color: '#ffffff',
                      fontSize: '14px',
                      marginBottom: '12px',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button onClick={saveEdit} style={{
                    backgroundColor: '#5865f2',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    marginRight: '8px'
                  }}>Save</button>
                  <button onClick={() => setEditId(null)} style={{
                    backgroundColor: '#4e5058',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}>Cancel</button>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <b style={{ color: '#ffffff', fontSize: '16px', display: 'block', marginBottom: '8px' }}>{todo.title}</b>
                      <p style={{ color: '#949ba4', fontSize: '14px', margin: 0 }}>{todo.des}</p>
                    </div>
                    <div>
                      <button onClick={() => openEdit(todo)} style={{
                        backgroundColor: '#5865f2',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        marginRight: '8px'
                      }}>Edit</button>
                      <button onClick={() => deleteTodo(todo.id)} style={{
                        backgroundColor: '#da373c',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}>Delete</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;