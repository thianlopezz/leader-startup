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
import SendIcon from "@material-ui/icons/Send";
import CircularProgress from "@material-ui/core/CircularProgress";
import SimpleSnackbar from "../components/SimpleSnackbar";

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
    savePregunta(this.state.pregunta, this.onSuccess);
  }

  render() {
    const {
      loading,
      pregunta,
      checked,
      openSnackbar,
      snackbarMessage
    } = this.state;
    const { classes } = this.props;

    return (
      <section
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <Container fixed>
          <Grow
            in={checked}
            style={{ transformOrigin: "0 0 0" }}
            {...(checked ? { timeout: 800 } : {})}
          >
            <img src="/assets/images/startup-logo.svg" className="responsive" />
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: "0 0 0" }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            <Typography
              variant="h1"
              component="h2"
              style={{ color: "#3456A5", textAlign: "center" }}
              gutterBottom
            >
              ¡Haz tu pregunta!
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
                  <CircularProgress className={classes.progress} />
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
        </Container>
        <SimpleSnackbar
          open={openSnackbar}
          onClose={() => this.setState({ openSnackbar: false })}
          message={snackbarMessage}
        />
      </section>
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
