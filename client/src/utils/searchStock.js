export function searchStock(items, searchQuery, type = "stocks") {
  let filtered = items;
  if (type === "history") {
    filtered = items.filter(m =>
      m.stock.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }
  if (type === "stocks") {
    filtered = items.filter(m =>
      m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }

  return filtered;
}
