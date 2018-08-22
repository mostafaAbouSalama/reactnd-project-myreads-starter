import React, {Component} from "react";
import PropTypes from "prop-types";

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    updateShelfFromBookToParent: PropTypes.func.isRequired
  }

  //  A shelf state to manage each book separately
  state = {
    shelf: 'none'
  }

  componentDidMount() {
    if (this.props.book.shelf) {
      this.setState({
        shelf: this.props.book.shelf
      })
    }
  }

  updateBookShelf = (event) => {
    this.setState({
      shelf: event.target.value
    })
    this.props.updateShelfFromBookToParent(this.props.book, event.target.value)
  }

  render() {

    let book = this.props.book;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 192,
              backgroundImage: book.imageLinks ?
                `url(${book.imageLinks.thumbnail})` : ""
            }}></div>
            <div className="book-shelf-changer">
              <select onChange={this.updateBookShelf} value={this.state.shelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors ? book.authors.join(", ") : ""}</div>
        </div>
      </li>
    )
  }
}

export default Book;
