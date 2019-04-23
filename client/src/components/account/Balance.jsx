import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { Container, Spinner } from "reactstrap";
import { connect } from "react-redux";

import { getPaggedData } from "../../utils/getPaggedData";
import { getPaggedHistoryData } from "../../utils/getPaggedHistoryData";

import Pagination from "../common/pagination";
import StockTable from "../tables/stockTable";
import HistoryTable from "../tables/historyTable";
import SearchBox from "../common/searchBox";

import { getInfoStart, sellingStock } from "../../actions/stockActions";
import { getTransHistory } from "../../actions/historyActions";

class Balance extends Component {
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
    // доделать amount
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
    const { balance, loading } = this.props.stock;
    const { items } = this.props.history;
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
          <Link className="badge badge-info" to="/stocks">
            Buy some!
          </Link>
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
        {loading ? loader : count === 0 ? noStocks : myStockList}
        {historyList}
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