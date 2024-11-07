import './Home.css';

import React from 'react';

import hero_banner from '/hero_banner.jpg';

import hero_title from '../../assets/hero_title.png';
import info_icon from '../../assets/info_icon.png';
import play_icon from '../../assets/play_icon.png';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/TitleCards/TitleCards';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className="bannerImg" />
        <div className="heroCaption">
          <img src={hero_title} alt="" className="captionImg" />
          <p>
            Discovering his ties to a secret ancient order, a young man must
            embrace his destiny and uncover the truth about his family's dark
            past.
          </p>
          <div className="heroBtns">
            <button className="btn">
              <img src={play_icon} alt="" />
              Play
            </button>
            <button className="btn darkBtn">
              <img src={info_icon} alt="" />
              More Info
            </button>
          </div>
          <div className="nowPlayingInHeroSection">
            <TitleCards category="now_playing" />
          </div>
        </div>
      </div>
      <div className="moreCards">
        <div className="nowPlayingOutHeroSection">
          <TitleCards category="now_playing" />
        </div>
        <TitleCards title="Blockbuster Movies" category="top_rated" />
        <TitleCards title="Only on Netflix" category="popular" />
        <TitleCards title="Upcoming" category="upcoming" />
        <TitleCards title="Top Pics for you" category="now_playing" />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
