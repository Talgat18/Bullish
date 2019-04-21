import React, { Component } from "react";

import PropTypes from "prop-types";
import { Container, Spinner } from "reactstrap";
import { connect } from "react-redux";

import { getInfo, sellingStock } from "../actions/stockActions";
import { refreshToken } from "../actions/authActions";
import { getHistory } from "../actions/historyActions";

import { getPaggedData } from "../utils/getPaggedData";
import { getPaggedHistoryData } from "../utils/getPaggedHistoryData";

import Pagination from "./common/pagination";
import StockTable from "./tables/stockTable";
import HistoryTable from "./tables/historyTable";
import SearchBox from "./common/searchBox";

class Balance extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };
  state = {
    pageSize: 4,
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
    myStocks: [],
    stockLength: this.props.stock.balance.stocks
  };

  componentWillMount() {
    this.props.getInfo();
    this.props.getHistory();
  }

  componentWillReceiveProps() {
    this.setState({ myStocks: this.props.stock.balance.stocks });
  }

  handleSell = (amount, stockId) => {
    const sell = {
      stockId,
      amount
    };
    this.props.sellingStock(sell);
  };

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

  handleUpdate = (amount, stockId) => { // доделать amount
    const myStocks = this.state.myStocks.filter(m => m.id !== stockId);
    this.setState({ myStocks });
  };

  render() {
    const { balance, loading } = this.props.stock;
    const { items } = this.props.history.items;
    const { length: count } = this.props.stock.balance.stocks;
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      pageSizeHistory,
      currentPageHistory,
      sortColumnHistory,
      searchQueryHistory
    } = this.state;

    const historyItems = items;
    const countHistory = items ? items.length : "";

    const { history } = getPaggedHistoryData(
      historyItems,
      pageSizeHistory,
      currentPageHistory,
      sortColumnHistory,
      searchQueryHistory
    );

    const { data } = getPaggedData(
      this.state.myStocks,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery
    );

    const myStockList = (
      <div className="row">
        <span className="navbar-text mr-3">
          {balance
            ? ` Ваш баланс:  $${balance.balance} / ₽${balance.balance * 65}`
            : " "}
        </span>{" "}
        <span className="navbar-text mr-3">
          <a href="/stocks" className="badge badge-info">
            Buy some!
          </a>
        </span>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <StockTable
          stocks={data}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onSell={this.handleSell}
          onUpdate={this.handleUpdate}
        />
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />{" "}
      </div>
    );

    const historyList = (
      <div>
        <strong className="navbar-text mt-5">{`История транзакций`}</strong>{" "}
        <SearchBox
          value={searchQueryHistory}
          onChange={this.handleSearchHistory}
        />
        <HistoryTable
          items={history}
          sortColumn={sortColumnHistory}
          onSort={this.handleSortHistory}
        />
        <Pagination
          itemsCount={countHistory}
          pageSize={pageSizeHistory}
          currentPage={currentPageHistory}
          onPageChange={this.handlePageChangeHistory}
        />
      </div>
    );

    const loader = (
      <Spinner
        className="spinner-center"
        type="grow"
        style={{ width: "5rem", height: "5rem" }}
        color="warning"
      />
    );

    const noStocks = (
      <div>
        <span className="navbar-text mr-3">You have no stocks!</span>
        <span className="navbar-text mr-3">
          <a href="/stocks" className="badge badge-info">
            Buy some!
          </a>
        </span>
      </div>
    );
    return (
      <Container style={{ color: "#2f3640" }}>
        {loading
          ? loader
          : balance.stocks.length === 0
          ? noStocks
          : myStockList}
        {historyList}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  ID: state.auth.user,
  stock: state.stock,
  history: state.history
});

export default connect(
  mapStateToProps,
  { getInfo, refreshToken, getHistory, sellingStock }
)(Balance);
