import React from "react";

import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { connect } from "react-redux";

import { getInfoStart, sellingStock } from "../../actions/stockActions";
import { getTransHistory } from "../../actions/historyActions";
import Renders from "./common/renders";

class Balance extends Renders {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  state = {
    pageSize: 3,
    currentPage: 1,
    searchQuery: "",
    sortColumn: {
      path: "id",
      order: "asc"
    },
    pageSizeHistory: 2,
    currentPageHistory: 1,
    searchQueryHistory: "",
    sortColumnHistory: {
      path: "transactionId",
      order: "asc"
    },
    myStocks: []
  };

  componentWillMount() {
    this.props.dispatch(getInfoStart());
    this.props.dispatch(getTransHistory());
  }

  componentWillReceiveProps() {
    this.setState({ myStocks: this.props.stock.balance.stocks });
    this.setState({ count: this.props.stock.balance.stocks });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handlePageChangeHistory = page => {
    this.setState({ currentPageHistory: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSortHistory = sortColumnHistory => {
    this.setState({ sortColumnHistory });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSearchHistory = query => {
    this.setState({ searchQueryHistory: query, currentPageHistory: 1 });
  };

  handleUpdate = (amount, stockId) => {
    const myStocks = this.state.myStocks.filter(m => m.id !== stockId);
    this.setState({ myStocks });
  };

  handleSell = (amount, stockId) => {
    const data = {
      stockId,
      amount
    };
    this.props.dispatch(sellingStock(data));
  };

  render() {
    const { loading } = this.props.stock;
    const { length: count } = this.props.stock.balance.stocks;

    return (
      <Container style={{ color: "#2f3640" }}>
        {loading
          ? this.renderLoader()
          : count === 0
          ? this.renderNoStocks()
          : this.renderMyStocksTable()}
        {this.renderHistoryTable()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  stock: state.stock,
  history: state.history
});

export default connect(mapStateToProps)(Balance);
