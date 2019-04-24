export function sortStockHistory(history) {
  const price = history.map(obj => obj.price);
  const date = history.map(obj => obj.date.slice(0, 2));
  return {
    price,
    date
  };
}
