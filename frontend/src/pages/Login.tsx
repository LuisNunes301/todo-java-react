import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import stylesLogin from './Login.module.css';
import type { AxiosError } from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token, res.data.user);
      navigate(from, { replace: true });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
          setError(
        error.response?.data?.message || 
        'Falha no login. Verifique suas credenciais.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={stylesLogin.container}>
      <form onSubmit={handleSubmit} className={stylesLogin.form}>
        <h2 className={stylesLogin.title}>Faça o login</h2>
        
        {error && (
          <div className={stylesLogin.error}>{error}</div>
        )}
        
        <input 
          type="email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className={stylesLogin.input} 
          placeholder="Email" 
          required
        />
        
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className={stylesLogin.input} 
          placeholder="Senha" 
          required
        />
        
        <button 
          type="submit" 
          className={stylesLogin.button}
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}