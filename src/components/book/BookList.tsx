import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store';
import * as BookListStore from '../../store/book/BookList';
import * as BookStore from '../../store/book/Book';
import Book from './Book';

type BookListProps =
    BookListStore.BookListState &
    typeof BookListStore.actionCreators &
    RouteComponentProps<{}>;

class BookList extends Component<BookListProps> {

    async componentDidMount() {
        var search = true;
        this.props.getAllBooksAction(search);
    }

    // public componentDidUpdate() {
    //     console.log("update called")
    //     this.props.getAllBooksAction(true);
    // }

    render() {
        return (
            <div>
                <React.Fragment>
                    <h1 id="tabelLabel">Book List</h1>
                    {this.renderBooksTable()}
                </React.Fragment>

            </div>
        )
    }

    private renderBooksTable() {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.books.map((book: BookStore.BookState) => <Book id={book.id} key={book.id} />)}
                </tbody>
            </table>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.bookList, // Selects which state properties are merged into the component's props
    BookListStore.actionCreators // Selects which action creators are merged into the component's props
)(BookList as any);
