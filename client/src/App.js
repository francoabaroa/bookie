import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { fetchBooksAction } from './actions/actions';

import Button from '@material-ui/core/Button';

const mapDispatchToProps = dispatch => ({
  fetchBooksAction: () => dispatch(fetchBooksAction()),
});

class App extends Component {
  fetchBooksAction = event => {
    this.props.fetchBooksAction();
  };

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
        <button onClick={this.fetchBooksAction}>Fetch Books</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);