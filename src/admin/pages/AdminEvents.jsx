import '../styles/admin.css';
import '../styles/AdminCategories.css';

import React, { useState } from 'react';

import {
  FaEdit,
  FaRegCalendarAlt,
  FaTrash,
} from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';

import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminEvents() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Hòa nhạc mùa thu 2025',
      type: 'Ca nhạc',
      location: 'Nhà hát lớn Hà Nội',
      date: '2025-11-10',
      status: 'Sắp diễn ra',
    },
    {
      id: 2,
      name: 'Triển lãm mỹ thuật trẻ',
      type: 'Văn hóa nghệ thuật',
      location: 'Trung tâm triển lãm Giảng Võ',
      date: '2025-09-15',
      status: 'Đã kết thúc',
    },
    {
      id: 3,
      name: 'Giải Marathon Đà Nẵng',
      type: 'Thể thao',
      location: 'Đà Nẵng',
      date: '2025-12-05',
      status: 'Đang mở bán',
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    date: '',
    status: '',
  });

  const handleOpenAdd = () => {
    setEditing(false);
    setFormData({ name: '', type: '', location: '', date: '', status: '' });
    setShowPopup(true);
  };

  const handleEdit = (ev) => {
    setEditing(true);
    setCurrentId(ev.id);
    setFormData({
      name: ev.name,
      type: ev.type,
      location: ev.location,
      date: ev.date,
      status: ev.status,
    });
    setShowPopup(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('🗑️ Bạn có chắc muốn xóa sự kiện này?')) {
      setEvents(events.filter((e) => e.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      alert('⚠️ Vui lòng nhập tên sự kiện!');
      return;
    }
    if (editing) {
      setEvents(events.map((ev) =>
        ev.id === currentId ? { ...ev, ...formData } : ev
      ));
    } else {
      const newEvent = {
        id: events.length + 1,
        ...formData,
      };
      setEvents([...events, newEvent]);
    }
    setShowPopup(false);
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />

        <div className="categories-content">
          <div className="categories-header">
            <h2>
              <FaRegCalendarAlt className="icon-folder" /> Quản lý sự kiện
            </h2>

            <button className="add-btn" onClick={handleOpenAdd}>
              <MdAddCircle size={20} /> Thêm sự kiện mới
            </button>
          </div>

          <table className="categories-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên sự kiện</th>
                <th>Loại</th>
                <th>Địa điểm</th>
                <th>Ngày diễn ra</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {events.map((ev) => (
                <tr key={ev.id}>
                  <td>{ev.id}</td>
                  <td>{ev.name}</td>
                  <td>{ev.type}</td>
                  <td>{ev.location}</td>
                  <td>{ev.date}</td>
                  <td>
                    <span
                      style={{
                        color:
                          ev.status === 'Đang mở bán'
                            ? '#2ecc71'
                            : ev.status === 'Sắp diễn ra'
                            ? '#f1c40f'
                            : '#e74c3c',
                      }}
                    >
                      {ev.status}
                    </span>
                  </td>
                  <td className="action-cell">
                    <button className="icon-btn edit-btn" onClick={() => handleEdit(ev)}>
                      <FaEdit />
                    </button>
                    <button className="icon-btn delete-btn" onClick={() => handleDelete(ev.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* POPUP THÊM / SỬA SỰ KIỆN */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>{editing ? 'Chỉnh sửa sự kiện' : 'Thêm sự kiện mới'}</h3>

              <label>Tên sự kiện</label>
              <input
                type="text"
                placeholder="Nhập tên sự kiện..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <label>Loại sự kiện</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="">Chọn loại</option>
                <option>Ca nhạc</option>
                <option>Tham quan</option>
                <option>Văn hóa nghệ thuật</option>
                <option>Thể thao</option>
                <option>Workshop</option>
              </select>

              <label>Địa điểm</label>
              <input
                type="text"
                placeholder="Nhập địa điểm tổ chức..."
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />

              <label>Ngày diễn ra</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />

              <label>Trạng thái</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="">Chọn trạng thái</option>
                <option>Đang mở bán</option>
                <option>Sắp diễn ra</option>
                <option>Đã kết thúc</option>
              </select>

              <div className="popup-actions">
                <button className="btn-cancel" onClick={() => setShowPopup(false)}>Hủy</button>
                <button className="btn-save" onClick={handleSave}>
                  {editing ? 'Cập nhật' : 'Lưu'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
