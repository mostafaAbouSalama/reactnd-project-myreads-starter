import React, { Component } from "react";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import sortBy from "sort-by";
import Book from './Book.js';

class SearchPage extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelfFromSearchToParent: PropTypes.func.isRequired,
    searchThisQuery: PropTypes.func.isRequired
  }

  //  A query state to make this form a controlled component
  state = {
    query: ""
  }

  updateQuery = (query) => {
    this.setState({query})
    this.props.searchThisQuery(query)
  }

  //  Pass the book object and the shelf to parent component
  updateShelfSearch = (bookObj, shelfStr) => {
    this.props.updateShelfFromSearchToParent(bookObj, shelfStr)
  }

  render() {

    let results = this.props.books;
    results.sort(sortBy("title"));

    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              results.map(b => (
                <Book key={b.id} book={b}
                updateShelfFromBookToParent={(bookObj, shelfStr) => this.updateShelfSearch(bookObj, shelfStr)} />
              ))
            }
          </ol>
        </div>
      </div>

    )
  }
}

export default SearchPage;
