import React from "react";
import { Link } from "react-router-dom";
import { Container, Spinner } from "reactstrap";
import { connect } from "react-redux";
import {
  getInfoStart,
  getStockList,
  buyingStock
} from "../../actions/stockActions";
import { getStockHistory } from "../../actions/chartActions";

import RenderStockList from "./renderStockList";

class StockList extends RenderStockList {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      pageSize: 5,
      currentPage: 1,
      searchQuery: "",
      sortColumn: {
        path: "name",
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
    let range = "month";
    this.props.dispatch(getStockHistory(id, range));
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  renderSpinner() {
    return (
      <Spinner
        className="spinner-center"
        type="grow"
        style={{ width: "5rem", height: "5rem" }}
        color="warning"
      />
    );
  }

  render() {
    const { balance, loading } = this.props.stock;
    return (
      <Container className="stock-container" style={{ color: "black" }}>
        <strong className="navbar-text mr-3">
          {balance ? `Ваш баланс: $${balance.balance}` : " "}
        </strong>
        <Link className="badge badge-info" to="/balance">
          Sell some!
        </Link>
        <div style={{ textAlign: "center" }}>
          {loading ? this.renderSpinner() : this.renderStockList()}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  stock: state.stock,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(StockList);
