import React, { Component } from "react";
import AtomSpinner from "./spinner/atom-spinner";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import { getNews } from "../actions/newsActions";
import { refreshToken } from "../actions/authActions";
import {
  getInfo,
  getStockList,
  getStockHistory,
  buyingStock,
  sellingStock
} from "../actions/stockActions";
import { getPaggedData } from "../utils/getPaggedData";
import Pagination from "./common/pagination";
import AllStockTable from "./tables/allStockTable";
import SearchBox from "./common/searchBox";

class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      pageSize: 5,
      currentPage: 1,
      searchQuery: "",
      sortColumn: {
        path: "id",
        order: "asc"
      },
      stockz: this.props.stock.stockz
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentWillMount() {
    this.props.getStockList();
    this.props.getInfo();
  }

  refreshingToken = () => {
    this.props.refreshToken();
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleChart = id => {
    this.props.getStockHistory(id);
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { balance, loading, stocks } = this.props.stock;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { data } = getPaggedData(
      stocks,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery
    );

    const spinner = (
      <AtomSpinner className="spinner-center" color="#000000" size={50} />
    );

    const stock_list = (
      <div>
        <div>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <AllStockTable
            stocks={data}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onChart={this.handleChart}
          />

          <Pagination
            itemsCount={stocks.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
        <div />
      </div>
    );
    return (
      <Container className="stock-container" style={{ color: "black" }}>
        <span className="navbar-text mr-3">
          <strong> {balance ? `Ваш баланс: $${balance.balance}` : " "}</strong>
        </span>
        <span className="navbar-text mr-3">
          <a href="/balance" className="badge badge-info">
            Sell some!
          </a>
        </span>
        <div style={{ textAlign: "center" }}>
          {" "}
          {loading ? spinner : stock_list}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  stock: state.stock,
  isAuthenticated: state.auth.isAuthenticated,
  score: state.auth.score,
  ID: state.auth.user
});

export default connect(
  mapStateToProps,
  {
    getInfo,
    refreshToken,
    getStockList,
    getStockHistory,
    getNews,
    buyingStock,
    sellingStock
  }
)(StockList);
