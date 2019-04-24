export function searchStock(items, searchQuery) {
  let filtered = items;
  filtered = items.filter(m =>
    m.stock.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  return filtered;
}
