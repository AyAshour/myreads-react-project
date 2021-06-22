import React, { Component } from 'react';
import Book from './Book';
import PropTypes from "prop-types";



export default class BookList extends Component {


  updateBook = (book, shelf) => {
    this.props.updateBook(book, shelf);
  }

  render() {

    return (
      <div>

        <ol className="books-grid">
          {
            this.props.bookShelf.filter(b => b.shelf.toLowerCase() === this.props.shelf.replace(/\s/g, '').toLowerCase()).map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelf={book.shelf}
                  bookImage={book.imageLinks.smallThumbnail}
                  updateBook={this.updateBook}
                ></Book>
              </li>
            ))}
        </ol>

      </div>
    )
  }

}
BookList.PropType = {
  bookShelf: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired,
  updateBook: PropTypes.func.isRequired,


}


