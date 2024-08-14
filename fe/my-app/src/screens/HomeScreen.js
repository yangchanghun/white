import React from 'react';
import Banner from '../components/Banner';
import Recommendation from '../components/Recommendation';
import '../css/home/HomeScreen.css';
// import { isLoggedIn } from '../components/AuthService';


const HomeScreen = () => {
  // const loggedIn = isLoggedIn();
  return (
    <div className="home-screen">
      <Banner />
      <Recommendation />
    </div>
  );
};

export default HomeScreen;
