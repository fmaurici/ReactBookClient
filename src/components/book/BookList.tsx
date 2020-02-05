import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store';
import * as BookListStore from '../../store/book/BookList';
import * as BookStore from '../../store/book/Book';
import Book from './Book';
import "../../Site.css"
import { Link } from 'react-router-dom';

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
                    <h4 id="tabelLabel" className="titleColor">Book List</h4>
                    {this.renderBooksTable()}
                </React.Fragment>

            </div>
        )
    }

    private renderBooksTable() {
        return (
            <div>
                <table className="table table-dark table-hover darkBackground" aria-labelledby="tabelLabel">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.booksState.map((bookState: BookStore.BookState) => <Book id={bookState.book.id} key={bookState.book.id} />)}
                    </tbody>
                </table>

                <br></br>
                <Link to="/addBook"><i className=" btn btn-dark addButton">Add New Book</i></Link>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.bookList, // Selects which state properties are merged into the component's props
    BookListStore.actionCreators // Selects which action creators are merged into the component's props
)(BookList as any);
