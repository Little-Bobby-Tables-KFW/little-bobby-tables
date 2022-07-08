import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import styles from "./AddBookDialog.module.css";

const AddBookDialog = ({
  name,
  open = false,
  onNameChange = () => {},
  handleClose = () => {},
  handleSubmit = () => {}
}) => (
  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="title">Add a new book</DialogTitle>
    <DialogContent className={styles.content}>
      <DialogContentText>
        Please fill in the name of the book and click "add" to submit it to the
        DO-Bib
      </DialogContentText>
      <div className={styles.form}>
        <TextField
          id="name"
          label="Name"
          className={styles.field}
          value={name}
          margin="normal"
          onChange={onNameChange}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleSubmit} color="primary">
        Add
      </Button>
    </DialogActions>
  </Dialog>
);

export default AddBookDialog;
