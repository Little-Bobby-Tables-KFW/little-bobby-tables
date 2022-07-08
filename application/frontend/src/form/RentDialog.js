import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./RentDialog.module.css";

class AlertDialog extends React.Component {
  state = {
    name: ""
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="rent-dialog-title"
        aria-describedby="rent-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Buch ausleihen"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bitte gib uns deinen Namen auf welchen du das Buch ausleihen
            möchtest
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <TextField
            id="standard-name"
            label="Name"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Abbrechen
          </Button>
          <Button
            onClick={() => this.props.handleSubmit(this.state.name)}
            color="primary"
            variant="contained"
            autoFocus
            disabled={this.state.name === "" || this.props.dialogLoading}
          >
            Entlehnen
            {this.props.dialogLoading && (
              <CircularProgress size={24} className={styles.ok} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AlertDialog;
