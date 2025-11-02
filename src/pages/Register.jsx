import '../styles/Register.css';

import React, { useState } from 'react';

import Turnstile from 'react-turnstile';

import authApi from '../api/authApi';
import ticketgoLogo from '../assets/images/logo.png';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [captchaToken, setCaptchaToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await authApi.register({ ...formData, captchaToken });
      setMessage(res.data.message || 'Đăng ký thành công!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Đăng ký thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card-small">
        <img src={ticketgoLogo} alt="TicketGo" className="logo-small" />
        <h2 className="form-title">ĐĂNG KÝ TÀI KHOẢN</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Tên đầy đủ <span className="required">*</span>
            </label>
            <input
              name="name"
              type="text"
              className="form-input"
              placeholder="Nhập tên đầy đủ"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Email <span className="required">*</span>
            </label>
            <input
              name="email"
              type="email"
              className="form-input"
              placeholder="Nhập email"
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
              className="form-input"
              placeholder="Nhập mật khẩu"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Nhập lại mật khẩu <span className="required">*</span>
            </label>
            <input
              name="confirmPassword"
              type="password"
              className="form-input"
              placeholder="Nhập lại mật khẩu"
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
            {loading ? 'Đang xử lý...' : 'ĐĂNG KÝ'}
          </button>

          {message && <p className="status-message">{message}</p>}

          <p className="login-switch">
            Đã có tài khoản? <a href="/login">Đăng nhập</a>
          </p>
        </form>
      </div>
    </div>
  );
}
