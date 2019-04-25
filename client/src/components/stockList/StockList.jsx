import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Spinner } from "reactstrap";
import { connect } from "react-redux";
import {
  getInfoStart,
  getStockList,
  buyingStock
} from "../../actions/stockActions";
import { getStockHistory } from "../../actions/chartActions";
import { getPaggedData } from "../../utils/getPaggedData";
import Pagination from "../common/pagination";
import AllStockTable from "../tables/allStockTable";
import SearchBox from "../common/searchBox";

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
    this.props.dispatch(getStockList());
    this.props.dispatch(getInfoStart());
  }

  refreshingToken = () => {
    this.props.refreshToken();
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleBuy = (amount, stockId) => {
    const data = {
      stockId,
      amount
    };
    this.props.dispatch(buyingStock(data));
  };

  handleChart = id => {
    this.props.dispatch(getStockHistory(id));
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

    const data = getPaggedData(
      stocks,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery
    );

    const spinner = (
      <Spinner
        className="spinner-center"
        type="grow"
        style={{ width: "5rem", height: "5rem" }}
        color="warning"
      />
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
            onBuy={this.handleBuy}
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
          <Link className="badge badge-info" to="/balance">
            Sell some!
          </Link>
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

export default connect(mapStateToProps)(StockList);
