import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import {
  deleteBookAction,
  fetchBooksAction,
  showBookAction,
  editBookAction,
  addBookAction,
  selectBookCheckboxAction,
  unselectBookCheckboxAction,
  addBookPageAction,
} from './actions/actions';

import { PageEnum } from './enums/enums';

import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: 26,
  },
});

const mapDispatchToProps = dispatch => ({
  fetchBooksAction: () => dispatch(fetchBooksAction()),
  editBookAction: activeBook => dispatch(editBookAction(activeBook)),
  deleteBookAction: (activeBookId, books) =>
    dispatch(deleteBookAction(activeBookId, books)),
  showBookAction: activeBook => dispatch(showBookAction(activeBook)),
  addBookAction: () => dispatch(addBookAction()),
  selectBookCheckboxAction: activeBook =>
    dispatch(selectBookCheckboxAction(activeBook)),
  unselectBookCheckboxAction: () => dispatch(unselectBookCheckboxAction()),
  addBookPageAction: () => dispatch(addBookPageAction()),
});

class App extends Component {
  componentWillMount() {
    this.props.fetchBooksAction();
  }

  displayBooks(props) {
    const { books } = props;
    const { bookAlphabetizedMap } = books;
    const expansionPanels = [];

    for (var key in bookAlphabetizedMap) {
      let expansionPanelDetails = [];
      bookAlphabetizedMap[key].forEach(z => {
        expansionPanelDetails.push(
          <ExpansionPanelDetails>
            <Typography>{z.title}</Typography>
          </ExpansionPanelDetails>
        );
      });

      expansionPanels.push(
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{key}</Typography>
          </ExpansionPanelSummary>
          {expansionPanelDetails}
        </ExpansionPanel>
      );
    }

    return (
      <div style={{ width: '50%', paddingLeft: '340px', paddingTop: '20px' }}>
        {expansionPanels}
      </div>
    );
  }

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
        {this.displayBooks(this.props)}
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
