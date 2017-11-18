import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import './App.css'

class BooksApp extends React.Component {
  state = {
    shelves: [],
    searchResults: [],
    books: {},
    isLoading: false
  }

  componentDidMount() {
    this.setState({isLoading: true});

    BooksAPI.getAll().then((data) => {
      let shelves = [],
          books = {},
          bookMap = {};

      data.forEach((book) => {
        books[book.id] = book;

        if ( bookMap[book.shelf] ) {
          bookMap[book.shelf].push(book.id);
        } else {
          shelves.push(book.shelf);
          bookMap[book.shelf] = [book.id];
        }
      });

      this.setState({
        shelves: shelves.map((shelf) => ({
          name: shelf,
          books: bookMap[shelf]
        })),
        books: books,
        isLoading: false
      });
    });
  }

  getShelves = () => {
    return this.state.shelves.map((shelf) => shelf.name);
  }

  onUpdate = (shelf, bookId) => {
    this.setState({isLoading: true});
    BooksAPI.update(bookId, shelf).then((data) => {
      let books = this.state.books;
      books[bookId].shelf = shelf;

      this.setState({
        shelves: this.state.shelves.map((s) => ({...s, books: data[s.name]})),
        books: books,
        isLoading: false
      });
    });
  }

  onSearch = (event) => {
    const q = event.target.value;

    if ( q.length < 3 ) return;

    BooksAPI.search(q).then((data) => {
      let newBooks = {},
          searchResults = [];

      if ( data.error ) return;

      data.forEach((book) => {
        newBooks[book.id] = book;

        if (this.state.books[book.id])
          newBooks[book.id].shelf = this.state.books[book.id].shelf;

        searchResults.push(book.id);
      });

      this.setState({
        searchResults: searchResults,
        books: {...this.state.books, ...newBooks},
        isLoading: false
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {this.state.shelves && this.state.shelves.map((shelf, index) => (
                  <Shelf books={shelf.books.map((b) => this.state.books[b])} name={shelf.name} shelves={this.getShelves()} key={index} onUpdate={this.onUpdate}/>
                ))}
              </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        }/>
        <Route path="/search" render={() =>
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={this.onSearch}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
              <Shelf books={this.state.searchResults.map((b) => this.state.books[b])}
                     shelves={this.getShelves()}
                     name="Search Results"
                     onUpdate={this.onUpdate}/>
            </div>
          </div>
        }/>
      </div>
    )
  }
}

export default BooksApp
