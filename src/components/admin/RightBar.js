import React from "react";
import AddProduct from "./AddProduct";
import "./rightBar.css";

function RightBar({ page }) {
  return (
    <div className="rightbar-wrapper">
      {page === "addproduct" ? <AddProduct /> : null}
    </div>
  );
}

export default RightBar;
