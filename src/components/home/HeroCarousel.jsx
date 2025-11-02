import '../../styles/global.css';
import '../../styles/HeroCarousel.css';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

export default function HeroCarousel({ slides }) {
  const [idx, setIdx] = useState(0);
  const carouselRef = useRef(null);
  const total = slides.length;

  // Tự động cuộn sau mỗi 4 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  // Khi idx thay đổi => cuộn đến vị trí ảnh tương ứng
  useEffect(() => {
    if (carouselRef.current) {
      const width = carouselRef.current.offsetWidth / 3; // 3 ảnh mỗi khung
      carouselRef.current.scrollTo({
        left: idx * width,
        behavior: 'smooth',
      });
    }
  }, [idx]);

  return (
    <div className="hero">
      <div className="carousel" ref={carouselRef}>
        {slides.map((s, i) => (
          <div key={i} className="hero-slide">
            <img src={s.image} alt={s.title} />
          </div>
        ))}
      </div>

      <div className="nav-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={() => setIdx(i)}
            className={`dot ${i === idx ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
