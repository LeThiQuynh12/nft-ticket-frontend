import '../styles/admin.css';
import '../styles/AdminCategories.css';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  FaEdit,
  FaRegCalendarAlt,
  FaTrash,
} from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import eventApi from '../../api/eventApi';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminEvents() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchEvents = async () => {
  try {
    setLoading(true);
    const res = await eventApi.getEvents({ includePrivate: true });
    // nếu dùng axios, data nằm trong res.data
    const eventsData = res.data?.events || res.events || [];
    setEvents(eventsData);
  } catch (err) {
    console.error("❌ Lỗi fetch sự kiện:", err);
    alert("Không thể tải danh sách sự kiện");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchEvents();
  }, []);


  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sự kiện này?")) return;

    try {
      await eventApi.deleteEvent(id);
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert("Xóa thất bại");
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
              <FaRegCalendarAlt className="icon-folder" /> Quản lý sự kiện
            </h2>
            <button
              className="add-btn"
              onClick={() => navigate("/admin/create-event")}
            >
              <MdAddCircle size={20} /> Thêm sự kiện mới
            </button>
          </div>

          {loading ? (
            <p>Đang tải sự kiện...</p>
          ) : (
            <table className="categories-table">
<thead>
  <tr>
    <th>Tên sự kiện</th>
    <th>Hình thức</th>
    <th>Địa điểm</th>
    <th>Thời gian</th>
    <th>Quyền</th>
    <th>Danh mục</th>
    <th>Người tạo</th>
    <th>Vé</th>
    <th>Thanh toán</th>
    <th>Người tham dự</th> {/* Thêm cột mới */}
    <th>Thao tác</th>
  </tr>
</thead>
<tbody>
  {events.length === 0 ? (
    <tr>
      <td colSpan="11" style={{ textAlign: "center" }}>
        Không có sự kiện
      </td>
    </tr>
  ) : (
    events.map((ev) => (
      <tr key={ev._id}>
        <td>{ev.name}</td>
        <td>{ev.mode === "online" ? "Online" : "Offline"}</td>
        <td>
          {ev?.location
            ? `${ev.location.name}, ${ev.location.ward}, ${ev.location.district}, ${ev.location.province} - ${ev.location.addressDetail}`
            : "—"}
        </td>
        <td>
          {ev.startAt
            ? new Date(ev.startAt).toLocaleDateString()
            : ""}
          {" → "}
          {ev.endAt
            ? new Date(ev.endAt).toLocaleDateString()
            : ""}
        </td>
        <td>{ev.privacy === "private" ? "Riêng tư" : "Công khai"}</td>
        <td>{ev.category?.name || "—"}</td>
        <td>{ev.createdBy?.email || ev.createdBy || "—"}</td>
        <td>
          {ev.ticketTypes?.length > 0
            ? ev.ticketTypes
                .map((t) => `${t.name}: ${t.totalQuantity}`)
                .join(", ")
            : "—"}
        </td>
        <td>
          {ev.paymentInfo?.bankName
            ? `${ev.paymentInfo.bankName} (${ev.paymentInfo.accountNumber})`
            : "—"}
        </td>
        {/* Cột mới: Quản lý người tham dự */}
        <td>
          <button
            className="manage-attendees-btn"
            onClick={() => navigate(`/admin/tickets?eventId=${ev._id}`)}
          >
            Quản lý
          </button>
        </td>
        <td className="action-cell">
          <button
            className="icon-btn edit-btn"
            onClick={() => navigate(`/admin/create-event`)}
          >
            <FaEdit />
          </button>
          <button
            className="icon-btn delete-btn"
            onClick={() => handleDelete(ev._id)}
          >
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
      </div>
    </div>
  );
}
