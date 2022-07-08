import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

const DeleteDialog = ({ open, closeDialog, name, id, deleteBook }) => (
  <Dialog
    open={open}
    onClose={closeDialog}
    aria-labelledby="delete-dialog-title"
    maxWidth="xs"
  >
    <DialogTitle id="delete-dialog-title">Delete Book</DialogTitle>
    <DialogContent>{`Do you really want to delete "${name}"`}</DialogContent>
    <DialogActions>
      <Button onClick={closeDialog} color="primary">
        Cancel
      </Button>
      <Button
        onClick={() => deleteBook(id)}
        color="secondary"
        variant="contained"
        autoFocus
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteDialog;
