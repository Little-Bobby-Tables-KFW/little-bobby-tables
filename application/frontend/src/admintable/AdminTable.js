import React from "react";
import { Link } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/DeleteForever";

import styles from "./AdminTable.module.css";
import AddBookDialog from "./AddBookDialog";
import DeleteDialog from "./DeleteDialog";

class AdminTable extends React.Component {
  state = {
    books: [],
    dialogOpen: false,
    deleteDialogOpen: false,
    bookToDeleteName: "",
    bookToDeleteId: "",
    newBookName: ""
  };

  fetchData = () => {
    fetch("/api/books")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return [];
        }
      })
      .then(data => {
        this.setState({
          books: data.map(d => ({
            name: d.bookname,
            rentedBy: d.rentedBy ? d.rentedBy : "N/A",
            date: d.rentedDate ? d.rentedDate : "N/A",
            status: d.status ? d.status : "N/A",
            id: d._id,
            bookID: d.bookId
          }))
        });
      });
  };

  getNewBookID = () =>
    this.state.books.reduce((acc, next) => {
      const id = parseInt(next.bookID);
      return acc < id ? id : acc;
    }, 0) + 1;

  addBook = () => {
    fetch("/api/books", {
      method: "POST",
      body: JSON.stringify({
        bookname: this.state.newBookName,
        bookId: this.getNewBookID(),
        status: "available",
        rentedDate: "none",
        rentedBy: "none"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.ok) {
        this.closeDialog();
        this.fetchData();
      }
    });
  };

  deleteBook = id => {
    fetch(`/api/books/${id}`, {
      method: "DELETE"
    }).then(response => {
      if (response.ok) {
        this.fetchData();
        this.closeDeleteDialog();
      }
    });
  };

  openDeleteDialog = (id, name) => {
    this.setState({
      deleteDialogOpen: true,
      bookToDeleteId: id,
      bookToDeleteName: name
    });
  };

  closeDeleteDialog = () => {
    this.setState({
      deleteDialogOpen: false,
      bookToDeleteId: "",
      bookToDeleteName: ""
    });
  };

  openDialog = () => this.setState({ dialogOpen: true });
  closeDialog = () => this.setState({ dialogOpen: false });

  componentDidMount() {
    // for now we load all the data, as the IDs might change with DB
    this.fetchData();
  }

  render() {
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book #</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Rented By</TableCell>
              <TableCell align="right">Rented Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.books.map(b => (
              <TableRow key={b.id}>
                <TableCell>{b.bookID}</TableCell>
                <TableCell component="th" scope="row">
                  {b.name}
                </TableCell>
                <TableCell align="right">{b.rentedBy}</TableCell>
                <TableCell align="right">{b.date}</TableCell>
                <TableCell align="right">{b.status}</TableCell>
                <TableCell align="right">
                  <Link to={`/books/${b.id}`}>{b.id}</Link>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="Delete"
                    color="secondary"
                    onClick={() => this.openDeleteDialog(b.id, b.name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Fab
          color="primary"
          aria-label="Add"
          className={styles.fab}
          onClick={this.openDialog}
        >
          <AddIcon />
        </Fab>
        <DeleteDialog
          open={this.state.deleteDialogOpen}
          closeDialog={this.closeDeleteDialog}
          name={this.state.bookToDeleteName}
          id={this.state.bookToDeleteId}
          deleteBook={this.deleteBook}
        />
        <AddBookDialog
          open={this.state.dialogOpen}
          onNameChange={e => this.setState({ newBookName: e.target.value })}
          handleClose={this.closeDialog}
          handleSubmit={this.addBook}
        />
      </Paper>
    );
  }
}

export default AdminTable;
