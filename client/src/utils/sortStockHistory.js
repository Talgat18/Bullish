export function sortStockHistory(stocks) {
  let price = [];
  let date = [];
  let data = stocks.history;

  data.map(obj => price.push(obj.price));
  data.map(obj => date.push(obj.date));

  stocks.price = price;
  date = date.map(item => item.slice(0, 2));
  stocks.date = date;
  return (data = {
    price: price,
    date: date
  });
}
