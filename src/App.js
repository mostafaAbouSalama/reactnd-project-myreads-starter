import React, {Component} from "react"
import * as BooksAPI from "./BooksAPI.js"
import "./App.css"
import {Route} from "react-router-dom"
import DisplayPage from "./DisplayPage.js";
import SearchPage from "./SearchPage.js";

class BooksApp extends Component {
  state = {
    booksOnShelves: [],
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({booksOnShelves: books})
    })
  }

  updateShelfLocallyAndInDB = (bookObj, shelfStr) => {
    let books;

    //  Checking to see if this book is already on one of the shelves
    if (this.state.booksOnShelves.find(b => b.id === bookObj.id) !== undefined) {
      books = this.state.booksOnShelves.map( b => {
          if (b.id === bookObj.id) {
            return {...bookObj, shelf: shelfStr}
             // When found, alter its "shelf" property to the new requested shelf
             // and keep all other properties unaltered using the spread operator
          } else {
            return b
          }
        }
      )
    } else {  //  If not on any shelf, concatenate it and alter its shelf property
      books = this.state.booksOnShelves.concat({...bookObj, shelf: shelfStr})
    }

    //  Update the state
    this.setState({booksOnShelves: books})

    // Send Update Request to Database
    BooksAPI.update(bookObj, shelfStr).then((data) => {})
  }

  searchQuery = (query) => {
    let queryResults = []
    if (query) { // If there is a written query, search it
      BooksAPI.search(query).then( response => {
        if (response.error === undefined) { //  If no error is returned
          queryResults = response.map( b => {
            const bookFromShelf = this.state.booksOnShelves.find( bk => bk.id === b.id)
            //  Search through the responses to see if any of them is on the book shelves and bring it from there so that it knows which shelf it is on
            if (bookFromShelf !== undefined) {
              return bookFromShelf;
            }
            return b;
          })
        } else { // If an error is returned from the search API, display nothing
          queryResults = []
        }
        this.setState({searchResults: queryResults})
      })
    } else {
      this.setState({searchResults: queryResults})
    }
  }

  render() {

    return (
      <div className="app">

          <Route exact path="/search" render={() => (
            <SearchPage books={this.state.searchResults} updateShelfFromSearchToParent={(bookObj, shelfStr) => this.updateShelfLocallyAndInDB(bookObj, shelfStr)}
            searchThisQuery={(query) => this.searchQuery(query)}/>
          )} />

          <Route exact path="/" render={() => (
            <DisplayPage books={this.state.booksOnShelves} updateShelfFromDisplayToParent={(bookObj, shelfStr) => this.updateShelfLocallyAndInDB(bookObj, shelfStr)} />
          )}/>

      </div>
    )
  }
}

export default BooksApp;
