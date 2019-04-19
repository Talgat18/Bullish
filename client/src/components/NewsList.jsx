import React, { Component } from "react";
import {
  Container,
  Button,
  Media
} from "reactstrap";
import { connect } from "react-redux";
import { getNews } from "../actions/newsActions";
import { getInfo, getStockList } from "../actions/stockActions";
import { refreshToken } from "../actions/authActions";
import PropTypes from "prop-types";

class News extends Component {
  static propTypes = {
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
  { getInfo, refreshToken, getStockList, getNews }
)(News);
