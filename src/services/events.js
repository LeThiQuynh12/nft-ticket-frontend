// src/services/events.js
export async function fetchEvents({page=1, q='', location=''} = {}) {
  // return real fetch('/api/events?...') in production
  // mock
  const items = Array.from({length:12}).map((_,i)=>({
    id: i+1,
    title: ["Mezcal Jazz Unit","G-Dragon Concert","Immerse Jazz"][i%3]+" - Tuyệt vời",
    banner: `https://picsum.photos/seed/${i+1}/800/450`,
    date: "2025-10-"+(10+i),
    location: i%2===0 ? "Hà Nội" : "Hồ Chí Minh",
    price: [350000, 500000, 0][i%3],
    views: 100 + i*20,
    ticketsLeft: 50 - i*3
  }));
  return { events: items, total: items.length, page };
}
