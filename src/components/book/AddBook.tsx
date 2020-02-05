import React, { Component } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../../store';
import * as BookStore from '../../store/book/Book';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form'

export interface BookParameters {
    id: string,
    action: string,
    redirect: boolean
}

type BookProps = BookParameters &
    BookStore.BookState &
    typeof BookStore.actionCreators &
    RouteComponentProps<{}>;

export class AddBook extends Component<BookProps> {

    onSubmit = async (values: any) => {
        
        this.props.addBookAction(values);
    }

    onChange = (e: any, prevVal : any) => {
        console.log( [e.target.name], Number(e.target.value), prevVal)
        //[e.target.name] = e.target.value
    }

    render() {
        if (this.props.redirect) {
            this.props.history.push('/bookList');
        }

        return (
            <div className="row">
                <div className="col-md-6">
                    <Form
                        onSubmit={this.onSubmit}
                        
                        initialValues={{
                            name: this.props.book.name,
                            stock: this.props.book.stock,
                            price: this.props.book.price,
                        }}

                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="inputLabel">Name</label>
                                    <Field type="text" name="name" className="form-control" component="input" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="inputLabel">Stock</label>
                                        <Field type="number" name="stock" className="form-control" component="input" parse={value => value && Number(value)} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="inputLabel">Price</label>
                                        <Field type="number" name="price" className="form-control" component="input" parse={value => value && Number(value)} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <button type="submit" disabled={submitting || pristine} className="btn btn-dark addButton btn-block" value="Add New Book">Add New Book</button>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <Link to="/BookList" className="btn btn-secondary btn-block"><i className="fa fa-table"></i> Back to Book List</Link>
                                    </div>
                                </div>
                            </form>
                        )}
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState, ownProps: BookParameters) => state.book, // Select the book that I want to map
    BookStore.actionCreators // Selects which action creators are merged into the component's props
)(AddBook as any);