import React from "react";

import logo from "./logo.png";
import styles from "./Form.module.css";

import Rent from "./Rent";
import Return from "./Return";

class Form extends React.Component {
  state = {
    loading: true,
    bookname: "",
    bookId: "",
    rentedBy: "",
    rentedDate: "",
    status: "",
    dialogOpen: false,
    dialogLoading: false
  };
  getBook = () => {
    const bookID = this.props.match.params.bookID;
    fetch("/api/books/" + bookID)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return [];
        }
      })
      .then(data => {
        this.setState({
          bookname: data.bookname,
          bookId: data.bookId,
          rentedBy: data.rentedBy,
          rentedDate: data.rentedDate,
          status: data.status
        });
      });
  };

  rentBook = name => {
    const bookID = this.props.match.params.bookID;
    const currentDate = new Date();

    this.setState({
      dialogLoading: true
    });

    setTimeout(() => {
      fetch("/api/books/" + bookID, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "rented",
          rentedDate: currentDate.toLocaleDateString("de-DE"),
          rentedBy: name
        })
      })
        .then(response => {
          if (response.ok) {
            this.getBook();

            this.setState({
              dialogLoading: false,
              dialogOpen: false
            });
          } else {
            this.setState({
              dialogLoading: false
            });
          }
        })
        .catch(() => this.setState({ dialogLoading: false }));
    }, 5000);
  };

  returnBook = () => {
    const bookID = this.props.match.params.bookID;

    this.setState({
      dialogLoading: true
    });

    setTimeout(() => {
      fetch("/api/books/" + bookID, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: "available",
          rentedDate: "none",
          rentedBy: "none"
        })
      })
        .then(response => {
          if (response.ok) {
            this.getBook();

            this.setState({
              dialogLoading: false,
              dialogOpen: false
            });
          } else {
            this.setState({
              dialogLoading: false
            });
          }
        })
        .catch(() => this.setState({ dialogLoading: false }));
    }, 5000);
  };

  openDialog = () => {
    this.setState({ dialogOpen: true });
  };

  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  componentDidMount() {
    this.getBook();
  }

  render() {
    return (
      <div className={styles.container}>
        <img src={logo} className={styles.media} alt="DO Buchausleihe" />
        {this.state.status === "rented" ? (
          <Return
            bookname={this.state.bookname}
            rentedBy={this.state.rentedBy}
            rentedDate={this.state.rentedDate}
            dialogOpen={this.state.dialogOpen}
            dialogLoading={this.state.dialogLoading}
            openDialog={this.openDialog}
            closeDialog={this.closeDialog}
            handleSubmit={this.returnBook}
          />
        ) : (
          <Rent
            bookname={this.state.bookname}
            dialogOpen={this.state.dialogOpen}
            dialogLoading={this.state.dialogLoading}
            openDialog={this.openDialog}
            closeDialog={this.closeDialog}
            handleSubmit={this.rentBook}
          />
        )}
      </div>
    );
  }
}

export default Form;
