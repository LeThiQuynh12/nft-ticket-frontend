// src/pages/MusicDetail.jsx
import React, {
  useEffect,
  useState,
} from 'react';

import { useParams } from 'react-router-dom';

import eventApi from '../../api/eventApi';
import EventDetail from '../common/EventDetail';
import Header from '../home/Header';

export default function MusicDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await eventApi.getEventsByCategory("ca-nhac");
        const data = res.events || res;
        const found = data.find((ev) => ev._id === id);
        if (found) {
          setEvent({
            id: found._id,
            title: found.name,
            banner: `http://localhost:5003${found.coverImage}`,
            description: found.description,
            date: found.startAt,
            location: found.location?.province || "Chưa rõ",
            seatMap: `http://localhost:5003${found.seatMapUrl}`,
            organizer: found.organizer,
            organizerLogo: `http://localhost:5003${found.organizerLogo}`,
            ticketInfo: found.ticketTypes?.map((t) => ({
              type: t.name,
              price: t.price,
            })) || [],
            gifts: [],
            views: found.views || 0,
            email: found.paymentInfo?.invoice?.fullName || "info@luxgo.vn",
            hotline: [found.paymentInfo?.accountNumber || "1900 1234"],
          });
        }
      } catch (err) {
        console.error("Lỗi khi tải chi tiết sự kiện CA NHẠC:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <p>Đang tải chi tiết sự kiện...</p>;
  if (!event) return <p>Không tìm thấy sự kiện.</p>;

  return (
    <div className="detail-page">
      <Header />
      {/* ✅ Truyền event thay vì fetchEvents */}
      <EventDetail event={event} category="music" />
    </div>
  );
}
