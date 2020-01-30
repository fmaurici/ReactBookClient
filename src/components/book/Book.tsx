import React, { Component } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store';
import * as BookListStore from '../../store/book/BookList';
import * as BookStore from '../../store/book/Book';

export interface BookId {
    id: string
}

type BookProps = BookId &
    BookListStore.BookState &
    typeof BookStore.actionCreators &
    RouteComponentProps<{}>;

export class Book extends Component<BookProps> {
    // constructor(props: IProps) {
    //     super(props);
    //     this.state = {
    //         book : this.props.book
    //     }
    // }

    render() {
        return (
            <tr key={this.props.id}>
                <td>{this.props.name}</td>
                <td>{this.props.stock}</td>
                <td>{this.props.price}</td>
            </tr>
        )
    }
}

//This method is a contraction of mapStateToProps and mapDispatchToProps 
//I pass the applicationState and its own props (in this case:BookId) and I add them to the BookProps (above)
export default connect(
    (state: ApplicationState, ownProps: BookId) => state.bookList.books.find(x=>x.id === ownProps.id), // Selects which state properties are merged into the component's props
    BookStore.actionCreators // Selects which action creators are merged into the component's props
)(Book as any);