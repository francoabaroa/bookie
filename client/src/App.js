import React, { Component } from 'react';
import logo from './logo.svg';
import PropTypes from 'prop-types';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/add" component={Add} />
      <Route path="/show" component={Show} />
      <Route path="/update" component={Update} />
      <Route path="/delete" component={Delete} />
    </div>
  </Router>
);

const Home = () => (
  <div className="App">
    <Button variant="contained" color="primary">
      <Link to="/add">Add a book</Link>
    </Button>
    <Button variant="contained" color="primary">
      <Link to="/show">Show a book</Link>
    </Button>
    <Button variant="contained" color="primary">
      <Link to="/update">Update a book</Link>
    </Button>
    <Button variant="contained" color="primary">
      <Link to="/delete">Delete a book</Link>
    </Button>
  </div>
);

const Add = ({ match }) => (
  <div>
    <h2>Add</h2>
  </div>
);

const Show = ({ match }) => (
  <div>
    <h2>Show</h2>
  </div>
);

const Update = ({ match }) => (
  <div>
    <h2>Update</h2>
  </div>
);

const Delete = ({ match }) => (
  <div>
    <h2>Delete</h2>
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);