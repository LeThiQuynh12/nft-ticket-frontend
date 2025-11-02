import '../../styles/SectionHighlight.css';

import React from 'react';

import SectionTitle from './SectionTitle';

export default function SectionHighlight({ events }) {
  return (
    <section className="highlight-section">
      <SectionTitle title="SỰ KIỆN NỔI BẬT" />
      <div className="highlight-grid">
        {events.slice(0, 4).map((ev) => {
          const d = new Date(ev.date);
          const day = d.getDate();
          const month = d.toLocaleString("vi-VN", { month: "short" });
          return (
            <div key={ev.id} className="highlight-card" onClick={() => alert(ev.title)}>
              <div className="highlight-image-wrapper">
                <img src={ev.banner} alt={ev.title} className="highlight-image" />
                <div className="highlight-date">
                  <div className="highlight-day">{day}</div>
                  <div className="highlight-month">{month}</div>
                </div>
                <div className="highlight-overlay"></div>
              </div>
              <div className="highlight-content">
                <h3 className="highlight-title">{ev.title}</h3>
                <div className="highlight-meta">
                  <span>{ev.location}</span> • 👁 {ev.views}
                </div>
                <div className="highlight-footer">
                  <button className="highlight-btn">Xem chi tiết</button>
                  <span className="highlight-price">
                    {ev.price ? ev.price.toLocaleString("vi-VN") + "đ" : "Miễn phí"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
