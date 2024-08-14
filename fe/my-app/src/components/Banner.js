import React from 'react';
import '../css/home/Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <button className="arrow left">&lt;</button>
      <div className="banner-content"></div>
      <button className="arrow right">&gt;</button>
    </div>
  );
};

export default Banner;