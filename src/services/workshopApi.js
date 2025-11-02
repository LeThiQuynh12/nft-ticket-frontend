// API giả lập lấy danh sách sự kiện workshop
export async function fetchWorkshopEvents() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Workshop kỹ năng mềm",
          date: "2025-11-04T20:00:00",
          time: "20:00",
          location: "Hà Nội",
          banner: "https://ticketgo.vn/uploads/images/event-gallery/event_gallery-0b1d5a6264a71f2de9ef79630ef41bda.jpg",
          views: 1000,
          email: "support@example.com",
          hotline: ["0123456789"],
          organizer: "Organizer Workshop",
          organizerLogo: "https:https://ticketgo.vn/uploads/images/event-gallery/event_gallery-0b1d5a6264a71f2de9ef79630ef41bda.jpg",
          ticketInfo: [
            { type: "VIP", price: 1000000, zones: ["A"], seats: ["1"] },
          ],
          gifts: ["Quà tặng mẫu workshop"],
          description: `Mô tả mẫu cho workshop`,
          price: 500000,
        },
      ]);
    }, 300);
  });
}