# Bookie

Build a single-page web application with a React/Redux front-end that
communicates with a Ruby/Rails back-end backed by postgres to manage
a book collection.

Create a private github repo and add cclifford3 & sufyanadam as
collaborators. Please keep all commit history and don't squash
any commits. If there is a commit you would typically squash out,
just mention it in the commit message:
'I would generally squash a commit like this'
But otherwise keep your git history and for more meaningful
commits a good commit message.

Deploy a working version of your application wherever you like
and share a link with us so we can see it running.

## Scope

The root page should be the book collection index page with links to
add a book, show a book, update a book and delete a book.

### Index page

When the title of a book is clicked, the app should navigate to
the show page for the book.

When the 'Add' link for a book is clicked, the app should navigate to
the 'Add a book' page.

When the 'Edit' link for a book is clicked, the app should navigate to
a page with a form that allows editing of all fields. The same
validations as create should apply here as well.

When the 'Delete' link for a book is clicked, a success message
should be displayed after a successful response from the server
for a few seconds.

### Add a book page

Allow user to create a book with at least the following 3 fields:

- *ISBN
- *Title
- Notes

Required fields are marked with '*'.
You may add more input fields if you wish.

After filling in all fields, clicking a submit button should create
the book in the collection and redirect back to the index page, with
the newly added book in the list.

The API request to the backend should not fire if any required fields
are not filled in. An appropriate error message should be displayed
if the user tries to submit with a missing field (do not use html5
required field validation, write your own).

A cancel button should allow the user to go back to the index
page.

### Show page

Display all the book information.

Add links to navigate back to the index page, and to edit or delete
the book.

When edit button is clicked, navigate to the edit page with the book
data pre-populated in the form.

When delete button is clicked, delete the book from the API and
navigate back to the index page on successful response, the
deleted book should no longer appear in the index page. On failed
API response, display an error message that disappears after a few
seconds with the API error.

### Edit page

Display all book information in pre-populated editable input fields.

Changing a field and clicking the submit button should send an API
request to the back end and redirect back to the index page on
successful request. An API request should not be made if there are
no changes or any required fields are missing. Display an appropriate
error message in either case after the submit button is clicked.

