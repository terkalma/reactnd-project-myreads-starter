import React, { Component } from 'react'

class Book extends Component {

    render() {
        return (
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.data.imageLinks.thumbnail}")` }}></div>
              <div className="book-shelf-changer">
                <select>
                  <option value="none" disabled>Move to...</option>
                  {this.props.shelves.map((shelf, index) => (
                    <option value="none" key={index} selected={shelf == this.props.data.shelf}>
                      {shelf}
                    </option>
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