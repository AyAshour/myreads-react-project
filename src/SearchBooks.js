import React, { Component } from "react";
import Book from './Book';
import { search, update } from "./BooksAPI";
import { Link } from 'react-router-dom';




export default class SearchBooks extends Component {
  state = {
    query: '',
    books: null,
    displayBooks: false
  }
  updateQuery = async (query) => {
    this.setState({
      query: query
    });
  };
  searchBooks = async () => {

    const res = await search(`${this.state.query}`);
    if (!res.hasOwnProperty('error')) {
      res.forEach(book => {
        book.shelf = 'none'
      });
      this.updateState(res, true);
    }
    else
      this.updateState(null, false);

  }
  disableDisplay = () => {
    this.setState({
      displayBooks: false,
      books: null
    });

  }
  updateState = (res, displayBooks) => {
    this.setState({
      books: res,
      displayBooks: true
    });
  }

  updateBook = async (book, shelf) => {
    await update(book, shelf);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
            <button
              className="close-search"
            >
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />

            <button
              onClick={async (event) => await this.searchBooks()}
            >
              search books
            </button>
            <button
              onClick={(event) => this.disableDisplay()}
            >
              clear results
            </button>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" >
            <div>
              {this.state.displayBooks && this.state.books !== null ?
                <ol className="books-grid">
                  {
                    this.state.books.map((book, index) => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          shelf={book.shelf}
                          bookImage={book.imageLinks.smallThumbnail}
                          updateBook={this.updateBook}
                        ></Book>
                      </li>
                    ))
                  }
                </ol> : <div>search to display books</div>}
            </div>


          </ol>
        </div>
      </div>
    );
  }
}
