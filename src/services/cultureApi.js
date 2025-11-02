export async function fetchCultureEvents() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 30, title: 'Triển lãm tranh Đông Dương', banner: 'https://picsum.photos/seed/c1/400/250', date: '2025-11-25', location: 'TP.HCM', views: 220, price: 0 },
        { id: 31, title: 'Lễ hội Áo dài Việt Nam', banner: 'https://picsum.photos/seed/c2/400/250', date: '2025-12-10', location: 'Huế', views: 480, price: 150000 },
      ]);
    }, 300);
  });
}
