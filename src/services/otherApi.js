export async function fetchOtherEvents() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 40, title: 'Workshop khởi nghiệp', banner: 'https://picsum.photos/seed/o1/400/250', date: '2025-11-28', location: 'Hà Nội', views: 350, price: 0 },
        { id: 41, title: 'Hội chợ việc làm IT', banner: 'https://picsum.photos/seed/o2/400/250', date: '2025-12-03', location: 'Đà Nẵng', views: 420, price: 0 },
      ]);
    }, 300);
  });
}
