import React from "react";

const PriceDelta = props => {
  let style = "#009432";
  if (props.priceDelta < 0) style = "#d63031";
  else style = "#009432";
  return <strong style={{ color: style }}>{props.priceDelta}</strong>;
};

export default PriceDelta;
