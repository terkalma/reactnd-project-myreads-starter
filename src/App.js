import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import Search from './Search'
import * as Util from './Util'
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
    this.loadBooks();
  }

  loadBooks = () => BooksAPI.getAll().then((data) => {
    let shelves = [],
        books = {},
        bookMap = {};

    const term = Util.getSearchTerm();

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
        books: bookMap[shelf],
      })),
      books: books
    });

    (term.length > 0) ? this.search(term) : this.resetSearch()
  });

  getOptions = () => {
    const allOptions = new Set(["currentlyReading", "wantToRead", "read",
      ...this.state.shelves.map((shelf) => shelf.name)]);
    return Array.from(allOptions);
  }

  onUpdate = (shelf, bookId) => {
    this.setState({isLoading: true});
    BooksAPI.update(bookId, shelf).then((data) => this.setState(prevState => {
        return {
          shelves: prevState.shelves.map((s) => ({...s, books: data[s.name]})),
          books: {
            ...prevState.books,
            [bookId]: {
              ...prevState.books[bookId],
              shelf: shelf
            }
          },
          isLoading: false
        }
    }));
  }

  search = (term) => BooksAPI.search(term).then((data) => {
    let newBooks = {},
        searchResults = [];

    if ( data.error ) return;

    data.forEach((book) => {
      newBooks[book.id] = book;

      // The current state is the sourse of thruth for shelf information.
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

  resetSearch = () => this.setState({ searchResults: [], isLoading: false });

  render() {
    return true && (
      <div className="app">
        <Route exact path="/" render={(history) =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {this.state.shelves && this.state.shelves.map((shelf, index) => (
                  <Shelf name={shelf.name}
                         books={shelf.books.map((b) => this.state.books[b])}
                         options={this.getOptions()}
                         key={index}
                         onUpdate={this.onUpdate}/>
                ))}
              </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        }/>
        <Route path="/search" render={({ history }) =>
          <Search books={this.state.searchResults.map((id) => this.state.books[id])}
                  handleValueChange={(term) => {
                    (term.length > 0) ? this.search(term) : this.resetSearch();
                    history.push({ search: `q=${term}` });
                  }}
                  options={this.getOptions()}
                  onUpdate={this.onUpdate} />
        }/>
      </div>
    )
  }
}

export default BooksApp
