import React from 'react';
// import {Route, Link, HashRouter as Router} from 'react-router-dom';
// import axios from 'axios';

import '../App.css'


class Header extends React.Component {
  render(){
    return(
      <div className="header">
        <div>
          <a href="https://www.google.com/search?q=covid+safe" target="_blank" rel="noreferrer">Learn more about COVID-19 safe measures</a>
        </div>
      </div>
    );
  }
}

export default Header;
