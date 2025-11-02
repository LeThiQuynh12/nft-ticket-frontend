import '../../styles/global.css';
import '../../styles/Header.css';

import { FiSearch } from 'react-icons/fi';
import { HiOutlineTicket } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function Header({ onSearch }) {
  return (
    <header className="header">
      <div className="header-inner">
        {/* <div className="logo">NFTticket</div> */}
        <Link to="/" className="logo">NFTticket</Link>
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
          style={{backgroundColor: "#ffffff"}}
            type="text"
            placeholder="Bạn tìm gì hôm nay?"
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch?.(e.target.value);
            }}
          />
          <button
            className="search-btn"
            onClick={() =>
              onSearch?.(document.querySelector(".search-bar input").value)
            }
          >
            Tìm kiếm
          </button>
        </div>

        <div className="header-actions">
          <button className="outline-btn">Tạo sự kiện</button>

          <button className="link-btn">
            <HiOutlineTicket size={18} style={{ marginRight: 6 }} />
            Vé của tôi
          </button>

          <div className="login-links">
            <Link to="/login">Đăng nhập</Link>
            <span className="divider">|</span>
            <Link to="/register">Đăng ký</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
