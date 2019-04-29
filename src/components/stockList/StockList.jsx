import React from "react";
import { Link } from "react-router-dom";
import { Container, Spinner, Alert } from "reactstrap";
import { connect } from "react-redux";
import {
  getInfoStart,
  getStockList,
  buyingStock
} from "../../actions/stockActions";
import { addChart } from "../../actions/widgetActions";
import RenderStockList from "./renderStockList";

class StockList extends RenderStockList {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      alert: false,
      alertType: "success",
      alertText: "Success!",
      pageSize: 5,
      currentPage: 1,
      searchQuery: "",
      sortColumn: {
        path: "name",
        order: "asc"
      }
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
    this.setState({ balance: this.props.stock.balance.balance });
  }

  refreshingToken = () => {
    this.props.refreshToken();
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleBuy = (amount, stockId, price) => {
    const { balance } = this.props.stock;
    const data = {
      stockId,
      amount
    };
    if (balance.balance - price * amount > 0) {
      balance.balance = balance.balance - price * amount;
      this.setState({
        balance: balance.balance,
        alert: true,
        alertType: "success",
        alertText: "Success!"
      });
      this.props.dispatch(buyingStock(data));
    } else {
      this.setState({
        alertType: "danger",
        alert: true,
        alertText: "Недостаточно средств!"
      });
    }
  };

  handleChart = id => {
    const list = this.props.widget.chartList;
    list.push(id);
    this.props.dispatch(addChart(list));
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

  renderAlert = () => {
    const { alertType, alertText } = this.state;
    return (
      <Alert onClick={this.handleAlert} color={alertType}>
        {alertText}
      </Alert>
    );
  };

  handleAlert = () => {
    this.setState({ alert: false });
  };

  render() {
    const { balance, loading } = this.props.stock;
    const { alert } = this.state;
    return (
      <Container className="stock-container" style={{ color: "black" }}>
        <strong className="navbar-text mr-3">
          {balance ? `Ваш баланс: $${balance.balance}` : " "}
        </strong>
        <Link className="badge badge-info" to="/balance">
          Sell some!
        </Link>
        {alert ? this.renderAlert() : null}
        <div style={{ textAlign: "center" }}>
          {loading ? this.renderSpinner() : this.renderStockList()}
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  stock: state.stock,
  isAuthenticated: state.auth.isAuthenticated,
  widget: state.widget
});

export default connect(mapStateToProps)(StockList);
