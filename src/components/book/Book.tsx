import React, { Component } from 'react'
import {Book as BookState} from '../../store/book/BookList';

export interface BookProps {
    book: BookState
}

export class Book extends Component<BookProps> {
    // constructor(props: IProps) {
    //     super(props);
    //     this.state = {
    //         book : this.props.book
    //     }
    // }

    render() {
        return (
            <tr key={this.props.book.id}>
                <td>{this.props.book.name}</td>
                <td>{this.props.book.stock}</td>
                <td>{this.props.book.price}</td>
            </tr>
        )
    }
}

export default Book
