import React from 'react';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import Header from './Header'
import SearchBar from './SearchBar'
// import {Route, Link, HashRouter as Router} from 'react-router-dom';
// import axios from 'axios';

import '../App.css'


class Navigation extends React.Component {
  state = {
    showSearch: false
  }

  showSearch = () => {
    this.setState({
      showSearch: !this.state.showSearch
    })
  }

  render(){
    console.log(this.props.location);
    const navClass = this.props.location.pathname.includes('search/') ? "nav-wrapper stay" : "nav-wrapper"
    return(
      <div>
        {
          this.props.location.pathname.includes('search/') ? null :
          <Header />
        }

        <div className={navClass}>
          <div className="container">
            <nav className="nav">
              <div className="logo">
                <Link to="/" >aircnb</Link>
              </div>
              {
                !this.props.location.pathname.includes('search/') ? null : this.state.showSearch ?
                <div>
                  <SearchBar {...this.props}/>
                </div> :
                <div className="search-trigger" onClick={this.showSearch}>
                  <div>Start your search</div>
                  <button className="search-trigger-button" >
                    &#x1F50D;
                  </button>
                </div>
              }
              <div>
                <Link to="/" className="nav-links"> Home </Link>
                {
                  this.props.isLoggedIn ?
                  <Link className="nav-links" onClick={this.props.handleLogout}>Logout</Link>
                  :
                  <Link className="nav-links" onClick={ () => this.props.toggleAuthModal('login', true) }>Login</Link>
                }
              </div>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

export default Navigation
