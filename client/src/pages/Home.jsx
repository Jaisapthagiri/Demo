// Home.jsx
import React from 'react';
import internship from '../assets/internship.png';

const Home = () => {
  return (
    <div className="w-full">
      <img
        src={internship}
        alt="Internship"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default Home;
