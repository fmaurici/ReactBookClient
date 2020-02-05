import React, { Component } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store';
import * as BookStore from '../../store/book/Book';
import { Link } from 'react-router-dom';

export interface BookId {
    id: string
}

type BookProps = BookId &
    BookStore.BookState &
    typeof BookStore.actionCreators &
    RouteComponentProps<{}>;

export class Book extends Component<BookProps> {
    render() {
        return (
            <tr key={this.props.book.id}>
                <td>{this.props.book.name}</td>
                <td>{this.props.book.stock}</td>
                <td>{this.props.book.price}</td>
                <td>{this.props.book.author && this.props.book.author.name}</td>
                <td>
                    <Link to="/"><i className="btn btn-outline-info mx-1">Editar</i></Link>
                    <Link to="/"><i className="btn btn-outline-danger mx-1">Delete</i></Link>
                    <Link to="/"><i className="btn btn-outline-warning mx-1">Rent</i></Link>
                    <Link to="/"><i className="btn btn-outline-secondary mx-1">Return</i></Link>
                </td>
            </tr>
        )
    }
}

//Connect selects what properties will be passed to my BookProps (above)
//This method is a contraction of mapStateToProps and mapDispatchToProps 
//I pass the applicationState and its own props (in this case:BookId) and I add them to the BookProps (above)
export default connect(
    (state: ApplicationState, ownProps: BookId) => state.bookList.booksState.find(x => x.book.id === ownProps.id), // Select the book that I want to map
    BookStore.actionCreators // Selects which action creators are merged into the component's props
)(Book as any);