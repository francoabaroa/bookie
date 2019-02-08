import React, { Component } from 'react';
import logo from './logo.svg';
import PropTypes from 'prop-types';
import './App.css';

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

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-title">Bookie</h1>
        <Button variant="contained" color="primary">
          Add a book
        </Button>
        <Button variant="contained" color="primary">
          Show a book
        </Button>
        <Button variant="contained" color="primary">
          Update a book
        </Button>
        <Button variant="contained" color="primary">
          Delete a book
        </Button>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

