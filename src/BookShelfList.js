import React, { Component } from 'react';
import { getAll, update } from './BooksAPI';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";



export default class BookShelfList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: []
    };
  }



  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = async () => {
    await getAll().then(books => this.setState({
      allBooks: books
    }));
  }

  updateBook = async (book, shelf) => {
    await update(book, shelf);
    this.updateBookState(book, shelf);
  }
  updateBookState = (book, shelf) => {
    var index = this.state.allBooks.findIndex(x => x.id === book.id);
    let { allBooks } = this.state;
    if (index === -1) {
      allBooks.push(book);
    } else {

      this.setState({
        allBooks: allBooks,
      });
    }
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
                    bookShelf={this.state.allBooks}
                    updateBook={this.updateBook}
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
