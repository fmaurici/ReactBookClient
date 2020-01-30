import React, { Component } from 'react'
import { Route } from 'react-router';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import BookList from './components/book/BookList';

export class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path='/bookList' component={BookList} />
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
