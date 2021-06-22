import React from 'react'
import { Route, Switch } from 'react-router-dom';
import './App.css';
import BookShelfList from './BookShelfList';
import SearchBooks from './SearchBooks';

const bookShelfs = ['Currently Reading', 'Want To Read', 'Read'];

export default class BooksApp extends React.Component {


  render() {

    return (
      <div className="app">
        <Switch>
          <Route exact path='/search'>
            <SearchBooks></SearchBooks>
          </Route>
          <Route exact path='/'>
            <BookShelfList bookShelfs={bookShelfs}></BookShelfList>
          </Route>
        </Switch>
      </div>
    )
  }
}


