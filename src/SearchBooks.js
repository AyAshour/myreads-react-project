import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Book from './Book';
import { getAll, search, update } from "./BooksAPI";


export default class SearchBooks extends Component {


  state = {
    query: '',
    books: null,
    displayBooks: false,
  }


  updateQueryAndSearch = async (query) => {
    this.updateQuery(query);
    await this.searchBooks(query);
  }

  updateQuery = (query) => {
    console.log(`query`, query);
    this.setState({
      query: query
    });
  };
  /*componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = async () => {
    await getAll().then(books => this.setState({
      myBooks: books
    }));
  }*/

  searchBooks = async (query) => {
    if (query.trim() !== '') {

      const res = await search(`${query}`);
      if (!res.hasOwnProperty('error')) {
        res.forEach(book => {
          console.log(`this.props.myBooks`, this.props.myBooks)
          const myBook = this.props.myBooks.filter(b => b.id === book.id);
          if (myBook.length > 0) {
            book.shelf = myBook[0].shelf;
          }
          else {
            book.shelf = 'none'
          }
        });
        await this.updateState(res, true);
      }
      else {
        await this.updateState(null, false);
      }
    } else {
      await this.updateState(null, false);
    }

  }

  updateState = async (res, displayBooks) => {
    this.setState({
      books: res,
      displayBooks: displayBooks,
    });
  }
  updateBook = (book, shelf) => {
    this.props.updateBook(book, shelf);
  }


  /* updateBook = async (book, shelf) => {
     await update(book, shelf);
     this.updateBookState(book, shelf);
   }
   updateBookState = (book, shelf) => {
     var index = this.state.myBooks.findIndex(x => x.id === book.id);
     let { query, books, displayBooks, myBooks } = this.state;
     if (index === -1) {
       myBooks.push(book);
       this.setState({
         myBooks: myBooks
       });
     } else {
       this.setState({
         myBooks: [
           ...this.state.myBooks.slice(0, index),
           Object.assign({}, this.state.myBooks[index], book),
           ...this.state.myBooks.slice(index + 1)
         ]
       });
     }
   }*/

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
              onChange={event => this.updateQueryAndSearch(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" >
            <div>
              {this.state.displayBooks && this.state.query !== '' && this.state.books !== null ?
                <ol className="books-grid">
                  {
                    this.state.books.map((book, index) => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          shelf={book.shelf}
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
