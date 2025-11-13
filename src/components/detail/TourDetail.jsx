import React, {
  useEffect,
  useState,
} from 'react';

import { useParams } from 'react-router-dom';

import eventApi from '../../api/eventApi';
import EventDetail from '../common/EventDetail';
import Header from '../home/Header';

export default function TourDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Lấy base URL từ file .env
  const API_PUBLIC = import.meta.env.VITE_API_PUBLIC_URL;

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        // ✅ Gọi API theo category tham quan
        const res = await eventApi.getEventsByCategory("tham-quan");
        const data = res.events || res;

        const found = data.find((ev) => ev._id === id);
        if (found) {
          setEvent({
            id: found._id,
            title: found.name,
            banner: `${API_PUBLIC}${found.coverImage}`,
            description: found.description,

            // thời gian
            startAt: found.startAt,
            endAt: found.endAt,
            saleStartAt: found.saleStartAt,
            saleEndAt: found.saleEndAt,

            // địa điểm đầy đủ
            locationFull: `${found.location?.name || ""}, ${
              found.location?.addressDetail || ""
            }, ${found.location?.ward || ""}, ${
              found.location?.district || ""
            }, ${found.location?.province || ""}`,

            seatMap: found.seatMapUrl
              ? `${API_PUBLIC}${found.seatMapUrl}`
              : null,

            organizer: found.organizer,
            organizerLogo: found.organizerLogo
              ? `${API_PUBLIC}${found.organizerLogo}`
              : null,

            ticketInfo:
              found.ticketTypes?.map((t) => ({
                type: t.name,
                price: t.price,
              })) || [],

            gallery:
              found.gallery?.map((g) => `${API_PUBLIC}${g}`) || [],

            views: found.views || 0,

            email: found.paymentInfo?.invoice?.fullName || "support@gmail.com",
            hotline: [found.paymentInfo?.accountNumber || "1900 1234"],
          });
        }
      } catch (err) {
        console.error("Lỗi khi tải chi tiết sự kiện THAM QUAN:", err);
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
      <EventDetail event={event} category="tour" />
    </div>
  );
}
