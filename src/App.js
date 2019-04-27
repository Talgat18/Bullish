import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppNavbar from "./components/navbar/AppNavbar";
import Home from "./components/routes/Home";
import Stocks from "./components/routes/Stocks";
import Balance from "./components/routes/BalanceR";
import NotFound from "./components/routes/NotFound";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <AppNavbar />
          <Switch>
            <Route path="/stocks" component={Stocks} />
            <Route path="/home" component={Home} />
            <Route path="/balance" component={Balance} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
