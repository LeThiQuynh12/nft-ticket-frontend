// src/pages/ArtDetail.jsx
import React, {
  useEffect,
  useState,
} from 'react';

import { useParams } from 'react-router-dom';

import eventApi from '../../api/eventApi';
import EventDetail from '../common/EventDetail';
import Header from '../home/Header';

export default function ArtDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        // ✅ gọi API theo category văn hóa nghệ thuật
        const res = await eventApi.getEventsByCategory("van-hoa-nghe-thuat");
        const data = res.events || res;

        const found = data.find((ev) => ev._id === id);
        if (found) {
          setEvent({
            id: found._id,
            title: found.name,
            banner: `http://localhost:5003${found.coverImage}`,
            description: found.description,

            startAt: found.startAt,
            endAt: found.endAt,
            saleStartAt: found.saleStartAt,
            saleEndAt: found.saleEndAt,

            locationFull: `${found.location?.name || ""}, ${
              found.location?.addressDetail || ""
            }, ${found.location?.ward || ""}, ${
              found.location?.district || ""
            }, ${found.location?.province || ""}`,

            seatMap: found.seatMapUrl
              ? `http://localhost:5003${found.seatMapUrl}`
              : null,

            organizer: found.organizer,
            organizerLogo: found.organizerLogo
              ? `http://localhost:5003${found.organizerLogo}`
              : null,

            ticketInfo:
              found.ticketTypes?.map((t) => ({
                type: t.name,
                price: t.price,
              })) || [],

            gallery:
              found.gallery?.map((g) => `http://localhost:5003${g}`) || [],

            views: found.views || 0,

            email: found.paymentInfo?.invoice?.fullName || "support@gmail.com",
            hotline: [found.paymentInfo?.accountNumber || "1900 1234"],
          });
        }
      } catch (err) {
        console.error("Lỗi khi tải chi tiết sự kiện VĂN HÓA NGHỆ THUẬT:", err);
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
      <EventDetail event={event} category="art" />
    </div>
  );
}
