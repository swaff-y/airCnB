import React from 'react';
// import axios from 'axios';

const Reviews = (props) => {

  const rating = () => {
    console.log("rating: ", props.review.rating);
    let stars = [];
     for(let i = 0; i < props.review.rating; i++){
       stars.push(<span className="star-rating"> &#9733; </span>)
     }
     return stars;
  }
  // console.log("Props: ", props);

    return(
      <div>
        {
          rating()
        }
        <p>{props.review.comment}</p>
      </div>
    )
}

export default Reviews
