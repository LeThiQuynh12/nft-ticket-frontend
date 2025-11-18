import '../styles/Register.css';

import React, {
  useRef,
  useState,
} from 'react';

import Turnstile from 'react-turnstile';

import authApi from '../api/authApi';
import ticketgoLogo from '../assets/images/logo.png';

export default function RegisterForm() {
  const [showOtpModal, setShowOtpModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const turnstileRef = useRef(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const passwordValid = (() => {
    const p = formData.password;
    return {
      length: p.length >= 8 && p.length <= 32,
      lower: /[a-z]/.test(p),
      upper: /[A-Z]/.test(p),
      number: /[0-9]/.test(p),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(p),
    };
  })();
  const allPasswordOk = Object.values(passwordValid).every(Boolean);

  const validateInput = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Tên không được bỏ trống";
    if (!formData.email.trim()) newErrors.email = "Email không được bỏ trống";
    if (!formData.password.trim())
      newErrors.password = "Mật khẩu không được bỏ trống";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp";

    if (!formData.agreeTerms)
      newErrors.agreeTerms = "Bạn cần đồng ý với điều khoản dịch vụ";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    setLoading(true);
    setMessage("");

    try {
      await authApi.register({ ...formData, captchaToken });
      setShowOtpModal(true); // mở popup OTP
      setMessage("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Đăng ký thất bại!");
      turnstileRef.current?.reset();
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setMessage("Vui lòng nhập OTP");
      return;
    }

    setLoading(true);

    try {
      await authApi.verifyOtp({
        email: formData.email,
        otp,
      });

      setMessage("Xác thực thành công! Hãy đăng nhập.");
      setShowOtpModal(false);
    } catch (err) {
      setMessage(err.response?.data?.message || "OTP không chính xác!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card-small">
        <img src={ticketgoLogo} className="logo-small" />

        <h2 className="form-title">ĐĂNG KÝ TÀI KHOẢN</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          {/* FULL NAME */}
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
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          {/* EMAIL */}
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
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          {/* PASSWORD */}
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
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="password-rules">
            <p className="request-text">Các yêu cầu về mật khẩu</p>
            <p className={passwordValid.length ? "ok" : "fail"}>
              Từ 8 - 32 ký tự
            </p>
            <p className={passwordValid.lower ? "ok" : "fail"}>Có chữ thường</p>
            <p className={passwordValid.upper ? "ok" : "fail"}>Có chữ in hoa</p>
            <p className={passwordValid.number ? "ok" : "fail"}>Có số</p>
            <p className={passwordValid.special ? "ok" : "fail"}>
              Có ký tự đặc biệt (!,@,$,%)
            </p>
          </div>

          {/* CONFIRM PASSWORD */}
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
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </div>

          {/* CAPTCHA */}
          <div className="captcha-box-small">
            <Turnstile
              ref={turnstileRef}
              theme="light"
              sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
              onSuccess={setCaptchaToken}
            />
          </div>

          {/* ==== CHECKBOX ĐỒNG Ý ==== */}
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.agreeTerms || false}
                onChange={(e) =>
                  setFormData({ ...formData, agreeTerms: e.target.checked })
                }
              />

              <p className="form-label">Đồng ý với</p>
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                các chính sách và điều kiện sử dụng của website
              </a>
              <span className="required">*</span>
            </label>
            {errors.agreeTerms && <p className="error">{errors.agreeTerms}</p>}
          </div>

          <button
            className="btn-register"
            type="submit"
            disabled={!allPasswordOk || loading}
          >
            {loading ? "Đang gửi OTP..." : "Đăng ký"}
          </button>

          {message && <p className="status-message">{message}</p>}
        </form>

        <p className="login-switch">
          Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
        </p>
      </div>

      {showOtpModal && (
        <div className="otp-modal-overlay">
          <div className="otp-modal">
            <h3>XÁC THỰC OTP</h3>
            <p>
              Chúng tôi đã gửi mã OTP đến email <b>{formData.email}</b>.
            </p>

            <input
              type="text"
              className="form-input"
              placeholder="Nhập OTP"
              onChange={(e) => setOtp(e.target.value)}
            />

            <button className="btn-register" onClick={handleVerifyOtp}>
              {loading ? "Đang xác thực..." : "Xác nhận OTP"}
            </button>

            <button
              className="btn-close"
              onClick={() => setShowOtpModal(false)}
            >
              Đóng
            </button>

            {message && <p className="status-message">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
