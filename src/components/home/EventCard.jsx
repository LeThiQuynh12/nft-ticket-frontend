import '../../styles/global.css';
import '../../styles/EventCard.css';

import React from 'react';

export default function EventCard({ev, onView}) {
  const d = new Date(ev.date);
  const day = d.getDate();
  const month = d.toLocaleString('vi-VN',{month:'short'});
  return (
    <article className="event-card" role="article">
      <div style={{position:'relative'}}>
        <img className="event-banner" src={ev.banner} alt={ev.title} />
        <div className="event-date" style={{position:'absolute', left:12, top:12, background:'#fff', color:'#111', padding:'6px 8px', borderRadius:8}}>
          <div className="day" style={{fontWeight:700}}>{day}</div>
          <div className="month" style={{fontSize:12}}>{month}</div>
        </div>
      </div>
      <div className="event-body">
        <div className="event-title">{ev.title}</div>
        <div className="event-meta">{ev.location} • 👁 {ev.views}</div>
        <div className="event-footer">
          <button className="btn" onClick={()=>onView(ev)}>Xem chi tiết</button>
          <div style={{color:'#7ef',fontWeight:700}}>{ev.price? ev.price.toLocaleString('vi-VN')+'đ' : 'Miễn phí'}</div>
        </div>
      </div>
    </article>
  );
}
