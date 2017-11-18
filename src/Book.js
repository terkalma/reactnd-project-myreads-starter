import React, { Component } from 'react'
import * as Util from './Util'

class Book extends Component {

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.data.imageLinks.thumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <select defaultValue={this.props.data.shelf} onChange={(e) => this.props.onUpdate(e, this.props.data.id)}>
              <option value="none" disabled>Move to...</option>
              {this.props.shelves.map((shelf, index) => (
                <option value={shelf} key={index}>{Util.humanize(shelf)}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.data.title}</div>
        <div className="book-authors">{this.props.data.authors.join(', ')}</div>
      </div>
    )
  }
}

export default Book