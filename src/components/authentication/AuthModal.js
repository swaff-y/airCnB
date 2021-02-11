import React from 'react';

// import Signup from './Signup';


class AuthModal extends React.Component {
  render(){
    return(
      <div className="auth-modal">
        <div className="auth-wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default AuthModal
