export function sortStockHistory(data) {
  let price = data.history.map(obj => obj.price);
  let date = data.history.map(obj => obj.date.slice(0, 2));

  return {
    price,
    date
  };
}
