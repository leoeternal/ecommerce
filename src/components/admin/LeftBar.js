import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./leftBar.css";
import { useNavigate } from "react-router-dom";

function LeftBar() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(false);

  const clickHandler = (page) => {
    navigate(`/admin/${page}`);
  };
  return (
    <div className="leftbar-wrapper">
      <div className="box">
        <p onClick={() => setProduct(!product)} id="main">
          Product{" "}
          <ArrowDropDownIcon style={{ position: "relative", top: "4px" }} />
        </p>
        <div className={product ? `subproduct-box` : `subproduct-boxhide`}>
          <p onClick={() => clickHandler("addproduct")} id="sub">
            Add Product
          </p>
          <p onClick={() => clickHandler("listproduct")} id="sub">
            List Products
          </p>
        </div>
      </div>
      <div className="box">
        <p onClick={() => clickHandler("order")} id="main">
          Orders
        </p>
      </div>
    </div>
  );
}

export default LeftBar;
