import '../styles/AdminUsers.css';
import '../styles/admin.css';

import React, { useState } from 'react';

import {
  FaEdit,
  FaEye,
  FaTrash,
  FaUsers,
} from 'react-icons/fa';

import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Nguyễn Văn A', email: 'vana@example.com', role: 'Người dùng', status: 'Hoạt động' },
    { id: 2, name: 'Trần Thị B', email: 'thib@example.com', role: 'Quản trị viên', status: 'Hoạt động' },
    { id: 3, name: 'Lê Văn C', email: 'levc@example.com', role: 'Người dùng', status: 'Bị khóa' },
    { id: 4, name: 'Phạm Thị D', email: 'phamtd@example.com', role: 'Người dùng', status: 'Hoạt động' },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // 🟢 Xem chi tiết
  const handleView = (user) => {
    setSelectedUser(user);
    setEditMode(false);
    setShowPopup(true);
  };

  // 🟡 Sửa thông tin
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditMode(true);
    setShowPopup(true);
  };

  // 🔴 Xóa người dùng
  const handleDelete = (id) => {
    if (window.confirm('⚠️ Bạn có chắc muốn xóa người dùng này?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // ✅ Lưu thông tin sửa
  const handleSave = () => {
    setUsers(
      users.map((u) => (u.id === selectedUser.id ? selectedUser : u))
    );
    setShowPopup(false);
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />

        <div className="users-content">
          <div className="users-header">
            <h2><FaUsers className="icon-users" /> Quản lý người dùng</h2>
          </div>

          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td className={u.status === 'Bị khóa' ? 'status-locked' : 'status-active'}>
                    {u.status}
                  </td>
                  <td className="action-cell">
                    <button className="icon-btn view-btn" title="Xem" onClick={() => handleView(u)}>
                      <FaEye />
                    </button>
                    <button className="icon-btn edit-btn" title="Sửa" onClick={() => handleEdit(u)}>
                      <FaEdit />
                    </button>
                    <button className="icon-btn delete-btn" title="Xóa" onClick={() => handleDelete(u.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Popup chi tiết/sửa người dùng */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>{editMode ? 'Chỉnh sửa người dùng' : 'Thông tin người dùng'}</h3>

              <label>Họ tên</label>
              <input
                type="text"
                value={selectedUser.name}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                disabled={!editMode}
              />

              <label>Email</label>
              <input
                type="text"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                disabled={!editMode}
              />

              <label>Vai trò</label>
              <select
                value={selectedUser.role}
                onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                disabled={!editMode}
              >
                <option>Người dùng</option>
                <option>Quản trị viên</option>
              </select>

              <label>Trạng thái</label>
              <select
                value={selectedUser.status}
                onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                disabled={!editMode}
              >
                <option>Hoạt động</option>
                <option>Bị khóa</option>
              </select>

              <div className="popup-actions">
                <button className="btn-cancel" onClick={() => setShowPopup(false)}>
                  Đóng
                </button>
                {editMode && (
                  <button className="btn-save" onClick={handleSave}>
                    Lưu thay đổi
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
