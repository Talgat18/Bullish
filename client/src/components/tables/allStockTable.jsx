import React, { Component } from "react";
import InitTable from "./commonTable/table";
import Buy from "./modals/buyModal";
import PriceDelta from "../common/priceDelta";

class StockTable extends Component {
  columns = [
    { path: "id", label: "Id" },
    { path: "name", label: "Name" },
    { path: "code", label: "Code" },
    { path: "price", label: "Price" },
    { path: "count", label: "Count" },
    {
      path: "priceDelta",
      label: "PriceDelta",
      key: "prize",
      content: stock => <PriceDelta priceDelta={stock.priceDelta} />
    },
    {
      key: "buyModal",
      content: stock => <Buy onBuy={this.props.onBuy} stockId={stock.id} price={stock.price} />
    },
    {
      key: "chart",
      content: stock => (
        <button
          onClick={() => this.props.onChart(stock.id)}
          className="btn btn-info btn-sm"
        >
          График
        </button>
      )
    }
  ];

  render() {
    const { stocks, sortColumn, onSort } = this.props;

    return (
      <InitTable
        columns={this.columns}
        data={stocks}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default StockTable;
