// src/components/nav/NavCategories.jsx
import '../../styles/global.css';
import '../../styles/NavCategories.css';

import React from 'react';

import { Link } from 'react-router-dom';

export default function NavCategories() {
  const cats = [
    { name: "Vé ca nhạc", path: "/music" },
    { name: "Văn hóa nghệ thuật", path: "/art" },
    { name: "Du lịch", path: "/travel" },
    { name: "Workshop", path: "/workshop" },
    { name: "Vé xem phim", path: "/movie" },
    { name: "Vé tham quan", path: "/tour" },
    { name: "Thể thao", path: "/sport" },
  ];

  return (
    <nav className="main-nav">
      <div className="container" style={{ display: "flex", alignItems: "center" }}>
        {cats.map((c) => (
          <Link key={c.name} to={c.path}>
            {c.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
