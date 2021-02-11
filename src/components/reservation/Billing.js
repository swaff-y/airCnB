import React from 'react'
import Calendar from './Calendar'
import axios from 'axios'

const SERVER_BASE_URL = 'https://air-bnb-replication.herokuapp.com'

class Billing extends React.Component {
  state = {
    showCalendar: false,
    guestsCount: 1
  }

  toggleCalendar = () => {
    this.setState({
      showCalendar: !this.state.showCalendar
    })
  }

  clearCalendar = () => {
    const ranges = {}
    ranges['selection'] = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
    this.props.handleSelect(ranges)
  }

  updateGuestsCount = value => {
    const maxGuests = this.props.property.max_guests
    let guestsCount = this.state.guestsCount

    if(value && guestsCount < maxGuests ) guestsCount++
    if(!value && guestsCount > 1 ) guestsCount--

    this.setState({
      guestsCount: guestsCount
    })
  }

  initiateReservation = () => {
    if(this.props.isLoggedIn){
      const reservation = {
        property_id: this.props.property.id,
        from_date: this.props.selectionRange.startDate,
        to_date: this.props.selectionRange.endDate,
        guests_count: this.state.guestsCount,
        booking_code: Math.random().toString(16).substr(2, 8)
      }
      axios.post(`${SERVER_BASE_URL}/reservations.json`,
        { reservation },
        { withCredentials: true }

      )
      .then(res => {
        this.props.processReservation(res.data)
      })
      .catch(console.warn)

    } else {
      this.props.toggleAuthModal('login', true)
    }
  }

  formatCurrency = value => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  }

  render(){
    const pricePerNight = this.props.property.listing_price
    const maxGuests = this.props.property.max_guests
    const cleaningFee = this.props.property.cleaning_fee
    const serviceFee = this.props.property.service_fee
    const dateDiff = (this.props.selectionRange.endDate - this.props.selectionRange.startDate) / 1000 / 60 / 60 / 24
    const total = pricePerNight * dateDiff

    const grandTotal = pricePerNight * dateDiff + cleaningFee + serviceFee

    const dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };

    let nights = dateDiff <= 0 ? 'Select a date range' : `${dateDiff} nights`

    return(
      <div className="billing">
        {
          dateDiff <= 0 ?
            <div>
              { this.formatCurrency(pricePerNight) } <span>/night</span>
            </div> :
            <div>
              { this.formatCurrency(grandTotal) } <span>total</span>
            </div>
        }

        <div className="reserve">
          <div className="date-range" onClick={ this.toggleCalendar }>
            <div className="date left">
              <div>CHECK-IN</div>
              <div>
                {
                  this.props.selectionRange.startDate.toLocaleDateString()
                }
              </div>
            </div>
            <div className="date">
              <div>CHECKOUT</div>
              <div>
                {
                  this.props.selectionRange.endDate.toLocaleDateString()
                }
              </div>
            </div>
          </div>
          <div className="guests">
            <div>GUESTS</div>
            <div className="counter">
              <span onClick={ () => this.updateGuestsCount(false) }>-</span>
              <span onClick={ () => this.updateGuestsCount(true) }>+</span>
            </div>
            <div>
              { this.state.guestsCount }
              { this.state.guestsCount > 1 ? ' guests' : ' guest' }
            </div>
          </div>
          {
            this.state.showCalendar ?
              <div className="calendar floating">
                <div className="date-range floating">
                  <div className="date left">
                    <div>CHECK-IN</div>
                    <div>
                      {
                        this.props.selectionRange.startDate.toLocaleDateString()
                      }
                    </div>
                  </div>
                  <div className="date">
                    <div>CHECKOUT</div>
                    <div>
                      {
                        this.props.selectionRange.endDate.toLocaleDateString()
                      }
                    </div>
                  </div>
                </div>
                <div className="floating header">
                  <div>
                    { nights }
                  </div>
                  <div>
                    {
                      dateDiff <= 0 ?
                        <span>
                          Add your travel dates for exact pricing
                        </span> :
                        <span>
                          {
                            new Intl.DateTimeFormat('en-US', dateFormat).format(this.props.selectionRange.startDate)
                          }
                          &nbsp;-&nbsp;
                          {
                            new Intl.DateTimeFormat('en-US', dateFormat).format(this.props.selectionRange.endDate)
                          }
                        </span>
                    }
                  </div>
                </div>
                <Calendar
                  handleSelect={ this.props.handleSelect }
                  selectionRange={ this.props.selectionRange }
                  dateRangeReserved={this.props.property.reservations}
                  disabledDates={this.props.disabledDates}
                />
                <div className="calendar action">
                  <span onClick={ this.clearCalendar }>
                    Clear dates
                  </span>
                  <span className="button" onClick={ this.toggleCalendar }>
                    Close
                  </span>
                </div>
              </div> : null
          }
          <span>
            You can have a maximum of { maxGuests } guests
          </span>
        </div>
        <div>
          {
            dateDiff <= 0 ?
              <button
                className="button"
                onClick={ this.toggleCalendar }
                >
                Check Availability
              </button> :
              <button
                className="button"
                onClick={ this.initiateReservation }
                >
                Make Reservation
              </button>
          }
        </div>
        <div className="bill">
          {
            dateDiff <= 0 ?
              <div>
                <span>
                  Enter a date range and number of guests to check total lodging price, including any additional fees.
                </span>
              </div> :
              <div>
                <span>You wont be charged yet.</span>
                <span>Price shown is the total lodging price, including any additional fees.</span>
                <div className="bill-table">
                  <div>
                    <span>
                      { this.formatCurrency(pricePerNight) } x { dateDiff } nights
                    </span>
                    <span>
                      { this.formatCurrency(total) }
                    </span>
                  </div>
                  <div>
                    <span>Cleaning fee</span>
                    <span>{ this.formatCurrency(cleaningFee) }</span>
                  </div>
                  <div>
                    <span>Service fee</span>
                    <span>{ this.formatCurrency(serviceFee) }</span>
                  </div>
                </div>
                <div className="bill-total">
                  <span>Total</span>
                  <span>
                    { this.formatCurrency(grandTotal) }
                  </span>
                </div>
              </div>
          }
        </div>
      </div>
    )
  }
}

export default Billing
