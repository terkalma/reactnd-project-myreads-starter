import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component {
  render () {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book, index) => (
              <li key={index}>
                <Book data={book} shelves={this.props.shelves}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf