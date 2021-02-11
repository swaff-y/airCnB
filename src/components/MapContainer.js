import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class MapContainer extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          // lat: this.props.lat, //-33.8688197,
          // long: this.props.long, //151.2092955,
          bounds: null,
      };
  };

  componentDidUpdate(prevProps) {
    if(prevProps.locations !== this.props.locations){
      const bounds = new this.props.google.maps.LatLngBounds();
        this.props.locations.forEach((item, i) => {
          bounds.extend({lat:item.latitude,lng:item.longitude});
        });
        this.setState({bounds});
    }
  }


  displayMarkers = () => {
    return this.props.locations.map((location, index) => {
      return <Marker
              key={index}
              id={index}
              position={{
                lat: location.latitude,
                lng: location.longitude
              }}
              onClick={() => console.log("You clicked me!")}
              title={"$100"}
              name={"location.name"}
              icon={{
                url: `https://chart.googleapis.com/chart?chst=d_map_spin&chld=1|0|FFFFFF|10|b|$ ${location.listing_price}`,
              }}
              />
    })
  }

render(){
  const mapStyles = {
    width: '50%',
    height: '95%',
  };

    return (
      <div>
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          initialCenter={{ lat: this.props.locations[0].latitude, lng: this.props.locations[0].longitude}}
          bounds={this.state.bounds}
        >
        {this.displayMarkers()}
        </Map>
      </div>
    ); //return
  }; //function
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAW5MNODxdAncbpnSGtOIl6Gyfjo-e6w3g'
})(MapContainer);
