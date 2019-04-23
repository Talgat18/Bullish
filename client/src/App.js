import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppNavbar from "./components/navbar/AppNavbar";
import Home from "./components/routes/Home";
import Buy from "./components/routes/Buy";
import Balance from "./components/routes/BalanceR";
import Test from "./components/routes/Test";
import NotFound from "./components/routes/NotFound";
import { getInfoStart } from "./actions/stockActions";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    store.dispatch(getInfoStart());
  }
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <AppNavbar />
          <Switch>
            <Route path="/stocks" component={Buy} />
            <Route path="/home" component={Home} />
            <Route path="/balance" component={Balance} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/test" component={Test} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
