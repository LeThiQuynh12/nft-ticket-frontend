// src/admin/components/AdminHeader.jsx
import React from 'react';

import {
  FaSignOutAlt,
  FaUserCircle,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import authApi from '../../api/authApi'; // tùy đường dẫn của bạn

export default function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        // (tuỳ chọn) gọi API xóa refresh token trong DB
        await authApi.logout({ refreshToken });
      }
    } catch (err) {
      console.error("Lỗi khi đăng xuất:", err);
    } finally {
      // ✅ Xóa toàn bộ token và thông tin user
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");

      // ✅ Điều hướng về trang đăng nhập
      navigate("/login");
    }
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <h1 className="admin-logo">NFTticket</h1>
      </div>
      <div className="admin-header-right">
        <div className="account">
          <FaUserCircle size={24} />
          <span>Quản trị viên</span>
          <button className="btn-logout" onClick={handleLogout}>
            <FaSignOutAlt size={20} /> Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
}
