import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
// import CommentList from './CommentList';
import PropTypes from 'prop-types';
// import axios from 'axios';
// import $ from 'jquery';

window.React = React;

const BASE_URL = "https://air-bnb-replication.herokuapp.com//";

class Paginate extends Component {
  // static propTypes = {
  //   // url: PropTypes.string.isRequired,
  //   // author: PropTypes.string.isRequired,
  //   perPage: PropTypes.number.isRequired,
  // };

  constructor(props) {
    super(props);

    this.state = {
      // data: [],
      offset: 0,
      // total_count: 0
    };
  }

  componentDidMount() {
    // this.setState({
    //   total_count: this.props.length,
    // })
    this.props.loadPageData(0);
  }
  //We need to rerequest a new page update new search request.
  componentDidUpdate(prevProps) {
    if(prevProps.searchTerm !== this.props.searchTerm){
      this.props.loadPageData(0);
    }
  }


  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);
    console.log({selected, props: this.props.perPage});
    this.setState({ offset: offset }, () => {
      this.props.loadPageData(offset);
    });
  };

  render() {
    // console.log("amount:", this.state.total_count );
    // console.log("offset:", this.state.data);

    return (
      <div className="commentBox">
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.props.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination justify-content-center'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          previousClassName={'btn btn-outline-secondary btn-sm me-2'}
          nextClassName={'btn btn-outline-secondary btn-sm'}
          activeClassName={'btn btn-outline-primary'}
          pageClassName={'btn btn-outline-secondary btn-sm me-2'}
        />
      </div>
    );
  }
}

export default Paginate

// loadCommentsFromServer() {
//   // axios.get(BASE_URL + "/properties/search/" + this.props.searchTerm)
//   // .then((res)=> {
//   //   this.setState({
//   //     total_count: res.data.length
//   //   })
//   //   console.log("Full Data:", res.data );
//   // })
//   const url = BASE_URL + "/properties/search/" + this.props.searchTerm + "/" + this.props.perPage + "/" + this.state.offset;
//   console.log("URL:", url);
//   axios.get(url)
//   .then((res)=> {
//     this.setState({
//       data: res.data,
//       pageCount: Math.ceil(this.state.total_count / this.props.perPage),
//     });
//     this.props.listData(res.data);
//     // console.log("Sorted Data:", res.data );
//   });
// }
