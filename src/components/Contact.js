import React from 'react';
// import {Route, Link, HashRouter as Router} from 'react-router-dom';
import axios from 'axios';

import '../App.css'


// class Terms extends React.Component {
  class Contact extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      booking:'',
      response:''
    }
  }

  handleSubmit(event){
    event.preventDefault();
      axios({
      method: "POST",
      url:"https://air-bnb-replication.herokuapp.com//contact/create",
      data:  this.state,
      withCredentials: true
    }).then((response)=>{
      console.log(response.data.sent);
      this.setState({response:response.data.sent})
      this.resetForm()
      setTimeout(()=>this.setState({response:''}), 2000)
    })
    .catch(console.warn)
  } //handleSubmit

  resetForm(){
    this.setState({name: '', email: '', message: '', booking:''})
  }



  onNameChange(event) {
     this.setState({name: event.target.value})
   }

   onEmailChange(event) {
     this.setState({email: event.target.value})
   }

   onBookingChange(event) {
     this.setState({booking: event.target.value})
   }

   onMessageChange(event) {
     console.log(event);
     this.setState({message: event.target.value})
   }


  render(){
  // console.log(props.history);
    return(
      <div className="Terms">
        <h2> Contact Us </h2>
        <br />

        <p>
          If you have any queries about a property, a booking or just want us to send your feedback please enter your details below:
        </p>

        <br />
        {this.state.response === true ? <p> message sent </p> : <p> </p> }

        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
         <div className="form-group">
           <label htmlFor="name">Name</label>
           <input type="text" className="form-control" value={this.state.name} onChange={this.onNameChange.bind(this)} />
         </div>
         <br />
         <div className="form-group">
           <label htmlFor="exampleInputEmail1">Email address</label>
           <input type="email" className="form-control" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
         </div>
         <br />
           <div className="form-group">
             <label htmlFor="booking">Booking Code (optional)</label>
             <input type="booking" className="form-control" value={this.state.booking} onChange={this.onBookingChange.bind(this)} />
           </div>
         <br />
         <div className="form-group">
           <label htmlFor="message">Message</label>
           <textarea className="form-control" rows="5" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
         </div>
         <br />
         <button type="submit" className="btn btn-primary">Submit</button>
       </form>


     </div>
   );
 }
}




export default Contact;
