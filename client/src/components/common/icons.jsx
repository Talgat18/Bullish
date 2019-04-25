import React from "react";
import { URL } from "../../constants/url";

const Icons = props => {
  return <img width={props.width} height={props.height} alt="icn" src={URL + props.iconUrl} />;
};

export default Icons;
