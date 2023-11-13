import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

function MadeWithLove() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      style={{ textAlign: "center" }}
    >
      <Link target="_blank" color="inherit" href="https://ecudevs.thianlopezz.com/">
        <img
          src="https://ecudevs.thianlopezz.com/images/logo.svg"
          width="200px"
        />
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: "auto",
    backgroundColor: "#23272A",
    textAlign: "center"
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography
          variant="body1"
          style={{ color: "#FFFFFF", marginBottom: 10 }}
        >
          Built with 💙 by
        </Typography>
        <MadeWithLove />
      </Container>
    </footer>
  );
}
