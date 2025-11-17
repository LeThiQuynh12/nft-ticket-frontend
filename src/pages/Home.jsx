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
        "https://salt.tkbcdn.com/ts/ds/2c/f5/7a/d136b1fbc45f03540a23539c86517dd7.png",
      title: "Vé hot tuần này",
    },
    {
      image: "https://salt.tkbcdn.com/ts/ds/2e/8a/b4/71e92660facd80bc1344113d1c63e263.jpg",
      title: "Trải nghiệm sự kiện đẳng cấp",
    },
    {
      image: "https://salt.tkbcdn.com/ts/ds/92/5a/25/9252f67ff027a0e07f467fe6c9a5d8dd.jpeg",
      title: "Khám phá cùng TicketGo",
    },
    {
      image: "https://salt.tkbcdn.com/ts/ds/17/1d/5f/7150cf1cfa52290a9aa47fc657b38ceb.jpeg",
      title: "Khám phá cùng TicketGo",
    },
    {
      image:
        "https://salt.tkbcdn.com/ts/ds/a4/6f/fb/e9e1a2dcd64cdf480f2c56d1b25c7077.jpeg",
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
