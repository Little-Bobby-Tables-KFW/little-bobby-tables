import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./RentDialog.module.css";

const ReturnDialog = ({
  open,
  dialogLoading,
  handleClose,
  handleSubmit,
  bookName
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="rent-dialog-title"
    aria-describedby="rent-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Buch ausleihen"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {`Möchtest du das Buch "${bookName}" zurückgeben?`}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Abbrechen
      </Button>
      <Button
        onClick={() => handleSubmit()}
        color="primary"
        variant="contained"
        autoFocus
        disabled={dialogLoading}
      >
        Zurückgeben
        {dialogLoading && <CircularProgress size={24} className={styles.ok} />}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ReturnDialog;
