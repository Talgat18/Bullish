import React, { Component } from "react";
import InitTable from "./commonTable/table";
import Sell from "./modals/sellModal";
import PriceDelta from "../common/priceDelta";

class StockTable extends Component {
  columns = [
    { path: "id", label: "Id" },
    { path: "name", label: "Name" },
    { path: "code", label: "Code" },
    { path: "price", label: "Price" },
    { path: "count", label: "Count" },
    {
      label: "PriceDelta",
      key: "prize",
      content: stock => <PriceDelta priceDelta={stock.priceDelta} />
    },
    {
      key: "sellModal",
      content: stock => (
        <Sell stockId={stock.id} price={stock.price} count={stock.count} />
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
