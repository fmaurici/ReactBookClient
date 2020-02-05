import React, { Component } from 'react'
import { Route } from 'react-router';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import BookList from './components/book/BookList';
import AddBook from './components/book/AddBook';

export class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path='/bookList' component={BookList} />
                    <Route path='/addBook' component={AddBook} />
                    {/* <Route path='/editBook' component={AddBook} /> */}
                </Layout>
            </div>
        )
    }
}

export default App


// export default () => (
//     <Layout>
//         <Route exact path='/' component={Home} />
//         <Route path='/bookList' component={BookList} />
//     </Layout>
// );
