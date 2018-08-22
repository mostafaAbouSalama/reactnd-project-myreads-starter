import React, { Component } from "react";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import sortBy from "sort-by";
import Book from './Book.js';

class DisplayPage extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateShelfFromDisplayToParent: PropTypes.func.isRequired
  }

  //  Pass the book object and the shelf to parent component
  updateShelfDisplay = (bookObj, shelfStr) => {
    this.props.updateShelfFromDisplayToParent(bookObj, shelfStr)
  }

  render() {

    //  Filtering the books to the three shelves
    let current = this.props.books.filter( b =>
        b.shelf === "currentlyReading"
    );
    let wantTo = this.props.books.filter( b =>
        b.shelf === "wantToRead"
    );
    let already = this.props.books.filter( b =>
        b.shelf === "read"
    );

    current.sort(sortBy("title"));
    wantTo.sort(sortBy("title"));
    already.sort(sortBy("title"));

    return (
      <div>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      current.map( b => (
                          <Book key={b.id} book={b}
                          updateShelfFromBookToParent={(bookObj, shelfStr) => this.updateShelfDisplay(bookObj, shelfStr)} />
                        )
                      )
                    }
                  </ol>
                </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      wantTo.map( b => (
                        <Book key={b.id} book={b}
                        updateShelfFromBookToParent={(bookObj, shelfStr) => this.updateShelfDisplay(bookObj, shelfStr)} />
                        )
                      )
                    }
                  </ol>
                </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      already.map( b => (
                        <Book key={b.id} book={b}
                        updateShelfFromBookToParent={(bookObj, shelfStr) => this.updateShelfDisplay(bookObj, shelfStr)} />
                        )
                      )
                    }
                  </ol>
                </div>
            </div>
          </div>
        </div>
        <div className="open-search">
        <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default DisplayPage;
