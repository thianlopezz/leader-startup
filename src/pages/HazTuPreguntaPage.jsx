import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grow from "@material-ui/core/Grow";
import Grid from "@material-ui/core/Grid";
import SendIcon from "@material-ui/icons/Send";
import CircularProgress from "@material-ui/core/CircularProgress";
import SimpleSnackbar from "../components/SimpleSnackbar";
import logo from '../assets/images/startup-logo.svg';

const styles = theme => {
  return {
    input: {
      color: "#FFFFFF"
    },
    margin: {
      margin: theme.spacing(1)
    },
    extendedIcon: {
      marginLeft: theme.spacing(1)
    },
    progress: {
      margin: theme.spacing(2)
    }
  };
};

class HazTuPreguntaPage extends Component {
  state = {
    pregunta: {},
    checked: false,
    openSnackbar: false,
    snackbarMessage: ""
  };

  constructor(props) {
    super(props);

    this.onSuccess = this.onSuccess.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ checked: true });
    }, 500);
  }

  onSuccess() {
    this.setState({
      pregunta: { pregunta: "" },
      openSnackbar: true,
      snackbarMessage: "Pregunta enviada correctamente."
    });
  }

  savePregunta() {
    const { savePregunta } = this.props;
    const { pregunta } = this.state;

    if (!pregunta.pregunta || pregunta.pregunta.trim().length === 0) {
      this.setState({
        openSnackbar: true,
        snackbarMessage: "Escribe una pregunta."
      });

      return;
    }

    savePregunta(this.state.pregunta, this.onSuccess);
  }

  render() {
    const { pregunta, checked, openSnackbar, snackbarMessage } = this.state;
    const { loading, classes } = this.props;

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <section>
            <Grow
              in={checked}
              style={{ transformOrigin: "0 0 0" }}
              {...(checked ? { timeout: 800 } : {})}
            >
              <img
                src={logo}
                className="responsive"
              />
            </Grow>
            <Grow
              in={checked}
              style={{ transformOrigin: "0 0 0" }}
              {...(checked ? { timeout: 1000 } : {})}
            >
              <Typography
                variant="h2"
                component="h3"
                style={{ color: "#3456A5", textAlign: "center" }}
                gutterBottom
              >
                <strong>¡Haz tu pregunta!</strong>
              </Typography>
            </Grow>
            <Grow
              in={checked}
              style={{ transformOrigin: "0 0 0" }}
              {...(checked ? { timeout: 1500 } : {})}
            >
              <Card style={{ backgroundColor: "#23272A" }}>
                <Typography
                  variant="h4"
                  component="h5"
                  style={{ color: "#FFFFFF", margin: "15px" }}
                >
                  ¿Qué pregunta quieres hacer?
                </Typography>
                <CardContent>
                  <TextField
                    id="pregunta"
                    margin="dense"
                    placeholder="Escribe tu pregunta"
                    multiline
                    rows="4"
                    rowsMax="6"
                    fullWidth
                    color="primary"
                    value={pregunta.pregunta}
                    onChange={e =>
                      this.setState({
                        pregunta: { pregunta: e.target.value }
                      })
                    }
                    InputProps={{
                      className: classes.input
                    }}
                  />
                  {loading ? (
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <CircularProgress className={classes.progress} />
                    </div>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      aria-label="Add"
                      fullWidth
                      onClick={this.savePregunta.bind(this)}
                    >
                      Enviar
                      <SendIcon className={classes.extendedIcon} />
                    </Button>
                  )}
                </CardContent>
                {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
              </Card>
            </Grow>
          </section>
        </Grid>
        <SimpleSnackbar
          open={openSnackbar}
          onClose={() => this.setState({ openSnackbar: false })}
          message={snackbarMessage}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  let { loading } = state.preguntaState;
  return { loading };
};

const mapDispatchToProps = dispatch => {
  return {
    savePregunta: (pregunta, success) =>
      dispatch({ type: "PREGUNTA_SAVE", pregunta, success })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(HazTuPreguntaPage));
