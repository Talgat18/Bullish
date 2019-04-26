export function sortStockHistory(data) {
  const price = data.history.map(obj => obj.price);
  const date = data.history.map(obj => obj.date.slice(0, 2));
  return {
    price,
    date
  };
}
