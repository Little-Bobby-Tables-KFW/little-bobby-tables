import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/SubdirectoryArrowLeft";

import styles from "./Rent.module.css";
import RentDialog from "./RentDialog";

const Rent = ({
  bookname,
  openDialog,
  closeDialog,
  dialogOpen,
  dialogLoading,
  handleSubmit
}) => (
  <Card className={styles.card}>
    <CardHeader title={bookname} />
    <CardContent className={styles.content}>
      <Fab
        color="primary"
        aria-label="available"
        variant="extended"
        onClick={openDialog}
      >
        <CheckIcon className={styles.icon} />
        Entlehnen
      </Fab>
      <Typography className={styles.hint} variant="caption">
        Klicke auf den Button um das Buch zu entlehnen!
      </Typography>
    </CardContent>
    <RentDialog
      open={dialogOpen}
      dialogLoading={dialogLoading}
      handleClose={closeDialog}
      handleSubmit={handleSubmit}
    />
  </Card>
);

export default Rent;
