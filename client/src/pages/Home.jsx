// Home.jsx
import React from 'react';
import Internship from '../assets/Internship.png';

const Home = () => {
  return (
    <div className="w-full">
      <img
        src={Internship}
        alt="Internship"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default Home;
