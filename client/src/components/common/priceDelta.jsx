import React from "react";

const PriceDelta = props => {
  // let style = "#009432";
  // if (props.priceDelta < 0) style = "red";
  // else style = "#009432";

  return <strong style={{ color: "#009432" }}>{props.priceDelta}</strong>;
};

export default PriceDelta;
