// API giả lập lấy danh sách sự kiện travel
export async function fetchTravelEvents() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Tour du lịch khám phá",
          date: "2025-11-04T20:00:00",
          time: "20:00",
          location: "Hà Nội",
          banner: "https://ticketgo.vn/uploads/images/event-gallery/event_gallery-0b1d5a6264a71f2de9ef79630ef41bda.jpg",
          views: 1000,
          email: "support@example.com",
          hotline: ["0123456789"],
          organizer: "Organizer Travel",
          organizerLogo: "https://ticketgo.vn/uploads/images/event-gallery/event_gallery-0b1d5a6264a71f2de9ef79630ef41bda.jpg",
          seatMap: "https://ticketgo.vn/uploads/images/event-gallery/event_gallery-0b1d5a6264a71f2de9ef79630ef41bda.jpg",
          ticketInfo: [
            { type: "VIP", price: 1000000, zones: ["A"], seats: ["1"] },
          ],
          gifts: ["Quà tặng mẫu travel"],
          description: `Mô tả mẫu cho du lịch`,
          price: 500000,
        },
      ]);
    }, 300);
  });
}