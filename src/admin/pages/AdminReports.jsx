import '../styles/admin.css';
import '../styles/AdminReports.css';

import React, {
  useMemo,
  useState,
} from 'react';

import {
  FaArrowDown,
  FaArrowUp,
  FaChartPie,
  FaMoneyBillWave,
  FaShoppingCart,
  FaTicketAlt,
} from 'react-icons/fa';
import {
  Bar,
  BarChart,
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

const MOCK_STATS = {
  revenue: 200000,
  growth: 2.5, // tăng trưởng so với kỳ trước (%)
  totalTickets: 12,
  totalOrders: 12,
  events: [
    { name: 'Tech Conf', revenue: 4500000, tickets: 120 },
    { name: 'Music Fest', revenue: 3000000, tickets: 80 },
    { name: 'Workshop', revenue: 2500000, tickets: 60 },
    { name: 'Startup Meetup', revenue: 1500000, tickets: 40 },
  ],
  monthlyRevenue: [
    { month: 'T1', revenue: 2000000, tickets: 120 },
    { month: 'T2', revenue: 1500000, tickets: 90 },
    { month: 'T3', revenue: 1800000, tickets: 110 },
    { month: 'T4', revenue: 2200000, tickets: 140 },
    { month: 'T5', revenue: 2400000, tickets: 160 },
    { month: 'T6', revenue: 2600000, tickets: 180 },
  ],
};

export default function AdminReports() {
  const [data] = useState(MOCK_STATS);
  const [filter, setFilter] = useState('6m'); // bộ lọc 6 tháng gần nhất

  const topEvents = useMemo(
    () => [...data.events].sort((a, b) => b.revenue - a.revenue),
    [data.events]
  );

  function formatCurrency(v) {
    return v.toLocaleString('vi-VN') + ' ₫';
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />

        <div className="reports-content">
          <div className="reports-header">
            <div>
              <h2 className="reports-title">Báo cáo thống kê</h2>
              <p>Phân tích hiệu suất và xu hướng doanh thu hệ thống</p>
            </div>

            <select
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="3m">3 tháng gần nhất</option>
              <option value="6m">6 tháng gần nhất</option>
              <option value="12m">12 tháng</option>
            </select>
          </div>

          {/* Tổng quan */}
          <div className="report-summary">
            <div className="summary-card highlight">
              <FaMoneyBillWave className="summary-icon" />
              <div>
                <p>Tổng doanh thu</p>
                <h3>{formatCurrency(data.revenue)}</h3>
                <span
                  className={`growth-rate ${
                    data.growth >= 0 ? 'up' : 'down'
                  }`}
                >
                  {data.growth >= 0 ? (
                    <FaArrowUp />
                  ) : (
                    <FaArrowDown />
                  )}
                  {Math.abs(data.growth)}%
                </span>
              </div>
            </div>

            <div className="summary-card">
              <FaTicketAlt className="summary-icon" />
              <div>
                <p>Tổng vé bán ra</p>
                <h3>{data.totalTickets}</h3>
              </div>
            </div>

            <div className="summary-card">
              <FaShoppingCart className="summary-icon" />
              <div>
                <p>Tổng đơn hàng</p>
                <h3>{data.totalOrders}</h3>
              </div>
            </div>

            <div className="summary-card">
              <FaChartPie className="summary-icon" />
              <div>
                <p>Sự kiện đang hoạt động</p>
                <h3>{data.events.length}</h3>
              </div>
            </div>
          </div>

          {/* Biểu đồ doanh thu theo tháng */}
          <div className="chart-section">
            <h3>Doanh thu và số vé theo tháng</h3>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height={350}>
    <LineChart
  data={data.monthlyRevenue}
  margin={{ top: 20, right: 30, left: 50, bottom: 10 }}
>

                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(v) => formatCurrency(v)} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2ecc71"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Doanh thu"
                  />
                  <Line
                    type="monotone"
                    dataKey="tickets"
                    stroke="#3498db"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    name="Vé bán"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top sự kiện */}
          <div className="chart-section">
            <h3>Top sự kiện theo doanh thu</h3>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height={320}>
    <BarChart
  data={topEvents}
  margin={{ top: 20, right: 30, left: 50, bottom: 10 }}
>

                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(v) => formatCurrency(v)} />
                  <Bar dataKey="revenue" fill="#f39c12" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

      
        </div>
      </div>
    </div>
  );
}
