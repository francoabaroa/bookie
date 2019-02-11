import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';

import { AppConstants } from '../constants/constants';

import {
  deleteBookAction,
  editBookAction,
  fetchBooksAction,
  goHomeAction,
} from '../actions/actions';

import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const mapDispatchToProps = dispatch => ({
  deleteBookAction: (activeBookId, books) =>
    dispatch(deleteBookAction(activeBookId, books)),
  editBookAction: activeBook => dispatch(editBookAction(activeBook)),
  fetchBooksAction: () => dispatch(fetchBooksAction()),
  goHomeAction: () => dispatch(goHomeAction()),
});

class ShowBook extends Component {
  displayBooks(props) {
    const { books } = props;
    const { bookAlphabetizedMap } = books;
    const expansionPanels = [];

    for (var key in bookAlphabetizedMap) {
      let expansionPanelDetails = [];
      bookAlphabetizedMap[key].forEach(book => {
        expansionPanelDetails.push(
          <ExpansionPanelDetails>
            <Typography>{book.title}</Typography>
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
    const { books } = this.props;
    const { activeBook } = books;
    const { title, isbn, notes } = activeBook;
    const textFieldInputProps = { readOnly: true };
    return (
      <div className="App">
        <h1 className="App-title">{AppConstants.VIEW_A_BOOK}</h1>
        <TextField
          id="outlined-read-only-input"
          label={AppConstants.ISBN}
          defaultValue={isbn}
          margin={AppConstants.NORMAL}
          InputProps={textFieldInputProps}
          variant={AppConstants.OUTLINED}
        />
        <TextField
          id="outlined-read-only-input"
          label={AppConstants.TITLE}
          defaultValue={title}
          margin={AppConstants.NORMAL}
          InputProps={textFieldInputProps}
          variant={AppConstants.OUTLINED}
        />
        <TextField
          id="outlined-read-only-input"
          label={AppConstants.NOTES}
          defaultValue={notes}
          style={{ margin: 8, width: '70%' }}
          margin={AppConstants.NORMAL}
          fullWidth
          InputProps={textFieldInputProps}
          variant={AppConstants.OUTLINED}
        />
        <Button
          variant={AppConstants.CONTAINED}
          color={AppConstants.PRIMARY}
          onClick={this.props.goHomeAction}
        >
          {AppConstants.HOME}
        </Button>
        <Button
          variant={AppConstants.CONTAINED}
          onClick={this.props.editBookAction.bind(this, activeBook)}
        >
          {AppConstants.EDIT}
        </Button>
        <Button
          variant={AppConstants.CONTAINED}
          color={AppConstants.SECONDARY}
          onClick={this.props.deleteBookAction.bind(
            this,
            activeBook.id,
            books.books
          )}
        >
          {AppConstants.DELETE}
        </Button>
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
)(ShowBook);
