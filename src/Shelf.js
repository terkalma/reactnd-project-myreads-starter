import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types';
import * as Util from './Util'

class Shelf extends Component {
  static propType = {
    name: PropTypes.string,
    books: PropTypes.array,
    options: PropTypes.array,
    onUpdate: PropTypes.func.isRequired,
  }

  static defaultProps = {
    name: '',
    books: [],
    options: []
  }

  render () {
    return (
      <div className="bookshelf">
        {this.props.name && <h2 className="bookshelf-title">{Util.humanize(this.props.name)}</h2>}
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((b, index) => (
              <li key={index}>
                <Book id={b.id}
                      title={b.title}
                      shelf={b.shelf}
                      authors={b.authors}
                      imageLinks={b.imageLinks}
                      options={this.props.options}
                      onUpdate={this.props.onUpdate}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf