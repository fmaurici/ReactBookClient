import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import BookList from './components/book/BookList';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/bookList' component={BookList} />
    </Layout>
);
