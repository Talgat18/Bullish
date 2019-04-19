import React, { Component } from "react";
import AppNavbar from "../AppNavbar";
import NewsList from "../NewsList";

export default class News extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <NewsList />
      </div>
    );
  }
}
