import React from 'react';
// import axios from 'axios';
import '../App.css'




const ReservationsProfile = (props)=>{
  return(
    <div className="App">

        <h4> Booking  {props.reservation.booking_code}   </h4>

        <ul>
          <li>Reserved on: {props.reservation.created_at}</li>
          <li>From Date: {props.reservation.from_date}</li>
          <li>To Date: {props.reservation.to_date}</li>
          <li>Guests: {props.reservation.guests_count}</li>
          <li>Total Paid: {props.reservation.total_paid}</li>


        </ul>
        <br />



    </div>
  )
}



export default ReservationsProfile
