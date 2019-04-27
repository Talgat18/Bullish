import React, { Component } from "react";
import InitTable from "./commonTable/table";

class HistoryTable extends Component {
  columns = [
    { path: "transactionId", label: "TransId" },
    { path: "stock.name", label: "Stock" },
    { path: "amount", label: "Amount" },
    { path: "totalPrice", label: "Price" },
    { path: "date", label: "Date" },
    { path: "type", label: "Type" },
  ];

  render() {
    const { items, sortColumn, onSort } = this.props;
    return (
      <InitTable
        columns={this.columns}
        data={items}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default HistoryTable;
