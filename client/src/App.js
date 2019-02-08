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
    const { classes } = this.props;
    return (
      <div className="App">
        <Button variant="contained" color="primary" className={classes.button}>
          Add a book
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          Show a book
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          Update a book
        </Button>
        <Button variant="contained" color="secondary" className={classes.button}>
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
