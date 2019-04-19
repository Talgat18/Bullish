import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import { Table } from "reactstrap";

const InitTable = ({ columns, sortColumn, onSort, data }) => {
  return (
    <Table
      hover
      bordered
      className="stock-list"
      style={{ background: "#f5f6fa" }}
    >
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </Table>
  );
};

export default InitTable;
