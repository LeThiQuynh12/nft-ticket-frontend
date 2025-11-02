import '../styles/Register.css';

import React, { useState } from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';
import Turnstile from 'react-turnstile';

import authApi from '../api/authApi';
import ticketgoLogo from '../assets/images/logo.png';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });
  const [captchaToken, setCaptchaToken] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await authApi.login({ ...data, captchaToken });
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      localStorage.setItem('role', res.data.user.role);

      if (res.data.user.role === 'admin') navigate('/admin');
      else navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Đăng nhập thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card-small">
        <img src={ticketgoLogo} alt="TicketGo" className="logo-small" />
        <h2 className="form-title">ĐĂNG NHẬP</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Email <span className="required">*</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Nhập email"
              required
              className="form-input"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Mật khẩu <span className="required">*</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              required
              className="form-input"
              onChange={handleChange}
            />
          </div>

          <div className="captcha-box-small">
            <Turnstile
              theme="light"
              sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
              onSuccess={setCaptchaToken}
            />
          </div>

          <button type="submit" className="btn-register" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
          </button>

          {message && <p className="status-message">{message}</p>}

          <p className="login-switch">
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
