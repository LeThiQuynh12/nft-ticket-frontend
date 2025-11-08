import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import AdminCategories from './admin/pages/AdminCategories';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminEvents from './admin/pages/AdminEvents';
import AdminOrders from './admin/pages/AdminOrders';
import AdminReports from './admin/pages/AdminReports';
import AdminTickets from './admin/pages/AdminTickets';
import AdminUsers from './admin/pages/AdminUsers';
import CreateEvent from './admin/pages/CreateEvent';
import PaymentConfirmPage from './components/booking/PaymentConfirmPage';
import PaymentSuccessPage from './components/booking/PaymentSuccessPage';
import TicketBookingPage from './components/booking/TicketBookingPage';
import ArtDetail from './components/detail/ArtDetail';
import MovieDetail from './components/detail/MovieDetail';
import MusicDetail from './components/detail/MusicDetail';
import SportDetail from './components/detail/SportDetail';
import TourDetail from './components/detail/TourDetail';
import TravelDetail from './components/detail/TravelDetail';
import WorkshopDetail from './components/detail/WorkshopDetail';
import ArtPage from './pages/ArtPage';
// --- Import phần người dùng ---
import Home from './pages/Home';
import Login from './pages/Login';
import MoviePage from './pages/MoviePage';
import MusicPage from './pages/MusicPage';
import Register from './pages/Register';
import SportPage from './pages/SportPage';
import TourPage from './pages/TourPage';
import TravelPage from './pages/TravelPage';
import WorkshopPage from './pages/WorkshopPage';
// --- Import phần admin ---
import ProtectedRoute from './routes/ProtectedRoute';

PaymentSuccessPage

function App() {
  return (
    <Router>
      <Routes>
        {/* ==================== PHẦN NGƯỜI DÙNG ==================== */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/music" element={<MusicPage />} />
        <Route path="/music/:id" element={<MusicDetail />} />

        <Route path="/art" element={<ArtPage />} />
        <Route path="/art/:id" element={<ArtDetail />} />

        <Route path="/travel" element={<TravelPage />} />
        <Route path="/travel/:id" element={<TravelDetail />} />

        <Route path="/workshop" element={<WorkshopPage />} />
        <Route path="/workshop/:id" element={<WorkshopDetail />} />

        <Route path="/movie" element={<MoviePage />} />
        <Route path="/movie/:id" element={<MovieDetail />} /> {/* ✅ Sửa lỗi 'armoviet' */}

        <Route path="/tour" element={<TourPage />} />
        <Route path="/tour/:id" element={<TourDetail />} />

        <Route path="/sport" element={<SportPage />} />
        <Route path="/sport/:id" element={<SportDetail />} />

        <Route path="/booking/:id" element={<TicketBookingPage />} />
        <Route path="/payment-confirm" element={<PaymentConfirmPage />} />
<Route path="/payment-success" element={<PaymentSuccessPage />} />

        {/* ==================== PHẦN ADMIN ==================== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/tickets"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminTickets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminCategories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-event"
          element={
            <ProtectedRoute requiredRole="admin">
              <CreateEvent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
