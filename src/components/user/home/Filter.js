import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./filter.css";

function Filter({ setMinPrice, setMaxPrice, minPrice, maxPrice }) {
  return (
    <div className="filter-wrapper">
      <p>Price</p>
      <div className="price-field">
        <TextField
          type="number"
          sx={{ margin: "0 5px" }}
          id="outlined-basic"
          label="Rs Min"
          variant="outlined"
          value={maxPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <TextField
          type="number"
          sx={{ margin: "0 5px" }}
          id="outlined-basic"
          label="Rs Max"
          variant="outlined"
          value={minPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <Button size="small" variant="outlined">
          Go
        </Button>
      </div>
    </div>
  );
}

export default Filter;
