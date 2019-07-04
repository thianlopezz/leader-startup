import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import HelloWorld from "./pages/helloWorld";
import HazTuPreguntaPage from "./pages/HazTuPreguntaPage";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import "./styles/index.scss";
import Footer from "./components/Footer";
import PreguntasPage from "./pages/PreguntasPage";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#3456A5" } // Purple and green play nicely together.
    // secondary: { main: "#11cb5f" } // This is just green.A700 as hex.
  }
});

class App extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="app">
          <Switch>
            <Route exact path="/" component={HazTuPreguntaPage} />
            <Route
              exact
              path="/nobody-should-know-this-url"
              component={PreguntasPage}
            />
            <Route
              component={() => {
                return <h1>404 NOT FOUND</h1>;
              }}
            />
          </Switch>
        </div>
        <Footer />
      </ThemeProvider>
    );
  }
}

export default withRouter(props => <App {...props} />);
