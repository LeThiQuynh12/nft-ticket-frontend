export async function fetchHighlightEvents() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Show Rap Việt 2025', banner: 'https://picsum.photos/seed/h1/400/250', date: '2025-11-05', location: 'Hà Nội', views: 1234, price: 350000 },
        { id: 2, title: 'Live Concert Mỹ Tâm', banner: 'https://picsum.photos/seed/h2/400/250', date: '2025-11-12', location: 'TP.HCM', views: 2921, price: 500000 },
        { id: 3, title: 'Giải chạy vì môi trường', banner: 'https://picsum.photos/seed/h3/400/250', date: '2025-12-01', location: 'Đà Nẵng', views: 875, price: 0 },
        { id: 4, title: 'Show Rap Việt 2025', banner: 'https://picsum.photos/seed/h1/400/250', date: '2025-11-05', location: 'Hà Nội', views: 1234, price: 350000 },
        { id: 5, title: 'Show Rap Việt 2025', banner: 'https://picsum.photos/seed/h1/400/250', date: '2025-11-05', location: 'Hà Nội', views: 1234, price: 350000 },
        { id: 6, title: 'Show Rap Việt 2025', banner: 'https://picsum.photos/seed/h1/400/250', date: '2025-11-05', location: 'Hà Nội', views: 1234, price: 350000 },
      ]);
    }, 300);
  });
}
