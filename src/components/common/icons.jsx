import React from "react";
import { API_ROOT } from "../../constants/url";

const Icons = props => {
  return (
    <img
      width={props.width}
      height={props.height}
      alt="icn"
      src={API_ROOT + props.iconUrl}
    />
  );
};

export default Icons;
