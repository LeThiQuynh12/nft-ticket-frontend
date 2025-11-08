import '../styles/global.css';
import '../styles/Section.css';
import '../styles/Footer.css';

import React, {
  useEffect,
  useState,
} from 'react';

import Footer from '../components/home/Footer';
import Header from '../components/home/Header';
import HeroCarousel from '../components/home/HeroCarousel';
import NavCategories from '../components/home/NavCategories';
import SectionCulture from '../components/home/SectionCulture';
import SectionHighlight from '../components/home/SectionHighlight';
import SectionOther from '../components/home/SectionOther';
import SectionTravel from '../components/home/SectionTravel';
import SectionMusic from '../components/home/SectionWorkShop';
import { fetchCultureEvents } from '../services/cultureApi';
import { fetchHighlightEvents } from '../services/highlightApi';
import { fetchMusicEvents } from '../services/musicApi';
import { fetchOtherEvents } from '../services/otherApi';
import { fetchTravelEvents } from '../services/travelApi';

export default function Home() {
  const [highlight, setHighlight] = useState([]);
  const [music, setMusic] = useState([]);
  const [travel, setTravel] = useState([]);
  const [culture, setCulture] = useState([]);
  const [other, setOther] = useState([]);

  useEffect(() => {
    fetchHighlightEvents().then(setHighlight);
    fetchMusicEvents().then(setMusic);
    fetchTravelEvents().then(setTravel);
    fetchCultureEvents().then(setCulture);
    fetchOtherEvents().then(setOther);
  }, []);

  const slides = [
    {
      image:
        "https://ticketgo.vn/photos/2/5ffbf7a1efda5.jpg",
      title: "Vé hot tuần này",
    },
    {
      image: "https://cdn-www.vinid.net/c1b12591-banner-web-1920x1080-1.jpg",
      title: "Trải nghiệm sự kiện đẳng cấp",
    },
    {
      image: "https://tttctt.1cdn.vn/2025/07/16/hinh-1-.jpg",
      title: "Khám phá cùng TicketGo",
    },
    {
      image: "https://ticketgo.vn/photos/2/5ffbf7a1efda5.jpg",
      title: "Khám phá cùng TicketGo",
    },
    {
      image:
        "https://ticketgo.vn/photos/2/5ffbf7a1efda5.jpg",
      title: "Vé hot tuần này",
    },
  ];

  return (
    <div>
      <Header />
      <NavCategories />
      <HeroCarousel slides={slides} />
      <SectionHighlight events={highlight} />

      <SectionCulture events={culture} />
      <SectionTravel events={travel} />

      <SectionMusic events={music} />
      <SectionOther events={other} />

      <Footer />
    </div>
  );
}
