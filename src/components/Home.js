import React from 'react';
import SearchBar from './SearchBar'
import './Search.css'


const Home = (props) => {
  return (
    <div className="hero">
      <div className="hero-search">
        <SearchBar {...props}/>
      </div>
      <div className="container hero-heading">
        <h1>Go</h1>
        <h1>Near</h1>
        <span>Explore nearby stays</span>
      </div>
    </div>
  ); //return
}; //function
export default Home;
