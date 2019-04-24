import { paginate } from "./paginate";
import { searchStock } from "./searchStock";

import _ from "lodash";

export function getPaggedData(
  items,
  pageSize,
  currentPage,
  sortColumn,
  searchQuery
) {
  let filtered = items;
  if (searchQuery) searchStock(filtered, searchQuery);

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const data = paginate(sorted, currentPage, pageSize);

  return data;
}
