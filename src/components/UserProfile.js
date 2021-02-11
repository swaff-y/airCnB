import React from 'react';
import axios from 'axios';
import '../App.css';
import ReservationsProfile from './ReservationsProfile';
import ReviewForm from './ReviewForm';

const BASE_URL = 'https://air-bnb-replication.herokuapp.com'

class UserProfile extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        user_id: 241,
        about_info:'',
        name:'',
        email_confirmed:false,
        identity_confirmed:false,
        reservations:[],
        reviews:[],
        data:[]
      }
    }


    componentDidMount(){
      axios.get(BASE_URL + '/users/' + this.state.user_id + '.json')
      .then((res)=> {
        console.log("data",res.data);
        this.setState({
          about_info:res.data[0].about_info,
          name:res.data[0].name,
          email_confirmed:res.data[0].email_confirmed,
          identity_confirmed:res.data[0].identity_confirmed,
          reservations:res.data[0].reservations,
          reviews:res.data[0].reviews,
          data:res.data
        })
      })
      .catch(console.warn)

    }

  render(){
      // console.log("Logitout",this.state.reservations);
    return(
      <div className="Terms">
        <h1> Hi, I'm {this.state.name} </h1>
        <br />

        <div>
          <h2> About me  </h2>
          <hr />
          <br />
          <p>
            {this.state.about_info}

          </p>

          <br />

          <div>
              <hr />
            <p>
              Email Confirmed: {

                this.state.email_confirmed === true? <img src='https://chart.googleapis.com/chart?chst=d_text_outline&chld=FFCC33%7C16%7Ch%7C008000%7Cb%7CConfirmed' /> : <img src='https://chart.googleapis.com/chart?chst=d_text_outline&chld=FFCC33%7C16%7Ch%7CFF0000%7Cb%7CNot Confirmed' />

               }

            </p>

            <p>
              Identity Confirmed: {

                this.state.identity_confirmed === true? <img src='https://chart.googleapis.com/chart?chst=d_text_outline&chld=FFCC33%7C16%7Ch%7C008000%7Cb%7CConfirmed' /> : <img src='https://chart.googleapis.com/chart?chst=d_text_outline&chld=FFCC33%7C16%7Ch%7CFF0000%7Cb%7CNot Confirmed' />

               }
            </p>
          </div>
          <hr />
          <br />

          <div>

            <h2> Reservations  </h2>
            {

              this.state.reservations.map((data,index)=> <div key={index}> <span> <ReservationsProfile reservation={data}/> </span> <span> <ReviewForm data={this.state.data} reservationid={data.id} userid={this.state.user_id} /> </span> </div>)

            }



          </div>


        </div>
<div className="big-spacer">
</div>
      </div>
    )
  }
}

export default UserProfile
