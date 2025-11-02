import '../styles/AdminUsers.css';
import '../styles/admin.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  FaEdit,
  FaEye,
  FaTrash,
  FaUsers,
} from 'react-icons/fa';

import userApi from '../../api/userApi';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch users từ backend khi load trang
  useEffect(() => {
    fetchUsers();
  }, []);

const fetchUsers = async () => {
  try {
    setLoading(true);
    const res = await userApi.getAll();

    if (!res.data || !res.data.users) throw new Error("Invalid API response");

    const formattedUsers = res.data.users.map(u => ({
      ...u,
      status: u.lockUntil ? 'Bị khóa' : 'Hoạt động',
      role: u.role === 'admin' ? 'Quản trị viên' : 'Người dùng'
    }));

    setUsers(formattedUsers);
  } catch (err) {
    console.error("❌ Lỗi khi load users", err);
    alert("Không thể tải danh sách người dùng");
  } finally {
    setLoading(false);
  }
};


  // 🟢 Xem thông tin
  const handleView = (user) => {
    setSelectedUser(user);
    setEditMode(false);
    setShowPopup(true);
  };

  // 🟡 Sửa
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditMode(true);
    setShowPopup(true);
  };

  // 🔴 Xoá
  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ Bạn chắc chắn muốn xoá user này?")) return;

    try {
      await userApi.delete(id);
      alert("✅ Xoá thành công");
      fetchUsers();
    } catch (err) {
      alert("❌ Lỗi khi xoá user");
    }
  };

  // ✅ Lưu sửa user
  const handleSave = async () => {
    try {
      await userApi.update(selectedUser._id, {
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role === 'Quản trị viên' ? 'admin' : 'user',
        status: selectedUser.status === 'Bị khóa' ? 'blocked' : 'active'
      });

      alert("✅ Cập nhật thành công");
      setShowPopup(false);
      fetchUsers();
    } catch (err) {
      alert("❌ Không thể cập nhật user");
    }
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

          {loading ? (
            <p>Đang tải...</p>
          ) : (
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
                  <tr key={u._id}>
                    <td>{u._id}</td>
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
                      <button className="icon-btn delete-btn" title="Xóa" onClick={() => handleDelete(u._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Popup */}
        {showPopup && selectedUser && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>{editMode ? "Chỉnh sửa người dùng" : "Thông tin người dùng"}</h3>

              <label>Họ tên</label>
              <input
                type="text"
                value={selectedUser.name}
                disabled={!editMode}
                onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              />

              <label>Email</label>
              <input
                type="text"
                value={selectedUser.email}
                disabled={!editMode}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              />

              <label>Vai trò</label>
              <select
                value={selectedUser.role}
                disabled={!editMode}
                onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
              >
                <option>Người dùng</option>
                <option>Quản trị viên</option>
              </select>

              <label>Trạng thái</label>
              <select
                value={selectedUser.status}
                disabled={!editMode}
                onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
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
