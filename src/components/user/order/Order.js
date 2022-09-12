import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "./order.css";

function Order({ loggedInUserDetails, orderStatus, order }) {
  let max = 3;
  const [addressPopup, setAddressPopup] = useState(false);
  const [seeMore, setSeeMore] = useState(false);

  console.log(order);
  return (
    <div className="successorder-wrapper">
      <div className="level1">
        <div className="orderplaced">
          <p>ORDER PLACED</p>
          <p>{order.orderPlacedDate}</p>
        </div>
        <div className="total">
          <p>TOTAL</p>
          <p>&#8377; {order.totalMoney}.00</p>
        </div>
        <div className="shipto">
          <p>SHIP TO</p>
          <p id="shipto-name" onClick={() => setAddressPopup(!addressPopup)}>
            {loggedInUserDetails.name}
          </p>
          <div
            className={addressPopup ? "address-popup" : "address-popup-hide"}
          >
            <CloseIcon
              onClick={() => setAddressPopup(!addressPopup)}
              id="closeicon"
            />
            <p id="popup-name">{loggedInUserDetails.name}</p>
            <p>{order.address.locality}</p>
            <p>{order.address.road}</p>
            <p id="popup-city">
              {order.address.city}, {order.address.state},{" "}
              {order.address.pincode}
            </p>
            <p id="popup-country">{order.address.country}</p>
            <p>Phone: {order.phone}</p>
          </div>
        </div>
        <div className="orderid">
          <p>ORDER # {order.orderId}</p>
          <p>View order details | Invoice</p>
        </div>
      </div>
      <div className="level2">
        <div className="left">
          {orderStatus === "success-orders" ? (
            <p id="delivery-date">
              <span style={{ color: "black", fontWeight: "400" }}>
                Delivered
              </span>{" "}
              27 July 2022
            </p>
          ) : (
            <>
              {orderStatus === "inprocess-orders" ? (
                <p id="delivery-date">
                  <span style={{ color: "black", fontWeight: "400" }}>
                    Delivery
                  </span>{" "}
                  {order.deliveryDate}
                </p>
              ) : orderStatus === "cancelled-orders" ? (
                <p id="delivery-date">
                  <span style={{ color: "black", fontWeight: "400" }}>
                    Cancelled
                  </span>{" "}
                </p>
              ) : null}
            </>
          )}

          {order.products.length > 1 ? <h2>Items</h2> : <h2>Item</h2>}
          {order.products.length <= 3 ? (
            <>
              {order.products.map((product) => {
                return (
                  <>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/product/${product.id._id}`}
                    >
                      <p id="product-name">
                        {product.id.name}{" "}
                        <span style={{ color: "black", fontWeight: "600" }}>
                          x{product.quantity} - &#8377;{" "}
                          {product.id.price * product.quantity}
                        </span>
                      </p>
                    </Link>
                  </>
                );
              })}
            </>
          ) : (
            <>
              {seeMore ? (
                <>
                  {order.products.map((product) => {
                    return (
                      <>
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/product/${product.id._id}`}
                        >
                          <p id="product-name">
                            {product.id.name}{" "}
                            <span style={{ color: "black", fontWeight: "600" }}>
                              x{product.quantity} - &#8377;{" "}
                              {product.id.price * product.quantity}
                            </span>
                          </p>
                        </Link>
                      </>
                    );
                  })}
                  <span className="seemore" onClick={() => setSeeMore(false)}>
                    See Less
                  </span>
                </>
              ) : (
                <>
                  {order.products.map((product, index) => {
                    return (
                      <>
                        {index < max ? (
                          <>
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`/product/${product.id._id}`}
                            >
                              <p id="product-name">
                                {product.id.name}{" "}
                                <span
                                  style={{ color: "black", fontWeight: "600" }}
                                >
                                  x{product.quantity} - &#8377;{" "}
                                  {product.id.price * product.quantity}
                                </span>
                              </p>
                            </Link>
                          </>
                        ) : null}
                      </>
                    );
                  })}
                  <span className="seemore" onClick={() => setSeeMore(true)}>
                    See More
                  </span>
                </>
              )}
            </>
          )}
        </div>
        <div className="right">
          {orderStatus === "success-orders" ? (
            <>
              {order.products.length === 1 ? (
                <Button
                  sx={{ margin: "2px 0" }}
                  size="small"
                  variant="contained"
                >
                  Write a product review
                </Button>
              ) : null}
            </>
          ) : (
            <>
              {orderStatus === "inprocess-orders" ? (
                <>
                  {order.products.length === 1 ? (
                    <>
                      <Button
                        sx={{ margin: "2px 0" }}
                        size="small"
                        variant="contained"
                      >
                        Write a product review
                      </Button>
                      <Button
                        sx={{ margin: "2px 0" }}
                        size="small"
                        variant="contained"
                      >
                        Track Package
                      </Button>
                    </>
                  ) : (
                    <Button
                      sx={{ margin: "2px 0" }}
                      size="small"
                      variant="contained"
                    >
                      Track Package
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {orderStatus === "cancelled-order" ? (
                    <>
                      {order.products.length === 1 ? (
                        <>
                          <Button
                            sx={{ margin: "2px 0" }}
                            size="small"
                            variant="contained"
                          >
                            Write a product review
                          </Button>
                        </>
                      ) : null}
                    </>
                  ) : null}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
