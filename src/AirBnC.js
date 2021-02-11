import React from 'react';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home';
import './App.css';
import UserProfile from './components/UserProfile'

// Authentication Components
import AuthModal from './components/authentication/AuthModal'
import Login from './components/authentication/Login'
import Signup from './components/authentication/Signup'

// Reservation components
import Reservation from './components/reservation/Reservation'

// Payment components
import Payment from './components/payment/Payment'
import Confirmation from './components/Confirmation'

// Common Components
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Terms from './components/Terms'
import Contact from './components/Contact'
import About from './components/About'
import SearchResults from './components/SearchResults';


const SERVER_BASE_URL = 'https://air-bnb-replication.herokuapp.com/';

class AirBnC extends React.Component {
  state = {
    authForm: '',
    authModalVisible: '',
    isLoggedIn: '',
    user: {}
  }

  getLoginStatus = () =>{
    axios.get(`${SERVER_BASE_URL}/logged_in`,{
      withCredentials: true
    })
    .then( response => {
      if(response.data.logged_in){
        this.handleLogin(response.data)
      } else {
        this.handleLogout()
      }
    })
    .catch(console.log)
  }

  toggleAuthModal = (form, visible) => {
    this.setState({
      authModalVisible: visible,
      authForm: form
    })
  }

  handleLogin = data => {
    this.setState({
      authModalVisible: false,
      user: data.user,
      isLoggedIn: true
    })
  }

  handleLogout = () => {
    if(this.state.isLoggedIn){
      axios.delete(`${SERVER_BASE_URL}/login.json`,{
        withCredentials: true
      })
      .then(data => console.log(data))
    }

    this.setState({
      user: {},
      isLoggedIn: false
    })
  }

  componentDidMount() {
    this.getLoginStatus()
  }

  render(){
    return(
      <div>
        <Router>

          <Route path="/" render={ props => <Navigation {...props} isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} toggleAuthModal={this.toggleAuthModal} /> } />

          <Route exact path = "/" component = {Home} />
          <Route exact path = "/About" component = {About} />
          <Route exact path = "/Terms" component = {Terms} />
          <Route exact path = "/Contact" component = {Contact} />

          <Route exact path="/search/:searchText/:startDate/:endDate" component={SearchResults }/>

          <Route exact path = "/profile" component ={UserProfile}  />

          <Route exact path="/property/:listing_id/:startDate/:endDate" render={ props => <Reservation {...props} toggleAuthModal={ this.toggleAuthModal} isLoggedIn={this.state.isLoggedIn} user={this.state.user} /> } />

          <Route exact path="/book/:reservation_id/confirmation" component={Confirmation} />

          <Route exact path="/book/:reservation_id/:startDate/:endDate" render={ props => <Payment {...props} isLoggedIn={this.state.isLoggedIn}
          user={this.state.user} /> } />

{
          // <Route exact path="/search/:reservationId/:startDate/:endDate" >
          //   {
          //     this.state.isLoggedIn ? <Payment /> : <Redirect to="/search" />
          //   }
          // </Route>
}
          {
            // Authentication Component
            // Available on all routes
          }
          {
            this.state.authModalVisible ?
            <AuthModal>
              {
                this.state.authForm === 'login' ?
                <Login
                  handleLogin={ this.handleLogin }
                  toggleAuthModal={ this.toggleAuthModal }
                  /> :
                <Signup
                  handleLogin={ this.handleLogin }
                  toggleAuthModal={ this.toggleAuthModal }
                  />
              }
            </AuthModal> : null
          }

          <Footer />
        </Router>
      </div>
    )
  }
}

export default AirBnC;
