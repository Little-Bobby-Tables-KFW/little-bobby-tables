import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = {
  root: {
    marginTop: 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 300
  },
  background: {
    color: "black"
  }
};

class BookList extends React.Component {
  state = {
    data: [{ bookname: "Loading..", status: "Loading.." }],
    bookname: "",
    bookId: "",
    rentedBy: "",
    rentedDate: "",
    status: "",
    fields: [
      {
        bookname: "bookname",
        displayName: "Buch",
        inputFilterable: true,
        sortable: true
      },
      {
        status: "status",
        displayName: "Status",
        inputFilterable: true,
        exactFilterable: true,
        sortable: true
      }
    ]
  };

  getSorting(orderBy) {
    return (a, b) => (b[orderBy] < a[orderBy] ? 1 : -1);
  }

  componentDidMount() {
    // for now we load all the data, as the IDs might change with DB
    fetch("/api/books")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return [];
        }
      })
      .then(data => {
        console.log("Here goes the data:");
        console.log(data);

        this.setState({
          data: data
        });
      });
    console.log(this.state);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Titel</TableCell>
                <TableCell>Ausleihstatus</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.sort(this.getSorting("bookname")).map(d => {
                return (
                  <TableRow>
                    <TableCell>{d.bookname}</TableCell>
                    <TableCell>
                      {d.status === "rented" ? "Ausgeliehen" : "Verfügbar"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

BookList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BookList);
