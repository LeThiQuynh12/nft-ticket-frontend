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
import SectionMusic from '../components/home/SectionMusic';
import SectionOther from '../components/home/SectionOther';
import SectionTravel from '../components/home/SectionTravel';
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
        "https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/536283232_646182108510499_6619794025031494311_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ZA1i1MqUQV8Q7kNvwHgewX9&_nc_oc=AdkOVgD1vfOoh-LLMDJ36PjN3O_LXP60uG3BP7ZdQZQ1DPlowhiDuvE8g2iQixFgz2UU2sIZTBMMK67UDPfSLeHj&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=cTUlbdplp5n3NByhzDwKpw&oh=00_Afe9oOsGOLvm7o-6X8SL28iNUKj13p0CQlxoWG8PAtdKyw&oe=6902AA39",
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
        "https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/536283232_646182108510499_6619794025031494311_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ZA1i1MqUQV8Q7kNvwHgewX9&_nc_oc=AdkOVgD1vfOoh-LLMDJ36PjN3O_LXP60uG3BP7ZdQZQ1DPlowhiDuvE8g2iQixFgz2UU2sIZTBMMK67UDPfSLeHj&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=cTUlbdplp5n3NByhzDwKpw&oh=00_Afe9oOsGOLvm7o-6X8SL28iNUKj13p0CQlxoWG8PAtdKyw&oe=6902AA39",
      title: "Vé hot tuần này",
    },
  ];

  return (
    <div>
      <Header />
      <NavCategories />
      <HeroCarousel slides={slides} />
      <SectionHighlight events={highlight} />
      <SectionMusic events={music} />
      <SectionCulture events={culture} />
      <SectionTravel events={travel} />
      <SectionOther events={other} />

      <Footer />
    </div>
  );
}
