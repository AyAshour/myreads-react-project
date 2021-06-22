import React, { Component } from 'react';
import BookList from './BookList';
import PropTypes from "prop-types";


export default class BookShelf extends Component {

  updateBook = (book, shelf) => {
    this.props.updateBook(book, shelf);
  }

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelf}</h2>
          <div className="bookshelf-books">
            <BookList
              bookShelf={this.props.bookShelf}
              shelf={this.props.shelf}
              updateBook={this.updateBook}
            ></BookList>
          </div>
        </div>
        <div className="bookshelf"></div>
      </div>
    )
  }
}
BookShelf.PropType = {
  bookShelf: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired,
  updateBook: PropTypes.func.isRequired,
}

