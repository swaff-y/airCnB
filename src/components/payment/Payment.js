import React from 'react'
import Braintree from './Braintree'
import axios from 'axios'
import './Payment.css'
import '../authentication/Auth.css'

const SERVER_BASE_URL = 'https://air-bnb-replication.herokuapp.com/';


class Payment extends React.Component {

  state = {
    from_date: '2021-01-01',
    to_date: '2021-01-01',
    total_due: 0,
    guests_count: 0,
    property: {
      heading: '',
      title: '',
      address: '',
      bedrooms: 0,
      bathrooms: 0,
      cleaning_fee: 0,
      service_fee: 0,
      listing_price: 0
    }
  }

  processPayment = nonce => {
    const id = this.props.match.params.reservation_id
    const user_id = this.props.user.id

    axios.post(`${SERVER_BASE_URL}/pay/${id}`,
      { nonce: nonce, user_id: user_id},
      { withCredentials: true }
    )
    .then( res => {
      const id = this.props.match.params.reservation_id
      this.props.history.push(`/book/${id}/confirmation`)
    })
    .catch(console.warn)
  }

  formatCurrency = value => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  }

  componentDidMount = () => {
    const id = this.props.match.params.reservation_id
    // if(this.props.isLoggedIn){
      axios.get(`${SERVER_BASE_URL}/reservations/${id}.json`,
        { withCredentials: true }
      )
      .then( res => {
        this.setState(res.data)
      })
      .catch(console.warn)

    // } else {
    //   this.props.history.push('/')
    // }
  }


  render(){
    const startDate =  new Date(this.state.from_date)
    const endDate =  new Date (this.state.to_date)
    const guestsCount =  this.state.guests_count
    const totalDue =  this.state.total_due
    const pricePerNight =  this.state.property.listing_price
    const cleaningFee =  this.state.property.cleaning_fee
    const serviceFee =  this.state.property.service_fee
    const heading =  this.state.property.heading
    const title =  this.state.property.title
    const bedrooms =  this.state.property.bedrooms
    const bathrooms =  this.state.property.bathrooms

    const dateDiff = (endDate - startDate) / 1000 / 60 / 60 / 24

    const total = pricePerNight * dateDiff

    return(
      <div className="container">
        <div className="payment">
          <div>
            <span></span>
            <h3>Confirm and pay</h3>
          </div>
          <ul>
            <li>
              <div className="right">
                <ul>
                  <li className="property-image">
                    <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" width="100%" />
                  </li>
                  <li className="property-details">
                    <div>{title}</div>
                    <div>{heading}</div>
                    <div>{bedrooms} bed&nbsp;&#183;&nbsp;{bathrooms} bath</div>
                    <div>5.0 (8)</div>
                  </li>
                </ul>
                <div className="trip">
                  <h5>Your trip</h5>
                  <ul>
                    <li className="dates">
                      <div>Dates</div>
                      <div>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</div>
                    </li>
                    <li className="guests-count">
                      <div>Guests</div>
                      <div>{guestsCount} guest</div>
                    </li>
                  </ul>
                </div>
                <div className="price">
                  <h5>Price details</h5>
                    <div className="bill-table">
                      <div>
                        <span>
                          {this.formatCurrency(pricePerNight)} x {dateDiff} nights
                        </span>
                        <span>
                          {this.formatCurrency(total)}
                        </span>
                      </div>
                      <div>
                        <span>Cleaning fee</span>
                        <span>{this.formatCurrency(cleaningFee)}</span>
                      </div>
                      <div>
                        <span>Service fee</span>
                        <span>{this.formatCurrency(serviceFee)}</span>
                      </div>
                    </div>
                    <div className="bill-total">
                      <span>Total Due</span>
                      <span>
                        {this.formatCurrency(totalDue)}
                      </span>
                    </div>
                </div>
              </div>
            </li>
            <li>
              <Braintree processPayment={ this.processPayment }/>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Payment
