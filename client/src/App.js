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

import AddBook from './components/AddBook';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditBook from './components/EditBook';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ShowBook from './components/ShowBook';
import Typography from '@material-ui/core/Typography';

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
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: true,
    };
  }

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
    const {
      activeBook,
      books,
      currentPageEnum,
      selectCheckboxClicked,
    } = this.props.books;
    const self = this;
    let currentPage = [];
    // TODO fix this.props.books naming convention
    // TODO: add view button, view is very hidden

    if (this.props.books.error && this.state.dialogOpen) {
      currentPage.push(
        <Dialog
          open={true}
          onClose={() => {}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Pst! There was an error trying to process your request.'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {'Error: ' + this.props.books.error.message.toString()}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      );
      setTimeout(() => {
        self.setState({
          dialogOpen: false,
        });
      }, 3500);
    }

    switch (currentPageEnum) {
      case PageEnum.ADD:
        currentPage.push(<AddBook />);
        break;

      case PageEnum.EDIT:
        currentPage.push(<EditBook />);
        break;

      case PageEnum.SHOW:
        currentPage.push(<ShowBook />);
        break;

      default:
        currentPage.push(
          <div key={0}>
            {' '}
            <h1 className="App-title">Bookie</h1>
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.addBookPageAction}
            >
              Add
            </Button>
            <Button
              variant="contained"
              disabled={!selectCheckboxClicked}
              onClick={this.props.showBookAction.bind(this, activeBook)}
            >
              View
            </Button>
            <Button
              variant="contained"
              disabled={!selectCheckboxClicked}
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
                books
              )}
              disabled={!selectCheckboxClicked}
            >
              Delete
            </Button>
            {this.displayBooks(this.props)}{' '}
          </div>
        );
        break;
    }

    return <div className="App">{currentPage}</div>;
  }
}

const mapStateToProps = state => ({
  ...state,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
