import '../styles/admin.css';
import '../styles/AdminCategories.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  FaEdit,
  FaRegFolderOpen,
  FaTrash,
} from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';

import categoryApi from '../../api/categoryApi';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  // 🟢 Lấy danh sách danh mục
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await categoryApi.getAll();
      setCategories(res.data.categories || []); // backend trả về { categories: [...] }
    } catch (err) {
      console.error("Lỗi tải danh mục:", err);
      alert("Không thể tải danh mục!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🟡 Mở popup thêm mới
  const handleOpenAdd = () => {
    setEditing(false);
    setFormData({ name: "", description: "" });
    setShowPopup(true);
  };

  // 🟠 Mở popup chỉnh sửa
  const handleEdit = (cat) => {
    setEditing(true);
    setCurrentId(cat._id);
    setFormData({ name: cat.name, description: cat.description });
    setShowPopup(true);
  };

  // 🔴 Xóa danh mục
  const handleDelete = async (id) => {
    if (!window.confirm("🗑️ Bạn có chắc muốn xóa danh mục này?")) return;
    try {
      await categoryApi.delete(id);
      alert("✅ Xóa thành công!");
      fetchCategories();
    } catch (err) {
      console.error("Lỗi xóa:", err);
      alert("❌ Không thể xóa danh mục!");
    }
  };

  // 🟢 Lưu danh mục (thêm hoặc cập nhật)
  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert("⚠️ Vui lòng nhập tên danh mục!");
      return;
    }

    try {
      if (editing) {
        await categoryApi.update(currentId, formData);
        alert("✅ Cập nhật thành công!");
      } else {
        await categoryApi.create(formData);
        alert("✅ Thêm danh mục thành công!");
      }

      setShowPopup(false);
      fetchCategories();
    } catch (err) {
      console.error("Lỗi lưu danh mục:", err);
      alert("❌ Không thể lưu danh mục!");
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />

        <div className="categories-content">
          <div className="categories-header">
            <h2>
              <FaRegFolderOpen className="icon-folder" /> Quản lý danh mục sự kiện
            </h2>

            <button className="add-btn" onClick={handleOpenAdd}>
              <MdAddCircle size={20} /> Thêm danh mục mới
            </button>
          </div>

          {loading ? (
            <p>⏳ Đang tải danh mục...</p>
          ) : (
            <table className="categories-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên danh mục</th>
                  <th>Mô tả</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      Không có danh mục nào.
                    </td>
                  </tr>
                ) : (
                  categories.map((cat, index) => (
                    <tr key={cat._id}>
                      <td>{index + 1}</td>
                      <td>{cat.name}</td>
                      <td>{cat.description}</td>
                      <td className="action-cell">
                        <button className="icon-btn edit-btn" onClick={() => handleEdit(cat)}>
                          <FaEdit />
                        </button>
                        <button className="icon-btn delete-btn" onClick={() => handleDelete(cat._id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Popup thêm/sửa */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>{editing ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</h3>

              <label>Tên danh mục <span style={{ color: "red" }}>*</span></label>
              <input
                type="text"
                placeholder="Nhập tên danh mục..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <label>Mô tả</label>
              <textarea
                rows="3"
                placeholder="Nhập mô tả danh mục..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

              <div className="popup-actions">
                <button className="btn-cancel" onClick={() => setShowPopup(false)}>
                  Hủy
                </button>
                <button className="btn-save" onClick={handleSave}>
                  {editing ? "Cập nhật" : "Lưu"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
