import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import ReturnIcon from "@material-ui/icons/HowToVote";

import styles from "./Return.module.css";
import ReturnDialog from "./ReturnDialog";

const Return = ({
  bookname,
  rentedBy,
  rentedDate,
  dialogOpen,
  dialogLoading,
  closeDialog,
  openDialog,
  handleSubmit
}) => (
  <Card className={styles.card}>
    <CardHeader
      title={bookname}
      subheader={`Ausgeborgt von ${rentedBy} am ${rentedDate}`}
    />
    <CardContent className={styles.content}>
      <Fab
        color="secondary"
        aria-label="available"
        variant="extended"
        onClick={openDialog}
      >
        <ReturnIcon className={styles.icon} />
        Zurückgeben
      </Fab>
      <Typography className={styles.hint} variant="caption">
        Bist du der Entlehner und möchtest das Buch zurück geben? Klick auf den
        Button!
      </Typography>
    </CardContent>
    <ReturnDialog
      open={dialogOpen}
      dialogLoading={dialogLoading}
      handleClose={closeDialog}
      handleSubmit={handleSubmit}
      bookName={bookname}
    />
  </Card>
);

export default Return;
