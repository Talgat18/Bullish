import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Spinner,
  Media
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import { getNews } from "../actions/newsActions";
import { getInfo, getStockList } from "../actions/stockActions";
import { refreshToken } from "../actions/authActions";
import PropTypes from "prop-types";

class News extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    stock: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  state = {
    title: 0,
    content: 0
  };

  componentDidMount() {
    this.props.getInfo();
    this.props.getNews();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  test = () => {
    this.props.getStockList();
    this.props.getNews();
  };

  refreshingToken = () => {
    this.props.refreshToken();
  };

  render() {
    const spinner = (
      <Spinner
        className="spinner"
        style={{ width: "10rem", height: "10rem" }}
        color="warning"
      />
    );

    const { articles, randomIndex } = this.props.news;
   
      console.log(randomIndex)

    return (
      <Container className="stock-container" style={{ color: "black" }}>
        <Button onClick={this.test}>Get random news!</Button> {}
        <Media>
          <Media body>
            <Media heading>
              {articles[randomIndex] ? articles[randomIndex].title : ""}
            </Media>
            {articles[randomIndex] ? articles[randomIndex].content : ""}
          </Media>
        </Media>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  stock: state.stock,
  isAuthenticated: state.auth.isAuthenticated,
  score: state.auth.score,
  ID: state.auth.user,
  news: state.news
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, getInfo, refreshToken, getStockList, getNews }
)(News);
