import '../styles/admin.css';
import '../styles/AdminCategories.css'; // tái sử dụng style bảng + popup

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

const MOCK_ORDERS = [
  {
    id: 1001,
    customer: 'Nguyễn Văn A',
    phone: '0912345678',
    total: 250000,
    status: 'Pending',
    createdAt: 1698556800000,
    items: [
      { name: 'Task Premium', qty: 1, price: 150000 },
      { name: 'Support add-on', qty: 1, price: 100000 },
    ],
  },
  {
    id: 1002,
    customer: 'Trần Thị B',
    phone: '0987654321',
    total: 120000,
    status: 'Processing',
    createdAt: 1698643200000,
    items: [{ name: 'Task Basic', qty: 2, price: 60000 }],
  },
  {
    id: 1003,
    customer: 'Lê C',
    phone: '0909090909',
    total: 50000,
    status: 'Completed',
    createdAt: 1698729600000,
    items: [{ name: 'One-time job', qty: 1, price: 50000 }],
  },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filtered = useMemo(() => {
    let res = orders.filter((o) => {
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        String(o.id).includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.phone.includes(q)
      );
    });
    if (statusFilter !== 'All') {
      res = res.filter((o) => o.status === statusFilter);
    }
    return res.sort((a, b) => b.createdAt - a.createdAt);
  }, [orders, query, statusFilter]);

  function formatCurrency(v) {
    return v.toLocaleString('vi-VN') + ' ₫';
  }

  function deleteOrder(id) {
    if (!window.confirm('Bạn có chắc muốn xóa đơn hàng này?')) return;
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }

  function changeStatus(id, newStatus) {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />

        <div className="categories-content">
          <div className="categories-header">
            <h2>Quản lý Đơn hàng</h2>
            <button
              className="add-btn"
              onClick={() => alert('Chức năng tạo đơn mới (mock)')}
            >
              <MdAddCircle size={22} />
              Tạo đơn mới
            </button>
          </div>

          {/* Bộ lọc */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#1a1a1a',
                borderRadius: 8,
                padding: '6px 10px',
                flex: 1,
              }}
            >
              <FaSearch style={{ marginRight: 8 }} />
              <input
                placeholder="Tìm theo ID / tên khách / số điện thoại..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  flex: 1,
                }}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #333',
              }}
            >
              <option value="All">Tất cả trạng thái</option>
              <option value="Pending">Chờ xử lý</option>
              <option value="Processing">Đang xử lý</option>
              <option value="Completed">Hoàn thành</option>
              <option value="Cancelled">Đã huỷ</option>
            </select>
          </div>

          {/* Bảng đơn hàng */}
          <table className="categories-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Khách hàng</th>
                <th>Thanh toán</th>
                <th>Ngày</th>
                <th>Trạng thái</th>
                <th style={{ width: 180 }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 20 }}>
                    Không có đơn hàng
                  </td>
                </tr>
              ) : (
                filtered.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{o.customer}</div>
                      <div style={{ color: '#777', fontSize: 13 }}>
                        {o.phone}
                      </div>
                    </td>
                    <td>{formatCurrency(o.total)}</td>
                    <td>{new Date(o.createdAt).toLocaleString()}</td>
                    <td>
                      <span
                        style={{
                          color:
                            o.status === 'Pending'
                              ? '#f39c12'
                              : o.status === 'Processing'
                              ? '#3498db'
                              : o.status === 'Completed'
                              ? '#2ecc71'
                              : '#e74c3c',
                          fontWeight: 600,
                        }}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button
                          className="edit-btn"
                          onClick={() => setSelectedOrder(o)}
                          title="Chi tiết"
                        >
                          <FaRegFolderOpen />
                        </button>
                        <button
                          className="edit-btn"
                          onClick={() => {
                            const next =
                              o.status === 'Pending'
                                ? 'Processing'
                                : o.status === 'Processing'
                                ? 'Completed'
                                : 'Pending';
                            changeStatus(o.id, next);
                          }}
                          title="Cập nhật trạng thái"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteOrder(o.id)}
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

      {/* Popup chi tiết đơn hàng */}
      {selectedOrder && (
        <div
          className="popup-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="popup"
            onClick={(e) => e.stopPropagation()}
            style={{ width: 500 }}
          >
            <h3>Chi tiết đơn #{selectedOrder.id}</h3>
            <p>
              <strong>Khách hàng:</strong> {selectedOrder.customer}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {selectedOrder.phone}
            </p>
            <p>
              <strong>Ngày tạo:</strong>{' '}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Trạng thái:</strong> {selectedOrder.status}
            </p>

            <hr style={{ margin: '10px 0', borderColor: '#333' }} />

            <table className="categories-table" style={{ fontSize: 14 }}>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((it, i) => (
                  <tr key={i}>
                    <td>{it.name}</td>
                    <td>{it.qty}</td>
                    <td>{formatCurrency(it.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="popup-actions">
              <button
                className="btn-cancel"
                onClick={() => setSelectedOrder(null)}
              >
                Đóng
              </button>
              <button
                className="btn-save"
                onClick={() => {
                  changeStatus(selectedOrder.id, 'Completed');
                  setSelectedOrder(null);
                }}
              >
                Hoàn thành
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
