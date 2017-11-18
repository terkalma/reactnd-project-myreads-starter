import React, { Component } from 'react'
import * as Util from './Util'
import PropTypes from 'prop-types';

class Book extends Component {

  static propType = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onUpdate: PropTypes.string.isRequired,
    authors: PropTypes.array,
    shelf: PropTypes.string,
    imageLinks: PropTypes.object,
    options: PropTypes.array,
  }

  static defaultProps = {
    shelf: 'none',
    options: [],
    authors: [],
    imageLinks: { thumbnail: 'alt.png' }
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.imageLinks.thumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <select defaultValue={this.props.shelf} onChange={(e) => this.props.onUpdate(e.target.value, this.props.id)}>
              <option value="none" disabled>Move to...</option>
              {this.props.options.map((shelf, index) => (
                <option value={shelf} key={index}>{Util.humanize(shelf)}</option>
              ))}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors.join(', ')}</div>
      </div>
    )
  }
}

export default Book