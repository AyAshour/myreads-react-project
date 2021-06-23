import React from 'react'
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { getAll, update } from './BooksAPI';
import BookShelfList from './BookShelfList';
import PageNotFound from './PageNotFound';
import SearchBooks from './SearchBooks';

const bookShelfs = ['Currently Reading', 'Want To Read', 'Read'];

export default class BooksApp extends React.Component {

  state = {
    myBooks: []
  };


  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = async () => {
    await getAll().then(books => this.setState({
      myBooks: books
    }));
  }

  updateBook = async (book, shelf) => {
    await update(book, shelf);
    this.updateBookState(book, shelf);
  }
  updateBookState = (book, shelf) => {
    var index = this.state.myBooks.findIndex(x => x.id === book.id);
    let { myBooks } = this.state;
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
  }

  render() {

    return (
      <div className="app">
        <Switch>
          <Route exact path='/search'>
            <SearchBooks
              myBooks={this.state.myBooks}
              updateBook={this.updateBook}></SearchBooks>
          </Route>
          <Route exact path='/'>
            <BookShelfList
              bookShelfs={bookShelfs}
              myBooks={this.state.myBooks}
              updateBook={this.updateBook}
            ></BookShelfList>
          </Route>
          <Route component={PageNotFound} ></Route>
        </Switch>
      </div>
    )
  }
}


