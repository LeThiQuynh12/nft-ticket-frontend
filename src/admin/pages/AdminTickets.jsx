import '../styles/admin.css';
import '../styles/AdminCategories.css';
import '../styles/AdminTickets.css'; // file css riêng cho trang vé

import React, {
  useMemo,
  useState,
} from 'react';

import {
  FaEdit,
  FaRegFolderOpen,
  FaSearch,
  FaTrash,
} from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';

import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const MOCK_TICKETS = [
  {
    id: 2001,
    code: 'TCK-202410-001',
    buyer: 'Nguyễn Văn A',
    event: 'Hội nghị Công nghệ 2025',
    type: 'VIP',
    price: 500000,
    status: 'Unused',
    createdAt: 1698729600000,
  },
  {
    id: 2002,
    code: 'TCK-202410-002',
    buyer: 'Trần Thị B',
    event: 'Workshop ReactJS',
    type: 'Standard',
    price: 200000,
    status: 'Used',
    createdAt: 1698816000000,
  },
  {
    id: 2003,
    code: 'TCK-202410-003',
    buyer: 'Phạm C',
    event: 'Music Festival',
    type: 'VIP',
    price: 800000,
    status: 'Cancelled',
    createdAt: 1698902400000,
  },
];

export default function AdminTickets() {
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const filtered = useMemo(() => {
    let res = tickets.filter((t) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        t.code.toLowerCase().includes(q) ||
        t.buyer.toLowerCase().includes(q) ||
        t.event.toLowerCase().includes(q)
      );
    });
    if (statusFilter !== 'All') {
      res = res.filter((t) => t.status === statusFilter);
    }
    return res.sort((a, b) => b.createdAt - a.createdAt);
  }, [tickets, query, statusFilter]);

  function formatCurrency(v) {
    return v.toLocaleString('vi-VN') + ' ₫';
  }

  function deleteTicket(id) {
    if (!window.confirm('Bạn có chắc muốn xóa vé này?')) return;
    setTickets((prev) => prev.filter((t) => t.id !== id));
  }

  function changeStatus(id, newStatus) {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />

        <div className="categories-content">
          <div className="categories-header">
            <h2>Quản lý Vé</h2>
            <button
              className="add-btn"
              onClick={() => alert('Chức năng thêm vé mới (mock)')}
            >
              <MdAddCircle size={22} />
              Thêm vé mới
            </button>
          </div>

          {/* Bộ lọc */}
          <div className="ticket-filter">
            <div className="ticket-search">
              <FaSearch style={{ marginRight: 8 }} />
              <input
                placeholder="Tìm theo mã / tên người mua / sự kiện..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">Tất cả trạng thái</option>
              <option value="Unused">Chưa sử dụng</option>
              <option value="Used">Đã sử dụng</option>
              <option value="Cancelled">Đã hủy</option>
            </select>
          </div>

          {/* Bảng vé */}
          <table className="categories-table">
            <thead>
              <tr>
                <th>Mã vé</th>
                <th>Người mua</th>
                <th>Sự kiện</th>
                <th>Loại vé</th>
                <th>Giá</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th style={{ width: 180 }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: 20 }}>
                    Không có vé nào
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id}>
                    <td>{t.code}</td>
                    <td>{t.buyer}</td>
                    <td>{t.event}</td>
                    <td>{t.type}</td>
                    <td>{formatCurrency(t.price)}</td>
                    <td>
                      <span
                        className={`status-tag status-${t.status.toLowerCase()}`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td>{new Date(t.createdAt).toLocaleString()}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button
                          className="edit-btn"
                          onClick={() => setSelectedTicket(t)}
                          title="Chi tiết"
                        >
                          <FaRegFolderOpen />
                        </button>
                        <button
                          className="edit-btn"
                          onClick={() => {
                            const next =
                              t.status === 'Unused'
                                ? 'Used'
                                : t.status === 'Used'
                                ? 'Cancelled'
                                : 'Unused';
                            changeStatus(t.id, next);
                          }}
                          title="Cập nhật trạng thái"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteTicket(t.id)}
                          title="Xóa"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup chi tiết vé */}
      {selectedTicket && (
        <div
          className="popup-overlay"
          onClick={() => setSelectedTicket(null)}
        >
          <div
            className="popup"
            onClick={(e) => e.stopPropagation()}
            style={{ width: 450 }}
          >
            <h3>Chi tiết vé {selectedTicket.code}</h3>
            <p><strong>Người mua:</strong> {selectedTicket.buyer}</p>
            <p><strong>Sự kiện:</strong> {selectedTicket.event}</p>
            <p><strong>Loại vé:</strong> {selectedTicket.type}</p>
            <p><strong>Giá:</strong> {formatCurrency(selectedTicket.price)}</p>
            <p><strong>Trạng thái:</strong> {selectedTicket.status}</p>
            <p>
              <strong>Ngày tạo:</strong>{' '}
              {new Date(selectedTicket.createdAt).toLocaleString()}
            </p>

            <div className="popup-actions">
              <button
                className="btn-cancel"
                onClick={() => setSelectedTicket(null)}
              >
                Đóng
              </button>
              <button
                className="btn-save"
                onClick={() => {
                  changeStatus(selectedTicket.id, 'Used');
                  setSelectedTicket(null);
                }}
              >
                Đánh dấu đã sử dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
