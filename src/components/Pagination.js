import React from 'react';
// import React, {useState, useEffect} from 'react';
import '../App.css';

const Pagination = (props) => {

  //set state as null for number of results returned
  const [resultCount, updateResultCount] = useState(props.resultCount);

  //set state default to page 1 of results
  const [currentPage, updateCurrentPage] = useState(1);

  //set to three to test that it works...
  const [resultsPerPage, updateResultsPerPage] = useState(3);

  set number of pages
  const [pageNumbers, updatePageNumbers] = useState([]);

  //render page numbers
  let pageNumbers = [];

  // useEffect(()=> {
  //   // determinePageNumbers(props);
  //
  //   updatePageNumbers(arr);
  //   // updatePageNumbers(pageNumbers => [...pageNumbers, ...arr]);
  //   console.log("pageNumbers:", pageNumbers);
  // },[]) //useEffect

const fillPageNumbers = () => {
  const numPage = Math.ceil(resultCount.length) / resultsPerPage;
  console.log("numPage",numPage);
  for (let i=1; i <= numPage + 1; i++) {
    pageNumbers.push(i);
    console.log("pageNumbers:", pageNumbers);
  } //for
} //fillPageNumbers

  const handleClick = (event) => {
    updateCurrentPage(Number(event.target.id));
  };


  return (
    <div>
      <ul>
        {fillPageNumbers()}
        {
          pageNumbers.map(number => (
            <li
              key={number}
              id={number}
              onClick={handleClick}>
              {number}
            </li>
          )) //map
        }
    </ul>
    </div>
  ) // return


}//pagination function

export default Pagination;
