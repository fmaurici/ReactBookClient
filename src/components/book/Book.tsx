import React, { Component } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store';
import * as BookStore from '../../store/book/Book';
import { Link, withRouter } from 'react-router-dom';

export interface BookId {
    id: string,
    action: any
}

type BookProps = BookId &
    BookStore.BookState &
    typeof BookStore.actionCreators &
    RouteComponentProps<{}>;

export class Book extends Component<BookProps> {

    deleteBook = async (id : string) => {
        this.props.deleteBookAction(id, this.props.action);
        //this.props.action();
    }

    render() {
        return (
            <tr key={this.props.book.id}>
                <td>{this.props.book.name}</td>
                <td>{this.props.book.stock}</td>
                <td>{this.props.book.price}</td>
                <td>{this.props.book.author && this.props.book.author.name}</td>
                <td>
                    <Link to="/addBook"><i className="btn btn-outline-dark mx-1">History</i></Link>
                    <Link to="/addBook"><i className="btn btn-outline-info mx-1">Edit</i></Link>
                    <button onClick={()=> {this.deleteBook(this.props.id)}} className="btn btn-outline-danger mx-1">Delete</button>
                    <Link to="/rentBook"><i className="btn btn-outline-warning mx-1">Rent</i></Link>
                    <Link to="/returnBook"><i className="btn btn-outline-secondary mx-1">Return</i></Link>
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
)(withRouter(Book as any));