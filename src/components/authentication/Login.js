import React from 'react';
import axios from 'axios';

const SERVER_BASE_URL = 'https://air-bnb-replication.herokuapp.com';

class Login extends React.Component {
  state = {
    email:'',
    password:''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state

    axios.post(`${SERVER_BASE_URL}/login.json`,
      { email, password },
      { withCredentials: true }
    )
    .then( response => {
      console.log(response.data);
      if(response.data.logged_in){
        this.props.handleLogin(response.data)
      }
    })
    .catch(console.warn)
  }

  render(){
    return(
      <div className="auth-dialog">
        <form onSubmit={ this.handleSubmit }>
          <h4>Login</h4>
          <div>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Enter your email address"
              onChange={ this.handleChange }
              />
          </div>
          <div>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={ this.handleChange }
              />
          </div>
          <div>
            <button className="button" type="submit">Login</button>
          </div>
        </form>
        <span onClick={ () => this.props.toggleAuthModal('signup', true) }>
          Don't have an account? Signup.
        </span>
      </div>
    )
  }
}

export default Login
