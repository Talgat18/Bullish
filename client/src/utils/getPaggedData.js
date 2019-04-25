import { paginate } from "./paginate";
import { searchStock } from "./searchStock";

import _ from "lodash";

export function getPaggedData(
  items,
  pageSize,
  currentPage,
  sortColumn,
  searchQuery,
  type = 'stocks'
) {
  let filtered = items;

  if (searchQuery) filtered = searchStock(items, searchQuery, type);

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const data = paginate(sorted, currentPage, pageSize);
  console.log(data);
  return data;
}
