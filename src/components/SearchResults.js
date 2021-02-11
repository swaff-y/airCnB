import React, { useEffect, useState} from 'react';
import axios from 'axios';
import ListingDisplay from './ListingDisplay';
import MapContainer from './MapContainer';
import Paginate from './Paginate';
import SearchBar from './SearchBar';
import './Search.css'


// const GOOGLE_GEOCODE_API = "https://maps.googleapis.com/maps/api/geocode/json?";
const BASE_URL = "https://air-bnb-replication.herokuapp.com/";
const SEARCH_RESULTS_PER_PAGE = 3;

const SearchResults = (props) => {

  const searchTerm = props.match.params.searchText;
  const [startDate] = useState(props.match.params.startDate);
  const [endDate] = useState(props.match.params.endDate);
  const [locations,setLocations] = useState([]);
  const [listData,setListData] = useState([]);
  const [showType, setShowType] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  // const params = (searchTerm) => {
  //   let paramsObj = {
  //     key: "AIzaSyAW5MNODxdAncbpnSGtOIl6Gyfjo-e6w3g",
  //     address: searchTerm
  //   }
  //   return paramsObj;
  // }

  useEffect(()=>{
    axios.get(BASE_URL + "/properties/search/" + searchTerm)
    .then(res => {
      setLocations(res.data)
      setPageCount(Math.ceil(res.data.length / SEARCH_RESULTS_PER_PAGE ))
    })
    .catch(console.warn())
     // loadPageData(3,0);
  },[searchTerm])


  const loadPageData = (offset) => {
    // console.log({itemsPerPage,offset});
    const url = BASE_URL + "/properties/search/" + searchTerm + "/"+ SEARCH_RESULTS_PER_PAGE + "/" + offset;
    axios.get(url)
    .then((res)=> {
        setListData(res.data)
    })
    .catch(console.warn())
  }

  const handleClick = (ev) => {
    // console.log("card clicked!",ev.currentTarget.id);
    props.history.push(`/property/${ev.currentTarget.id}/${startDate}/${endDate}`)
  }
   // console.log("search lat res:", searchLat);

  const listDataRet = (data) => {
    setListData(data);
  }

  const toggleType = () => {
    if(showType === false){
      setShowType(true)
    }else if(showType === true){
      setShowType(false)
    }
  }
  const togglePrice = () => {
    if(showPrice === false){
      setShowPrice(true)
    }else if(showPrice === true){
      setShowPrice(false)
    }
  }
  const propertyType = (ev) => {
    console.log("hello", propertyType);
     const url = BASE_URL + "/properties/searchtype/" + searchTerm + "/" + ev.target.innerHTML + "/100/0";
     axios.get(url)
     .then((res)=> {
         setListData(res.data)
         setShowType(false)
     })
     .catch(console.warn())
  }



  const priceRanges = (ev) => {

    if(ev.target.innerHTML == "-50"){
      getRangeData(0,50);
    }else if(ev.target.innerHTML == "50-70"){
      getRangeData(50,70);
    }else if(ev.target.innerHTML == "70-90"){
      getRangeData(70,90);
    }else if(ev.target.innerHTML == "90-110"){
      getRangeData(90,110);
    }else if(ev.target.innerHTML == "110-130"){
      getRangeData(110,130);
    }else if(ev.target.innerHTML == "130+"){
      getRangeData(130,1000000);
    }
  }

  const getRangeData = (lower,higher) => {
    const url = BASE_URL + "/properties/searchprice/" + searchTerm + "/" + lower + "/" + higher + "/100/0";
    axios.get(url)
    .then((res)=> {
        setListData(res.data)
        setShowPrice(false)
    })
    .catch(console.warn())
  }

  const priceArray = [{range:"-50"},{range:"50-70"},{range:"70-90"},{range:"90-110"},{range:"110-130"},{range:"130+"}];

  const mkArray = (array) => {
    let arr = [];
    for(let i = 0; i < array.length;i++){
      arr.push(array[i].property_type);
    }
    return arr;
  }

  const sort_unique = (arr) => {

    if (arr.length === 0) return arr;

    arr = arr.sort(function (a, b) { return a*1 - b*1; });
    var ret = [arr[0]];
    for (var i = 1; i < arr.length; i++) { //Start loop at 1: arr[0] can never be a duplicate
      if (arr[i-1] !== arr[i]) {
        ret.push(arr[i]);
      }
    }
    console.log("the array:",ret);
    return ret;
  }

  return (
    <div className="search-result">
      <div>
        <h3>
          <strong>Accomodation in { searchTerm }</strong>
        </h3>
        <div className="search-filter">
          <div className="type-filter">
            <div className="filter-button" onClick={toggleType}>
              Type of place
            </div>
            {
              showType === true ?
              <div className="filter-options">
                {
                  sort_unique(mkArray(locations)).map((data,index)=><div key={index} onClick={propertyType}>{data}</div>)
                }
              </div> : null
            }
          </div>
          <div className="price-filter">
            <button className="filter-button" onClick={togglePrice}>Price</button>
            {
              showPrice === true ?
              <div className="filter-options">
                {
                  priceArray.map((data,index)=><div onClick={priceRanges}>{data.range}</div>)
                }
              </div> : null
            }
          </div>  
        </div>
        <div className="search-list">
          {
            listData.map((data, index) => <ListingDisplay key={data.id} propertyData={data} searchTerm={searchTerm} handleClick={handleClick}/>)
          }
          <div className="pagination">
            {
              locations.length > 0 ?
              <Paginate length={locations.length} pageCount={pageCount} loadPageData={loadPageData} perPage={SEARCH_RESULTS_PER_PAGE} searchTerm={searchTerm} />
              :
              <div className="loading">
                Loading...
              </div>
            }
          </div>
        </div>
      </div>
      <div className="map-wrapper">
        <div className="search-map">
          {
            locations.length > 0 ?
            <MapContainer locations={locations}/>
              :
            <div className="loading">
              Loading...
            </div>
          }
        </div>
      </div>
    </div>
  ); //return
}; //function
export default SearchResults;


// <div>
//   <h1>Accomodation in { searchTerm }</h1>
//   <div className="col-9">
//     <div className="container text-nowrap">
//       <div className="row">
//         <div className="col-3">
//           <div className="part of filter:  dropdown">
//             <button className="btn btn-outline-secondary dropdown-toggle" type="button" onClick={toggleType}>
//               Type of place
//             </button>
//             <div className="list-group">
//               {
//                 showType === true ? locations.map((data,index)=><div onClick={propertyType}>{data.property_type}</div>) : null
//               }
//             </div>
//           </div>
//         </div>
//         <div className="col-3">
//           <button className="btn btn-outline-secondary dropdown-toggle"  onClick={togglePrice}>Price</button>
//           <div className="list-group">
//             {
//               showPrice === true ? priceArray.map((data,index)=><div onClick={priceRanges}>{data.range}</div>) : null
//             }
//           </div>
//         </div>
//         <div className="col-6">
//           {
//             locations.length > 0 ?
//             <Paginate length={locations.length} pageCount={pageCount} loadPageData={loadPageData} perPage={SEARCH_RESULTS_PER_PAGE} searchTerm={searchTerm} />
//             :
//             <p>Loading....</p>
//           }
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="col-3" id="">
//     {
//       locations.length > 0 ?
//       <MapContainer locations={locations}/>
//       :
//       <p>Loading...</p>
//     }
//   </div>
// </div>
// <div>
//   {
//     listData.map((data, index) => <ListingDisplay key={data.id} propertyData={data} searchTerm={searchTerm} handleClick={handleClick}/>)
//   }
// </div>
