import React, { Component } from "react";

import Pagination from "../common/pagination";
import AllStockTable from "../tables/allStockTable";
import SearchBox from "../common/searchBox";
import { getPaggedData } from "../../utils/getPaggedData";

class RenderStockList extends Component {
  renderStockList() {
    const { stocks } = this.props.stock;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const data = getPaggedData(
      stocks,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery
    );
    return (
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
    );
  }
}

export default RenderStockList;
