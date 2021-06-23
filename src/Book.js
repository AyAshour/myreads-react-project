import React, { Component } from 'react';
import PropTypes from "prop-types";


export default class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: this.props.book,
            shelf: this.props.book.shelf
        };
    }

    handleChange = event => {

        const newBook = this.state.book;
        newBook.shelf = event.target.value;
        this.props.updateBook(this.state.book, event.target.value);
        console.log(`newBook.shelf`, newBook.shelf)
        this.setState({
            book: newBook,
            shelf: event.target.value
        })

    }
    checkThumbnail = () => {
        const image = this.props.book.imageLinks;
        return image === undefined ? "http://books.google.com/books/content?id=73kNFV4sDx8C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api"
            : image.smallThumbnail
    }

    render() {
        return (
            <div>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.checkThumbnail()})` }}></div>
                        <div className="book-shelf-changer">
                            <select
                                className='custom-select'
                                defaultValue={this.props.shelf}
                                onChange={this.handleChange}
                            >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">
                        {typeof (this.props.book.authors) !== 'undefined' ? this.props.book.authors.map((author, index) => (
                            <div key={index}>
                                {author}
                            </div>
                        )) : <div></div>}</div>
                </div>
            </div>
        )
    }
}
Book.PropType = {
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string.isRequired,
    bookImage: PropTypes.string.isRequired,
    updateBook: PropTypes.func.isRequired,
}









