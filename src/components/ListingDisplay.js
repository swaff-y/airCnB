import React, { useState} from 'react';
// import {Route, Link, HashRouter as Router} from 'react-router-dom';
// import axios from 'axios';

const ListingDisplay = (props) => {

  const formatCurrency = value => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  }

  return (
    <div className="list-item" onClick={props.handleClick} id={props.propertyData.id}>
        <div className="list-image">
          {
            <img src={"https://res.cloudinary.com/dhl1cdqch/image/upload/v1610626496/" + props.propertyData.images[0].image_url} loading="lazy" alt={props.propertyData.images[0].name} />
          }
        </div>
        <div className="list-details">
          <div>
            <div>
              Entire {props.propertyData.property_type} in {props.searchTerm}
            </div>
            <div>
              {props.propertyData.heading}
            </div>
            <div className="dash"></div>
            <div>
              { props.propertyData.max_guests } guests&nbsp;&nbsp;&#183;&nbsp;&nbsp;
              {props.propertyData.bedrooms} beds &nbsp;&nbsp;&#183;&nbsp;&nbsp;
              {props.propertyData.bathrooms} bath
            </div>
          </div>
          <div>
            <p>
              <strong>
                {formatCurrency(props.propertyData.listing_price)}
              </strong> / night
            </p>
          </div>
        </div>
    </div>
  ); //return
}; //function
export default ListingDisplay;
