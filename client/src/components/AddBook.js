import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';

import {
  addBookAction,
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
    const missingFields = [];
    let missingFieldsMsg = '';
    // TODO: better way of displaying error message

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
    // TODO: create string constants file
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
        <h1 className="App-title">Add a book</h1>
        <TextField
          id="outlined-name"
          label="ISBN *"
          placeholder="Enter ISBN here"
          value={this.state.isbn}
          onChange={this.handleChange('isbn')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Title *"
          placeholder="Enter title here"
          value={this.state.title}
          onChange={this.handleChange('title')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Notes"
          style={{ margin: 8, width: '70%' }}
          placeholder="Enter notes here"
          value={this.state.notes}
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
)(AddBook);
