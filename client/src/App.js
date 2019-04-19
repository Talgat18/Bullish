import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/routes/Home";
import Buy from "./components/routes/Buy";
import News from "./components/routes/News";
import Balance from "./components/routes/BalanceR";
import NotFound from "./components/routes/NotFound";
//import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { checkToken } from "./actions/authActions";
import { getInfo } from "./actions/stockActions";
//loadUser,

import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  componentDidMount() {
    //store.dispatch(loadUser());
    store.dispatch(checkToken());
    store.dispatch(getInfo());
  }
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <div className="App">
            <Switch>
              <Route path="/stocks" component={Buy} />
              <Route path="/news" component={News} />
              <Route path="/home" component={Home} />
              <Route path="/balance" component={Balance} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/home" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
