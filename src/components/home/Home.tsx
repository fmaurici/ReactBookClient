import * as React from 'react';
import { connect } from 'react-redux';

const Home = () => (
  <div>
    <h1 className="titleColor">Welcome to the Book Store!</h1>
  </div>
);

export default connect()(Home);
