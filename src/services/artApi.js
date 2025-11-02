// API giả lập lấy danh sách sự kiện art
export async function fetchArtEvents() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Triển lãm nghệ thuật hiện đại",
          date: "2025-11-04T20:00:00",
          time: "20:00",
          location: "Hà Nội",
          banner: "https://ticketgo.vn/uploads/images/event-gallery/event_gallery-0b1d5a6264a71f2de9ef79630ef41bda.jpg",
          views: 1000,
          email: "support@example.com",
          hotline: ["0123456789"],
          organizer: "Organizer Art",
          organizerLogo: "https://ticketgo.vn/uploads/images/event-gallery/event_gallery-0b1d5a6264a71f2de9ef79630ef41bda.jpg",
          seatMap: "https://ticketgo.vn/uploads/images/event-gallery/event_gallery-0b1d5a6264a71f2de9ef79630ef41bda.jpg",
          ticketInfo: [
            { type: "VIP", price: 1000000, zones: ["A"], seats: ["1"] },
          ],
          gifts: ["Quà tặng mẫu art"],
          description: `Mô tả mẫu cho văn hóa nghệ thuật`,
          price: 500000,
        },
      ]);
    }, 300);
  });
}