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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

  checkbox = (checkedBook, isChecked) => {
    if (isChecked) {
      this.props.selectBookCheckboxAction(checkedBook);
    } else {
      this.props.unselectBookCheckboxAction();
    }
  };

  displayBooks(props) {
    const { books } = props;
    const { bookAlphabetizedMap, activeBook } = books;
    const expansionPanels = [];

    for (var key in bookAlphabetizedMap) {
      let expansionPanelDetails = [];
      bookAlphabetizedMap[key].forEach(book => {
        expansionPanelDetails.push(
          <ExpansionPanelDetails>
            <Checkbox
              checked={activeBook.isbn === book.isbn}
              onChange={event => {
                const { checked } = event.target;
                this.checkbox.call(this, book, checked);
              }}
              value={book.isbn}
            />
            <Typography
              style={{ fontWeight: 'bold' }}
              onClick={this.props.showBookAction.bind(this, book)}
            >
              {book.title}
            </Typography>
          </ExpansionPanelDetails>
        );
      });

      expansionPanels.push(
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontWeight: 'bold' }}>{key}</Typography>
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
