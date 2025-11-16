// src/components/AdminSidebar.jsx
import {
  FaCalendarAlt,
  FaChartBar,
  FaHome,
  FaListAlt,
  FaTicketAlt,
  FaUsers,
} from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';
import {
  Link,
  useLocation,
} from 'react-router-dom';

export default function AdminSidebar() {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <aside className="admin-sidebar">
      <h2 className="sidebar-logo">NFTticket Admin</h2>

      <nav className="sidebar-nav">
        <Link to="/admin" className={isActive('/admin')}>
          <FaHome /> Trang chủ
        </Link>
        <Link to="/admin/events" className={isActive('/admin/events')}>
          <FaCalendarAlt /> Quản lý sự kiện
        </Link>
  
        <Link to="/admin/tickets" className={isActive('/admin/tickets')}>
          <FaTicketAlt /> Quản lý vé
        </Link>
        <Link to="/admin/users" className={isActive('/admin/users')}>
          <FaUsers /> Quản lý người dùng
        </Link>
        <Link to="/admin/categories" className={isActive('/admin/categories')}>
          <FaListAlt /> Danh mục sự kiện
        </Link>
        <Link to="/admin/reports" className={isActive('/admin/reports')}>
          <FaChartBar /> Báo cáo thống kê
        </Link>
      </nav>

      <div className="sidebar-bottom">
        <Link to="/admin/create-event" className="create-event-btn">
          <MdAddCircle size={20} /> Tạo sự kiện mới
        </Link>
      </div>
    </aside>
  );
}
