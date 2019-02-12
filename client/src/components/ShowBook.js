// @flow
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
import TextField from '@material-ui/core/TextField';

const mapDispatchToProps = dispatch => ({
  deleteBookAction: (activeBookId, books) =>
    dispatch(deleteBookAction(activeBookId, books)),
  editBookAction: activeBook => dispatch(editBookAction(activeBook)),
  fetchBooksAction: () => dispatch(fetchBooksAction()),
  goHomeAction: () => dispatch(goHomeAction()),
});

type Props = {
  addBookAction: Function,
  addBookPageAction: Function,
  books: any,
  currentPageEnum: string,
  deleteBookAction: Function,
  editBookAction: Function,
  error: any,
  fetchBooksAction: Function,
  goHomeAction: Function,
  showBookAction: Function,
  selectCheckboxClicked: boolean,
  selectBookCheckboxAction: Function,
  unselectBookCheckboxAction: Function,
};

class ShowBook extends React.Component<Props, {}> {
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
          style={{ margin: 8 }}
          margin={AppConstants.NORMAL}
          InputProps={textFieldInputProps}
          variant={AppConstants.OUTLINED}
        />
        <TextField
          id="outlined-read-only-input"
          label={AppConstants.TITLE}
          style={{ margin: 8 }}
          defaultValue={title}
          margin={AppConstants.NORMAL}
          InputProps={textFieldInputProps}
          variant={AppConstants.OUTLINED}
        />
        <TextField
          id="outlined-read-only-input"
          label={AppConstants.NOTES}
          defaultValue={notes}
          style={{ margin: 8, maxWidth: '80%' }}
          margin={AppConstants.NORMAL}
          fullWidth
          InputProps={textFieldInputProps}
          variant={AppConstants.OUTLINED}
        />
        <div>
          <Button
            className="App-buttons"
            variant={AppConstants.CONTAINED}
            color={AppConstants.PRIMARY}
            onClick={this.props.goHomeAction}
          >
            {AppConstants.HOME}
          </Button>
          <Button
            className="App-buttons"
            variant={AppConstants.CONTAINED}
            onClick={this.props.editBookAction.bind(this, activeBook)}
          >
            {AppConstants.EDIT}
          </Button>
          <Button
            className="App-buttons"
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
