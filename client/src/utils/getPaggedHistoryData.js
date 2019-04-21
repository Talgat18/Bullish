import { paginate } from "./paginate";

import _ from "lodash";

export function getPaggedHistoryData(
  items,
  pageSize,
  currentPage,
  sortColumn,
  searchQuery
) {
  let filtered = items;
    if (searchQuery)
      filtered = items.filter(m =>
        m.stock.code.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    );

    const data = paginate(sorted, currentPage, pageSize);

    return { history: data };
}
