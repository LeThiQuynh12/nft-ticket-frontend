import '../styles/AdminDashboard.css';
import '../styles/admin.css';

import {
  FaCalendarAlt,
  FaChartLine,
  FaStar,
  FaTicketAlt,
} from 'react-icons/fa';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

const data = [
  { day: 'Mon', revenue: 12000000 },
  { day: 'Tue', revenue: 15000000 },
  { day: 'Wed', revenue: 11000000 },
  { day: 'Thu', revenue: 18000000 },
  { day: 'Fri', revenue: 22000000 },
  { day: 'Sat', revenue: 19000000 },
  { day: 'Sun', revenue: 25000000 },
];

export default function AdminDashboard() {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />

        <div className="dashboard-content">
          <div className="dashboard-header">
            <div>
              <h2 className="dashboard-title">Bảng điều khiển</h2>
              <p className="dashboard-subtitle">
                Tổng quan hoạt động hệ thống
              </p>
            </div>
          </div>

          {/* Cards thống kê */}
          <div className="dashboard-cards">
            <div className="card">
              <div className="card-icon">
                <FaCalendarAlt />
              </div>
              <div>
                <h3>Sự kiện đang hoạt động</h3>
                <p>8</p>
              </div>
            </div>

            <div className="card">
              <div className="card-icon">
                <FaTicketAlt />
              </div>
              <div>
                <h3>Vé đã bán</h3>
                <p>1,250</p>
              </div>
            </div>

            <div className="card highlight">
              <div className="card-icon">
                <FaChartLine />
              </div>
              <div>
                <h3>Doanh thu tháng này</h3>
                <p>85.400.000đ</p>
              </div>
            </div>
          </div>

          {/* Biểu đồ */}
          <div className="chart-section">
            <h3 className="chart-title">Biểu đồ doanh thu tuần</h3>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={data}   margin={{ top: 20, right: 30, left: 40, bottom: 10 }}>
                  <CartesianGrid stroke="#2a2a2a" strokeDasharray="3 3" />
                  <XAxis dataKey="day" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2ecc71"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sự kiện nổi bật */}
          <div className="top-event-section">
            <h3 className="chart-title">Sự kiện nổi bật nhất</h3>
            <div className="card top-event-card">
              <div className="event-icon">
                <FaStar />
              </div>
              <div>
                <h4>Hòa nhạc EDM 2025</h4>
                <p>Đã bán: <span>820 vé</span></p>
                <p>Doanh thu: <span>62.000.000đ</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
