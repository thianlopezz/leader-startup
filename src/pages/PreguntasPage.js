import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";

import { filtrarPreguntas, updateRespuesta } from "../actions/preguntaActions";

import {
  CardHeader,
  Switch,
  FormControlLabel,
  CardActions,
  InputBase,
  Paper,
  IconButton,
  TextField
} from "@material-ui/core";
import moment from "moment";
import ShowMoreText from "react-show-more-text";

const styles = theme => {
  return {
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400,
      backgroundColor: "#23272A",
      margin: theme.spacing(2)
    },
    input: {
      marginLeft: 8,
      flex: 1,
      color: "#FFFFFF"
    },
    iconButton: {
      padding: 10
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

class PreguntasPage extends Component {
  state = {};

  constructor(props) {
    super(props);

    // this.onSuccess = this.onSuccess.bind(this);
    this.filtrar = this.filtrar.bind(this);
    this.updateRespuesta = this.updateRespuesta.bind(this);
    this.updatePregunta = this.updatePregunta.bind(this);
  }

  componentDidMount() {
    this.props.listenForPreguntas();
  }

  filtrar(e) {
    const { preguntas, filtrar } = this.props;
    filtrar(e.target.value, preguntas);
  }

  updateRespuesta(index, respuesta) {
    debugger;
    const { updateRespuesta, preguntas } = this.props;
    updateRespuesta(index, respuesta, preguntas);
  }

  updatePregunta(pregunta) {
    const { updatePregunta } = this.props;
    updatePregunta(pregunta);
  }

  deletePregunta(_idPregunta) {
    const { deletePregunta } = this.props;
    deletePregunta(_idPregunta);
  }

  //   onSuccess() {
  //     this.setState({
  //       pregunta: { pregunta: "" },
  //       openSnackbar: true,
  //       snackbarMessage: "Pregunta enviada correctamente."
  //     });
  //   }

  render() {
    // const { preguntas } = this.state;
    const { loadingList, preguntasFiltradas: preguntas, classes } = this.props;

    return (
      <section>
        <Container fixed style={{ minHeight: "90vh" }}>
          <Typography
            style={{ marginBottom: "10" }}
            variant="h2"
            color="primary"
            component="h3"
          >
            Preguntas({preguntas.length})
          </Typography>
          <br />
          <Grid container spacing={3}>
            <Paper className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Buscar"
                inputProps={{ "aria-label": "Buscar pregunta" }}
                onChange={this.filtrar}
              />
              <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid container spacing={3}>
            {preguntas.map((pregunta, index) => (
              <Grid key={pregunta._id} item xs={12} xl={6}>
                <Card className={classes.card}>
                  <CardHeader
                    // avatar={
                    //   <Avatar
                    //     aria-label="Recipe"
                    //     className={classes.avatar}
                    //   >
                    //     R
                    //   </Avatar>
                    // }
                    action={
                      <IconButton
                        aria-label="Settings"
                        onClick={this.deletePregunta.bind(this, pregunta._id)}
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                    title={moment(pregunta.feCreacion).format("MMMM DD YYYY")}
                    subheader={moment(pregunta.feCreacion).format("hh:mm a")}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <ShowMoreText
                        lines={3}
                        more="Más"
                        less="Menos"
                        anchorClass=""
                      >
                        {pregunta.pregunta}
                      </ShowMoreText>
                    </Typography>
                    <TextField
                      id={pregunta._id}
                      margin="dense"
                      placeholder="Notas"
                      multiline
                      rows="1"
                      fullWidth
                      // color="primary"
                      value={pregunta.respuesta}
                      onChange={e =>
                        this.updateRespuesta(index, e.target.value)
                      }
                      // InputProps={{
                      //   className: classes.input
                      // }}
                    />
                  </CardContent>
                  <CardActions disableSpacing>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={pregunta.marcada}
                          onChange={() =>
                            this.updatePregunta({
                              ...pregunta,
                              marcada: !pregunta.marcada
                            })
                          }
                          value={pregunta.marcada}
                          color="primary"
                        />
                      }
                      label="Marcar"
                    />
                    <IconButton
                      key="guardar"
                      aria-label="Guardar"
                      color="primary"
                      className={classes.iconButton}
                      onClick={() => this.updatePregunta(pregunta)}
                    >
                      <SaveIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = state => {
  let { loadingList, preguntas, preguntasFiltradas } = state.preguntaState;
  return { loadingList, preguntas, preguntasFiltradas };
};

const mapDispatchToProps = dispatch => {
  return {
    listenForPreguntas: () => dispatch({ type: "PREGUNTAS_LISTEN" }),
    marcar: _id => dispatch({ type: "PREGUNTA_MARCAR", _id }),
    filtrar: (query, preguntas) => dispatch(filtrarPreguntas(query, preguntas)),
    updateRespuesta: (index, respuesta, preguntas) =>
      dispatch(updateRespuesta(index, respuesta, preguntas)),
    updatePregunta: pregunta => dispatch({ type: "PREGUNTA_UPDATE", pregunta }),
    deletePregunta: _idPregunta =>
      dispatch({ type: "PREGUNTA_DELETE", _idPregunta })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PreguntasPage));
