import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import stylesLogin from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token);
      navigate('/');
    } catch {
      alert('Credenciais inválidas');
    }
  };

  return (
    <div className={stylesLogin.container}>
      
    <form onSubmit={handleSubmit} className={stylesLogin.form} >
      <h2 className={stylesLogin.title}>Faça o login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className={stylesLogin.input} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={stylesLogin.input} placeholder="Senha" />
      <button type="submit" className={stylesLogin.button}>Entrar</button>
    </form>
    </div>
  );
}
