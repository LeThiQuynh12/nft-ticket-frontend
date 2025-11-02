// API giả lập lấy danh sách sự kiện ca nhạc
export async function fetchMusicEvents() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Live-Concert Dương Thụ: Cửa sổ âm nhạc No.5 - Bài hát thu về",
          date: "2025-11-04T20:00:00",
          time: "20:00",
          location:
            "Nhà hát Hồ Gươm, Số 40, phố Hàng Bài, phường Hoàn Kiếm, Hà Nội",
          banner:
            "https://ticketgo.vn/uploads/images/event-gallery/event_gallery-0b1d5a6264a71f2de9ef79630ef41bda.jpg",
          views: 5700,
          email: "chamsockhachhang@ticketgo.vn",
          hotline: ["08.999.80.818", "0243.788.00.99"],
          organizer: "NGỌC VIỆT SHOWS",
          organizerLogo:
            "https://thethaovanhoa.mediacdn.vn/372676912336973824/2024/11/7/seatmap-1730940275993404074532.png",
          seatMap:
            "https://ticketgo.vn/uploads/images/event-seatmap-img/event_seatmap_images-cd09b1297d13e0fb91ae2119bed879db.jpg",
          ticketInfo: [
            {
              type: "S.VIP (vàng gold)",
              price: 6500000,
              perks: "Ghế trung tâm, tầm nhìn đẹp nhất, tặng sổ tay bìa da",
              zones: ["Khu A", "Khu B"],
              seats: ["A1", "A2", "A3", "B1", "B2"],
            },
            {
              type: "VIP (đỏ)",
              price: 5500000,
              perks: "Góc nhìn sân khấu gần, âm thanh trung tâm",
              zones: ["Khu C", "Khu D"],
              seats: ["C1", "C2", "C3", "D1", "D2"],
            },
            {
              type: "Hạng 1 (tím)",
              price: 4500000,
              perks: "Vị trí đẹp, gần khu vực VIP",
              zones: ["Khu E"],
              seats: ["E1", "E2", "E3", "E4"],
            },
            {
              type: "Hạng 2 (cam)",
              price: 3500000,
              perks: "Góc nhìn thoải mái, tặng sổ tay bìa cứng",
              zones: ["Khu F"],
              seats: ["F1", "F2", "F3"],
            },
            {
              type: "Hạng 3 (xanh lá)",
              price: 2500000,
              perks: "Vị trí phổ thông, tặng khăn lụa",
              zones: ["Khu G"],
              seats: ["G1", "G2", "G3", "G4"],
            },
            {
              type: "Hạng 4 (xanh dương)",
              price: 2000000,
              perks: "Ghế khu tiêu chuẩn, không bao gồm đồ uống",
              zones: ["Khu H"],
              seats: ["H1", "H2", "H3"],
            },
            {
              type: "Hạng 5 (hồng)",
              price: 1500000,
              perks: "Ghế phổ thông, không bao gồm đồ uống",
              zones: ["Khu I"],
              seats: ["I1", "I2", "I3", "I4"],
            },
          ],

          gifts: [
            "Sổ tay bìa da: Hạng vé S.VIP & VIP",
            "Sổ tay bìa cứng: Hạng vé 1 & 2",
            "Khăn lụa: Hạng vé 3 & 4",
          ],
          description: `Đêm nhạc của nhạc sĩ Dương Thụ mang đến hành trình cảm xúc giữa lòng Hà Nội vào mùa thu, quy tụ dàn nghệ sĩ hàng đầu: Thanh Lam, Hồng Nhung, Bằng Kiều, Khánh Linh, Tấn Minh, Orange (Cam)...

I. THÔNG TIN SỰ KIỆN

- Thời gian: 20:00, ngày 04/11/2025  
- Địa điểm: Nhà hát Hồ Gươm, Hà Nội  
- Ban tổ chức: NGỌC VIỆT SHOWS  

II. GIÁ VÉ & QUYỀN LỢI

S.VIP (vàng gold)  6.500.000đ: Vị trí trung tâm, tặng quà cao cấp.  
- VIP (đỏ)  5.500.000đ: Gần sân khấu, tặng sổ tay bìa da.  
- Hạng 1 (tím)  4.500.000đ: Góc nhìn rộng, bao quát.  
- Hạng 2 (cam)  3.500.000đ: Khu vực giữa khán phòng.  
- Hạng 3 (xanh lá)  2.500.000đ: Khu vực phổ thông.  
- Hạng 4 (xanh dương)  2.000.000đ: Vị trí tiêu chuẩn.  
- Hạng 5 (hồng)  1.500.000đ: Vé phổ thông cơ bản.

III. LỊCH TRÌNH

- Mở cửa & check-in: 18:30 - 19:45  
- Bắt đầu chương trình: 20:00  
- Kết thúc dự kiến: 22:30  

IV. QUY ĐỊNH & CHÍNH SÁCH

- Trẻ em dưới 6 tuổi miễn phí nếu ngồi cùng phụ huynh.  
- Vé không hoàn/hủy, chỉ sử dụng 1 lần.  
- Nghiêm cấm mang vật sắc nhọn, chất cấm, đồ ăn/đồ uống bên ngoài.  
- BTC có quyền kiểm tra an ninh và từ chối phục vụ nếu vi phạm.  
- Hình ảnh có thể được sử dụng cho mục đích truyền thông.

Hãy để âm nhạc của Dương Thụ đưa bạn trở lại ký ức, với những bản tình ca mùa thu đầy lãng mạn.
          `,
          price: 1500000, // Giá thấp nhất
        },

        {
          id: 2,
          title: "Live-Concert Dương Thụ: Cửa sổ âm nhạc No.5 - Bài hát thu về",
          date: "2025-11-04T20:00:00",
          time: "20:00",
          location:
            "Nhà hát Hồ Gươm, Số 40, phố Hàng Bài, phường Hoàn Kiếm, Hà Nội",
          banner:
            "https://ticketgo.vn/uploads/images/event-gallery/event_gallery-0b1d5a6264a71f2de9ef79630ef41bda.jpg",
          views: 5700,
          email: "chamsockhachhang@ticketgo.vn",
          hotline: ["08.999.80.818", "0243.788.00.99"],
          organizer: "NGỌC VIỆT SHOWS",
          organizerLogo:
            "https://thethaovanhoa.mediacdn.vn/372676912336973824/2024/11/7/seatmap-1730940275993404074532.png",
          seatMap:
            "https://ticketgo.vn/uploads/images/event-seatmap-img/event_seatmap_images-cd09b1297d13e0fb91ae2119bed879db.jpg",
          ticketInfo: [
            {
              type: "S.VIP (vàng gold)",
              price: 6500000,
              perks: "Ghế trung tâm, tầm nhìn đẹp nhất, tặng sổ tay bìa da",
              zones: ["Khu A", "Khu B"],
              seats: ["A1", "A2", "A3", "B1", "B2"],
            },
            {
              type: "VIP (đỏ)",
              price: 5500000,
              perks: "Góc nhìn sân khấu gần, âm thanh trung tâm",
              zones: ["Khu C", "Khu D"],
              seats: ["C1", "C2", "C3", "D1", "D2"],
            },
            {
              type: "Hạng 1 (tím)",
              price: 4500000,
              perks: "Vị trí đẹp, gần khu vực VIP",
              zones: ["Khu E"],
              seats: ["E1", "E2", "E3", "E4"],
            },
            {
              type: "Hạng 2 (cam)",
              price: 3500000,
              perks: "Góc nhìn thoải mái, tặng sổ tay bìa cứng",
              zones: ["Khu F"],
              seats: ["F1", "F2", "F3"],
            },
            {
              type: "Hạng 3 (xanh lá)",
              price: 2500000,
              perks: "Vị trí phổ thông, tặng khăn lụa",
              zones: ["Khu G"],
              seats: ["G1", "G2", "G3", "G4"],
            },
            {
              type: "Hạng 4 (xanh dương)",
              price: 2000000,
              perks: "Ghế khu tiêu chuẩn, không bao gồm đồ uống",
              zones: ["Khu H"],
              seats: ["H1", "H2", "H3"],
            },
            {
              type: "Hạng 5 (hồng)",
              price: 1500000,
              perks: "Ghế phổ thông, không bao gồm đồ uống",
              zones: ["Khu I"],
              seats: ["I1", "I2", "I3", "I4"],
            },
          ],

          gifts: [
            "Sổ tay bìa da: Hạng vé S.VIP & VIP",
            "Sổ tay bìa cứng: Hạng vé 1 & 2",
            "Khăn lụa: Hạng vé 3 & 4",
          ],
          description: `Đêm nhạc của nhạc sĩ Dương Thụ mang đến hành trình cảm xúc giữa lòng Hà Nội vào mùa thu, quy tụ dàn nghệ sĩ hàng đầu: Thanh Lam, Hồng Nhung, Bằng Kiều, Khánh Linh, Tấn Minh, Orange (Cam)...
          `,
          price: 1500000, // Giá thấp nhất
        },

          {
          id: 3,
          title: "Live-Concert Dương Thụ: Cửa sổ âm nhạc No.5 - Bài hát thu về",
          date: "2025-11-04T20:00:00",
          time: "20:00",
          location:
            "Nhà hát Hồ Gươm, Số 40, phố Hàng Bài, phường Hoàn Kiếm, Hà Nội",
          banner:
            "https://ticketgo.vn/uploads/images/event-gallery/event_gallery-0b1d5a6264a71f2de9ef79630ef41bda.jpg",
          views: 5700,
          email: "chamsockhachhang@ticketgo.vn",
          hotline: ["08.999.80.818", "0243.788.00.99"],
          organizer: "NGỌC VIỆT SHOWS",
          organizerLogo:
            "https://thethaovanhoa.mediacdn.vn/372676912336973824/2024/11/7/seatmap-1730940275993404074532.png",
          seatMap:
            "https://ticketgo.vn/uploads/images/event-seatmap-img/event_seatmap_images-cd09b1297d13e0fb91ae2119bed879db.jpg",
          ticketInfo: [
            {
              type: "S.VIP (vàng gold)",
              price: 6500000,
              perks: "Ghế trung tâm, tầm nhìn đẹp nhất, tặng sổ tay bìa da",
              zones: ["Khu A", "Khu B"],
              seats: ["A1", "A2", "A3", "B1", "B2"],
            },
            {
              type: "VIP (đỏ)",
              price: 5500000,
              perks: "Góc nhìn sân khấu gần, âm thanh trung tâm",
              zones: ["Khu C", "Khu D"],
              seats: ["C1", "C2", "C3", "D1", "D2"],
            },
            {
              type: "Hạng 1 (tím)",
              price: 4500000,
              perks: "Vị trí đẹp, gần khu vực VIP",
              zones: ["Khu E"],
              seats: ["E1", "E2", "E3", "E4"],
            },
            {
              type: "Hạng 2 (cam)",
              price: 3500000,
              perks: "Góc nhìn thoải mái, tặng sổ tay bìa cứng",
              zones: ["Khu F"],
              seats: ["F1", "F2", "F3"],
            },
            {
              type: "Hạng 3 (xanh lá)",
              price: 2500000,
              perks: "Vị trí phổ thông, tặng khăn lụa",
              zones: ["Khu G"],
              seats: ["G1", "G2", "G3", "G4"],
            },
            {
              type: "Hạng 4 (xanh dương)",
              price: 2000000,
              perks: "Ghế khu tiêu chuẩn, không bao gồm đồ uống",
              zones: ["Khu H"],
              seats: ["H1", "H2", "H3"],
            },
            {
              type: "Hạng 5 (hồng)",
              price: 1500000,
              perks: "Ghế phổ thông, không bao gồm đồ uống",
              zones: ["Khu I"],
              seats: ["I1", "I2", "I3", "I4"],
            },
          ],

          gifts: [
            "Sổ tay bìa da: Hạng vé S.VIP & VIP",
            "Sổ tay bìa cứng: Hạng vé 1 & 2",
            "Khăn lụa: Hạng vé 3 & 4",
          ],
          description: `Đêm nhạc của nhạc sĩ Dương Thụ mang đến hành trình cảm xúc giữa lòng Hà Nội vào mùa thu, quy tụ dàn nghệ sĩ hàng đầu: Thanh Lam, Hồng Nhung, Bằng Kiều, Khánh Linh, Tấn Minh, Orange (Cam)...
          `,
          price: 1500000, // Giá thấp nhất
        },

          {
          id: 4,
          title: "Live-Concert Dương Thụ: Cửa sổ âm nhạc No.5 - Bài hát thu về",
          date: "2025-11-04T20:00:00",
          time: "20:00",
          location:
            "Nhà hát Hồ Gươm, Số 40, phố Hàng Bài, phường Hoàn Kiếm, Hà Nội",
          banner:
            "https://ticketgo.vn/uploads/images/event-gallery/event_gallery-0b1d5a6264a71f2de9ef79630ef41bda.jpg",
          views: 5700,
          email: "chamsockhachhang@ticketgo.vn",
          hotline: ["08.999.80.818", "0243.788.00.99"],
          organizer: "NGỌC VIỆT SHOWS",
          organizerLogo:
            "https://thethaovanhoa.mediacdn.vn/372676912336973824/2024/11/7/seatmap-1730940275993404074532.png",
          seatMap:
            "https://ticketgo.vn/uploads/images/event-seatmap-img/event_seatmap_images-cd09b1297d13e0fb91ae2119bed879db.jpg",
          ticketInfo: [
            {
              type: "S.VIP (vàng gold)",
              price: 6500000,
              perks: "Ghế trung tâm, tầm nhìn đẹp nhất, tặng sổ tay bìa da",
              zones: ["Khu A", "Khu B"],
              seats: ["A1", "A2", "A3", "B1", "B2"],
            },
            {
              type: "VIP (đỏ)",
              price: 5500000,
              perks: "Góc nhìn sân khấu gần, âm thanh trung tâm",
              zones: ["Khu C", "Khu D"],
              seats: ["C1", "C2", "C3", "D1", "D2"],
            },
            {
              type: "Hạng 1 (tím)",
              price: 4500000,
              perks: "Vị trí đẹp, gần khu vực VIP",
              zones: ["Khu E"],
              seats: ["E1", "E2", "E3", "E4"],
            },
            {
              type: "Hạng 2 (cam)",
              price: 3500000,
              perks: "Góc nhìn thoải mái, tặng sổ tay bìa cứng",
              zones: ["Khu F"],
              seats: ["F1", "F2", "F3"],
            },
            {
              type: "Hạng 3 (xanh lá)",
              price: 2500000,
              perks: "Vị trí phổ thông, tặng khăn lụa",
              zones: ["Khu G"],
              seats: ["G1", "G2", "G3", "G4"],
            },
            {
              type: "Hạng 4 (xanh dương)",
              price: 2000000,
              perks: "Ghế khu tiêu chuẩn, không bao gồm đồ uống",
              zones: ["Khu H"],
              seats: ["H1", "H2", "H3"],
            },
            {
              type: "Hạng 5 (hồng)",
              price: 1500000,
              perks: "Ghế phổ thông, không bao gồm đồ uống",
              zones: ["Khu I"],
              seats: ["I1", "I2", "I3", "I4"],
            },
          ],

          gifts: [
            "Sổ tay bìa da: Hạng vé S.VIP & VIP",
            "Sổ tay bìa cứng: Hạng vé 1 & 2",
            "Khăn lụa: Hạng vé 3 & 4",
          ],
          description: `Đêm nhạc của nhạc sĩ Dương Thụ mang đến hành trình cảm xúc giữa lòng Hà Nội vào mùa thu, quy tụ dàn nghệ sĩ hàng đầu: Thanh Lam, Hồng Nhung, Bằng Kiều, Khánh Linh, Tấn Minh, Orange (Cam)...
          `,
          price: 1500000, // Giá thấp nhất
        },

          {
          id: 5,
          title: "Live-Concert Dương Thụ: Cửa sổ âm nhạc No.5 - Bài hát thu về",
          date: "2025-11-04T20:00:00",
          time: "20:00",
          location:
            "Nhà hát Hồ Gươm, Số 40, phố Hàng Bài, phường Hoàn Kiếm, Hà Nội",
          banner:
            "https://ticketgo.vn/uploads/images/event-gallery/event_gallery-0b1d5a6264a71f2de9ef79630ef41bda.jpg",
          views: 5700,
          email: "chamsockhachhang@ticketgo.vn",
          hotline: ["08.999.80.818", "0243.788.00.99"],
          organizer: "NGỌC VIỆT SHOWS",
          organizerLogo:
            "https://thethaovanhoa.mediacdn.vn/372676912336973824/2024/11/7/seatmap-1730940275993404074532.png",
          seatMap:
            "https://ticketgo.vn/uploads/images/event-seatmap-img/event_seatmap_images-cd09b1297d13e0fb91ae2119bed879db.jpg",
          ticketInfo: [
            {
              type: "S.VIP (vàng gold)",
              price: 6500000,
              perks: "Ghế trung tâm, tầm nhìn đẹp nhất, tặng sổ tay bìa da",
              zones: ["Khu A", "Khu B"],
              seats: ["A1", "A2", "A3", "B1", "B2"],
            },
            {
              type: "VIP (đỏ)",
              price: 5500000,
              perks: "Góc nhìn sân khấu gần, âm thanh trung tâm",
              zones: ["Khu C", "Khu D"],
              seats: ["C1", "C2", "C3", "D1", "D2"],
            },
            {
              type: "Hạng 1 (tím)",
              price: 4500000,
              perks: "Vị trí đẹp, gần khu vực VIP",
              zones: ["Khu E"],
              seats: ["E1", "E2", "E3", "E4"],
            },
            {
              type: "Hạng 2 (cam)",
              price: 3500000,
              perks: "Góc nhìn thoải mái, tặng sổ tay bìa cứng",
              zones: ["Khu F"],
              seats: ["F1", "F2", "F3"],
            },
            {
              type: "Hạng 3 (xanh lá)",
              price: 2500000,
              perks: "Vị trí phổ thông, tặng khăn lụa",
              zones: ["Khu G"],
              seats: ["G1", "G2", "G3", "G4"],
            },
            {
              type: "Hạng 4 (xanh dương)",
              price: 2000000,
              perks: "Ghế khu tiêu chuẩn, không bao gồm đồ uống",
              zones: ["Khu H"],
              seats: ["H1", "H2", "H3"],
            },
            {
              type: "Hạng 5 (hồng)",
              price: 1500000,
              perks: "Ghế phổ thông, không bao gồm đồ uống",
              zones: ["Khu I"],
              seats: ["I1", "I2", "I3", "I4"],
            },
          ],

          gifts: [
            "Sổ tay bìa da: Hạng vé S.VIP & VIP",
            "Sổ tay bìa cứng: Hạng vé 1 & 2",
            "Khăn lụa: Hạng vé 3 & 4",
          ],
          description: `Đêm nhạc của nhạc sĩ Dương Thụ mang đến hành trình cảm xúc giữa lòng Hà Nội vào mùa thu, quy tụ dàn nghệ sĩ hàng đầu: Thanh Lam, Hồng Nhung, Bằng Kiều, Khánh Linh, Tấn Minh, Orange (Cam)...
          `,
          price: 1500000, // Giá thấp nhất
        },
      ]);
    }, 300); // Giả lập trễ 0.3s
  });
}
