import React, { Component } from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";



export default class BookShelfList extends Component {


  updateBook = (book, shelf) => {
    this.props.updateBook(book, shelf);
  }


  render() {
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content"></div>
          {

            this.props.bookShelfs.map((shelf, index) => {
              return (
                <div key={index}>
                  <BookShelf
                    shelf={shelf}
                    bookShelf={this.props.myBooks}
                    updateBook={this.props.updateBook}
                  ></BookShelf>
                </div>
              )
            })

          }
        </div>
        <div className="open-search">
          <Link to='/search'>
            <button>Add a book</button>
          </Link>
        </div>
      </div>


    );
  }
}
BookShelfList.PropType = {
  bookShelfs: PropTypes.array.isRequired
}
