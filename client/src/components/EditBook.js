import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';

import stringHash from 'string-hash';

import {
  fetchBooksAction,
  goHomeAction,
  updateBookAction,
} from '../actions/actions';

import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';

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
  goHomeAction: () => dispatch(goHomeAction()),
  updateBookAction: (activeBook, books) =>
    dispatch(updateBookAction(activeBook, books)),
});

class EditBook extends Component {
  constructor(props) {
    const { activeBook } = props.books;
    const { title, isbn, notes } = activeBook;
    const concatenatedFields = title + isbn + notes;
    const concatenatedFieldsHash = stringHash(concatenatedFields);
    super(props);
    this.state = {
      dialogOpen: false,
      concatenatedFieldsHash: concatenatedFieldsHash,
      isbn: isbn,
      title: title,
      notes: notes,
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  saveBookOnSubmit = () => {
    const { title, isbn, notes } = this.state;
    const concatenatedFields = title + isbn + notes;
    const concatenatedFieldsHash = stringHash(concatenatedFields);

    // If no changes made, do not submit.
    if (concatenatedFieldsHash === this.state.concatenatedFieldsHash) {
      return;
    }

    if (
      isbn.length === 0 ||
      isbn === null ||
      isbn === undefined ||
      title.length === 0 ||
      title === null ||
      title === undefined
    ) {
      this.setState({ dialogOpen: true });
    } else {
      this.props.updateBookAction(
        { ...this.props.books.activeBook, isbn, title, notes },
        this.props.books.books
      );
    }
  };

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

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
    let missingRequiredFieldsCounter = 0;
    const missingFields = [];
    let missingFieldsMsg = '';

    if (
      this.state.isbn.length === 0 ||
      this.state.isbn === null ||
      this.state.isbn === undefined
    ) {
      missingRequiredFieldsCounter++;
      missingFields.push('isbn');
    }

    if (
      this.state.title.length === 0 ||
      this.state.title === null ||
      this.state.title === undefined
    ) {
      if (missingRequiredFieldsCounter === 1) {
        missingFields.push('and');
      }
      missingRequiredFieldsCounter++;
      missingFields.push('title');
    }

    missingFieldsMsg = 'You forgot to add ' + missingFields.join(' ') + '!';

    return (
      <div className="App">
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Pst! You're missing some required stuff."}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {missingFieldsMsg}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <h1 className="App-title">Edit a book</h1>
        <TextField
          id="outlined-name"
          label="ISBN *"
          value={this.state.isbn}
          placeholder="Enter ISBN here"
          onChange={this.handleChange('isbn')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Title *"
          value={this.state.title}
          placeholder="Enter title here"
          onChange={this.handleChange('title')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Notes"
          value={this.state.notes}
          style={{ margin: 8, width: '70%' }}
          placeholder="Enter notes here"
          onChange={this.handleChange('notes')}
          margin="normal"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.saveBookOnSubmit}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.props.goHomeAction}
        >
          Cancel
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
)(EditBook);
