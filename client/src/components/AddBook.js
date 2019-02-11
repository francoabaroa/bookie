import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';

import { AppConstants } from '../constants/constants';

import {
  addBookAction,
  fetchBooksAction,
  goHomeAction,
} from '../actions/actions';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const mapDispatchToProps = dispatch => ({
  addBookAction: (book, books) => dispatch(addBookAction(book, books)),
  fetchBooksAction: () => dispatch(fetchBooksAction()),
  goHomeAction: () => dispatch(goHomeAction()),
});

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      isbn: '',
      notes: '',
      title: '',
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleClose = () => {
    this.setState({ dialogOpen: false });
  };

  saveBookOnSubmit = () => {
    const { title, isbn, notes } = this.state;
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
      this.props.addBookAction({ isbn, title, notes }, this.props.books.books);
    }
  };

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
    let missingRequiredFieldsCounter = 0;
    let missingFieldsMsg = '';
    const missingFields = [];

    if (
      this.state.isbn.length === 0 ||
      this.state.isbn === null ||
      this.state.isbn === undefined
    ) {
      missingRequiredFieldsCounter++;
      missingFields.push(AppConstants.ISBN_LOWERCASE);
    }

    if (
      this.state.title.length === 0 ||
      this.state.title === null ||
      this.state.title === undefined
    ) {
      if (missingRequiredFieldsCounter === 1) {
        missingFields.push(AppConstants.AND);
      }
      missingRequiredFieldsCounter++;
      missingFields.push(AppConstants.TITLE_LOWERCASE);
    }
    missingFieldsMsg =
      AppConstants.YOU_FORGOT_TO +
      missingFields.join(' ') +
      AppConstants.EXCLAMATION_POINT;

    return (
      <div className="App">
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {AppConstants.REQUIRED_MSG_HEADER}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {missingFieldsMsg}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              color={AppConstants.PRIMARY}
              autoFocus
            >
              {AppConstants.CLOSE}
            </Button>
          </DialogActions>
        </Dialog>
        <h1 className="App-title">{AppConstants.ADD_A_BOOK}</h1>
        <TextField
          id="outlined-name"
          label={AppConstants.ISBN_REQUIRED}
          placeholder={AppConstants.ENTER_ISBN}
          value={this.state.isbn}
          onChange={this.handleChange(AppConstants.ISBN_LOWERCASE)}
          margin={AppConstants.NORMAL}
          variant={AppConstants.OUTLINED}
        />
        <TextField
          id="outlined-name"
          label={AppConstants.TITLE_REQUIRED}
          placeholder={AppConstants.ENTER_TITLE}
          value={this.state.title}
          onChange={this.handleChange(AppConstants.TITLE_LOWERCASE)}
          margin={AppConstants.NORMAL}
          variant={AppConstants.OUTLINED}
        />
        <TextField
          id="outlined-full-width"
          label={AppConstants.NOTES}
          style={{ margin: 8, width: '70%' }}
          placeholder={AppConstants.ENTER_NOTES}
          value={this.state.notes}
          onChange={this.handleChange(AppConstants.NOTES_LOWERCASE)}
          margin={AppConstants.NORMAL}
          variant={AppConstants.OUTLINED}
        />
        <Button
          variant={AppConstants.CONTAINED}
          color={AppConstants.PRIMARY}
          onClick={this.saveBookOnSubmit}
        >
          {AppConstants.SUBMIT}
        </Button>
        <Button
          variant={AppConstants.CONTAINED}
          color={AppConstants.SECONDARY}
          onClick={this.props.goHomeAction}
        >
          {AppConstants.CANCEL}
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
)(AddBook);
