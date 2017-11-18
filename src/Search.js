import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';
import PropTypes from 'prop-types';
import * as Util from './Util'

class Search extends Component {
  static propType = {
    delay: PropTypes.integer,
    onUpdate: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
  }

  static defaultProps = {
    delay: 200
  }

  handleValueChange = (event) => {
    const value = event.target.value;

    if ( this.timeout )
      clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.props.handleValueChange(value)
    }, this.props.delay)
  }

  render() {
    return (<div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text"
                 placeholder="Search by title or author"
                 defaultValue={Util.getSearchTerm()}
                 onChange={this.handleValueChange}/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          <Shelf books={this.props.books}
                 options={this.props.options}
                 onUpdate={this.props.onUpdate}/>
        </ol>
      </div>
    </div>)
  }
}

export default Search