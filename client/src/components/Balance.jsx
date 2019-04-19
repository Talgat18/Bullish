import React, { Component } from "react";
import _ from "lodash";

import PropTypes from "prop-types";
import { Container, Spinner } from "reactstrap";
import { connect } from "react-redux";

import { getInfo } from "../actions/stockActions";
import { refreshToken } from "../actions/authActions";
import { getHistory } from "../actions/historyActions";

import { paginate } from "../utils/paginate";

import Pagination from "./common/pagination";
import StockTable from "./tables/stockTable";
import HistoryTable from "./tables/historyTable";
import SearchBox from "./common/searchBox";

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
    pageSizeHistory: 3,
    currentPageHistory: 1,
    sortColumnHistory: {
      path: "transactionId",
      order: "asc"
    }
  };

  componentDidMount() {
    this.props.getInfo();
    this.props.getHistory();
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

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  getPaggedDataStocks = items => {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    let filtered = items;
    if (searchQuery)
      filtered = items.filter(m =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const data = paginate(sorted, currentPage, pageSize);

    return { data: data };
  };

  getPaggedDataHistory = items => {
    const {
      pageSizeHistory,
      currentPageHistory,
      sortColumnHistory
    } = this.state;

    let filtered = items;

    const sorted = _.orderBy(
      filtered,
      [sortColumnHistory.path],
      [sortColumnHistory.order]
    );

    const data = paginate(sorted, currentPageHistory, pageSizeHistory);

    return { history: data };
  };

  render() {
    const { balance, loading } = this.props.stock;
    const { items } = this.props.history;
    const { length: count } = this.props.stock.balance.stocks; // кол-во акций
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      pageSizeHistory,
      currentPageHistory,
      sortColumnHistory
    } = this.state;

    const historyItems = items[0] ? items[0].items : "";
    const countHistory = items[0] ? +items[0].items.length : "";

    const { data } = this.getPaggedDataStocks(balance.stocks);
    const {history} = this.getPaggedDataHistory(historyItems);

    const noAssets = (
      <div>
        <span className="navbar-text mr-3">
          <strong> {balance ? ` Your balance ${balance.balance}` : " "}</strong>
        </span>
        <span className="navbar-text mr-3">
          <strong>You have no stocks</strong>
        </span>
        <span className="navbar-text mr-3">
          <a href="/buy" className="badge badge-info">
            Buy some!
          </a>
        </span>
      </div>
    );

    const list = (
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
        />
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />{" "}
        <div>
          <strong className="navbar-text mt-5">{`История транзакций`}</strong>{" "}
        </div>
        <HistoryTable
          items={history}
          sortColumn={sortColumnHistory}
          onSort={this.handleSort}
        />
        <Pagination
          itemsCount={countHistory}
          pageSize={pageSizeHistory}
          currentPage={currentPageHistory}
          onPageChange={this.handlePageChangeHistory}
        />
      </div>
    );

    const loader = loading ? (
      <Spinner
        className="spinner-center"
        type="grow"
        style={{ width: "5rem", height: "5rem" }}
        color="warning"
      />
    ) : (
      noAssets
    );

    return (
      <Container style={{ color: "#2f3640" }}>
        <span>
          <strong> {balance.stocks.length === 0 ? loader : list}</strong>
        </span>
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
  { getInfo, refreshToken, getHistory }
)(Balance);
