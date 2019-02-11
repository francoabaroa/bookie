import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';

// TODO alpha and sort imports
import {
  fetchBooksAction,
  goHomeAction,
  editBookAction,
  deleteBookAction,
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
    // TODO: fix books.books naming scheme
    const { books } = this.props;
    const { activeBook } = books;
    const { title, isbn, notes } = activeBook;
    return (
      <div className="App">
        <h1 className="App-title">View a book</h1>
        <TextField
          id="outlined-read-only-input"
          label="ISBN"
          defaultValue={isbn}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-read-only-input"
          label="Title"
          defaultValue={title}
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-read-only-input"
          label="Notes"
          defaultValue={notes}
          style={{ margin: 8, width: '70%' }}
          margin="normal"
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={this.props.goHomeAction}
        >
          Home
        </Button>
        <Button
          variant="contained"
          onClick={this.props.editBookAction.bind(this, activeBook)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.props.deleteBookAction.bind(
            this,
            activeBook.id,
            books.books
          )}
        >
          Delete
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