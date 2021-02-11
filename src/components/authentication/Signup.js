import React from 'react';
import axios from 'axios';

const SERVER_BASE_URL = 'http://localhost:3000';

class Login extends React.Component {
  state = {
    name:'',
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
    const user = this.state

    axios.post(`${SERVER_BASE_URL}/users.json`,
      { user },
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
          <h4>Signup</h4>
          <div>
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Full name"
              onChange={ this.handleChange }
              />
          </div>
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
            <button className="button" type="submit">Signup</button>
          </div>
        </form>
        <span onClick={ () => this.props.toggleAuthModal('login', true) }>
          Have an account? Login.
        </span>
      </div>
    )
  }
}

export default Login
