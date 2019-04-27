import React from "react";
import { Input } from "reactstrap";

const SearchBox = ({ value, onChange }) => {
  return (
    <Input
      type="text"
      name="query"
      className="from-control"
      placeholder="Поиск акции..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
