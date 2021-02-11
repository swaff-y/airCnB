import React from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Terms from './Terms'
import '../App.css'



class Footer extends React.Component {
  render(){
    return(
      <footer className="footer">
        <div className="container">
          <span>&copy; 2021 AirCnB</span>
          <Link to="/About" > About us </Link> |
          <Link to="/Terms" > Terms &amp; Conditions</Link> |
          <Link to="/Contact" > Contact us</Link>
        </div>
      </footer>
    );
  }
}

export default Footer;
