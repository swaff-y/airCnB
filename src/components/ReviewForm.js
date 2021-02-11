import React from 'react';
import axios from 'axios';
import '../App.css'

const BASE_URL = "https://air-bnb-replication.herokuapp.com/";

class ReviewForm extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        comment: '',
        rating:'',
        reservation_id: this.props.reservationid,
        isUpdate: false,
        response: false
      }
    }

    componentDidMount(){
      console.log("data: ", this.props.data);
      this.props.data[0].reviews.forEach((item)=>{

        if (item.reservation_id === this.props.reservationid){
          console.log("equal?:",item.reservation_id,this.props.reservationid);
          this.setState({
            comment: item.comment,
            rating: item.rating,
            review_id: item.id,
          })
          this.setState({isUpdate: true})
          // console.log("staste:",this.state.review.reservation_id);
        }
      })
    }

    handleSubmit(event){
      event.preventDefault();
      console.log("check",this.state);
      if(this.state.isUpdate === true){
        axios.put(BASE_URL + "/reviews/" + this.state.review_id + "",
        {
          rating: this.state.rating,
          comment: this.state.comment,
          reservation_id: this.state.reservation_id,
         },
        { withCredentials: true }
        )
        .then((response)=>{
          // console.log(response.data);
          this.setState({response:true})
          setTimeout(()=>{
            this.setState({response:false});
          })
        })
        .catch(console.warn)
      }else{
        console.log("Im in the wrong place",this.state);
        axios.post(BASE_URL + "/reviews",
        {
          rating: this.state.rating,
          comment: this.state.comment,
          reservation_id: this.state.reservation_id,
         },
        { withCredentials: true }
        )
        .then((response)=>{
          // console.log(response.data);
          this.setState({response:true})
          setTimeout(()=>{
            this.setState({response:false});
          })
        })
        .catch(console.warn)
      }

    } //handleSubmit


    onRatingChange(event) {
      this.setState({
        rating: event.target.value
      })
    }

    onCommentChange(event) {
      this.setState({
        comment: event.target.value
      })
    }


  render(){
    // console.log("data is",this.state.review);
    return(
      <div>

        {
          this.state.response === true ? <p>Submitted</p> : null
        }


      <form id="submit-review" onSubmit={this.handleSubmit.bind(this)} method="POST">
       <div className="form-group">
         <label htmlFor="rating">Rating (0-5)</label>
         <input type="number" id="quantity" name="quantity" min="1" max="5" className="form-control"  value={this.state.rating} onChange={this.onRatingChange.bind(this)} />
       </div>
       <br />
         <div className="form-group">
           <label htmlFor="review">Comment </label>
           <textarea className="form-control" rows="5" value={this.state.comment} onChange={this.onCommentChange.bind(this)} />
         </div>

       <br />
       <button type="submit" className="btn btn-primary">Submit</button>
     </form>



      </div>
    )
  }
}

export default ReviewForm
