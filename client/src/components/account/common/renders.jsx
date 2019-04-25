import React, { Component } from "react";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";

import { getPaggedData } from "../../../utils/getPaggedData";

import Pagination from "../../common/pagination";
import StockTable from "../../tables/stockTable";
import HistoryTable from "../../tables/historyTable";
import SearchBox from "../../common/searchBox";

class Renders extends Component {
  renderLoader() {
    return (
      <Spinner
        className="spinner-center"
        type="grow"
        style={{ width: "5rem", height: "5rem" }}
        color="warning"
      />
    );
  }

  renderNoStocks() {
    return (
      <div>
        <span className="navbar-text mr-3">You have no stocks!</span>
        <span className="navbar-text mr-3">
          <a href="/stocks" className="badge badge-info">
            Buy some!
          </a>
        </span>
      </div>
    );
  }

  renderHistoryTable() {
    const { items } = this.props.history;
    const {
      pageSizeHistory,
      currentPageHistory,
      sortColumnHistory,
      searchQueryHistory
    } = this.state;

    const historyItems = items;
    const countHistory = items ? items.length : "";

    const history = getPaggedData(
      historyItems,
      pageSizeHistory,
      currentPageHistory,
      sortColumnHistory,
      searchQueryHistory
    );
    return (
      <div>
        <strong className="navbar-text mt-5">История транзакций</strong>{" "}
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
  }

  renderMyStocksTable() {
    const { length: count } = this.props.stock.balance.stocks;
    const { balance } = this.props.stock;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const data = getPaggedData(
      this.state.myStocks,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery
    );
    return (
      <div className="row">
        <span className="navbar-text mr-3">
          {balance ? ` Ваш баланс:  $${balance.balance}` : " "}
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
  }
}

export default Renders;
