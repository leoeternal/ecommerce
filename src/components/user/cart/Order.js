import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MyComponent from "react-fullpage-custom-loader";
import { useNavigate, useParams } from "react-router-dom";
import { loggedInUserInfo } from "../../../store/userstore/UserAction";
import { orderActions } from "../../../store/userstore/OrderSlice";
import {
  createOrder,
  orderPlaced,
  updateOrderAddress,
  updateOrderPayment,
} from "../../../store/userstore/OrderAction";
import "./order.css";
import { CircularProgress } from "@mui/material";
import { productActions } from "../../../store/ProductSlice";
import { getProductInCart } from "../../../store/ProductAction";
import ProductsInCartDisplay from "./ProductsInCartDisplay";
import { toast } from "react-toastify";

function Order() {
  let total = 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, step } = useParams();
  const [country, setCountry] = useState("");
  const [road, setRoad] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [upi, setUpi] = useState(false);
  const [card, setCard] = useState(false);
  const [cod, setCod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const { loggedStatus, loggedInUserDetails } = useSelector(
    (state) => state.user
  );
  const { productCartPopupLoader, productsInCart } = useSelector(
    (state) => state.product
  );
  const {
    orderPageLoader,
    orderButtonLoader,
    orderDetails,
    orderCreated,
    orderPaymentUpdated,
    orderUpdated,
    orderPlacedFinal,
  } = useSelector((state) => state.order);

  useEffect(() => {
    if (step !== "review") {
      localStorage.setItem("orderStep", document.location.pathname);
    }
    if (
      step === "review" &&
      localStorage.getItem("orderStep") !==
        `/checkout/order/${localStorage.getItem("loggedId")}/payment`
    ) {
      navigate("/");
    } else {
      dispatch(orderActions.updateOnOrderScreenValueToTrue());
      dispatch(orderActions.updateOrderPageLoaderValue());
      dispatch(productActions.updateProductCartPopupLoaderValue());
      dispatch(orderActions.updateOrderCreatedValue());
      if (loggedStatus) {
        dispatch(loggedInUserInfo({ id: localStorage.getItem("loggedId") }));
        dispatch(getProductInCart(localStorage.getItem("loggedId")));
        dispatch(createOrder({ loggedUserId: userId }));
      } else {
        navigate("/");
      }
    }
  }, [dispatch, userId, loggedStatus, navigate, step]);

  useEffect(() => {
    if (orderCreated) {
      setCountry(orderDetails.address.country);
      setRoad(orderDetails.address.road);
      setLocality(orderDetails.address.locality);
      setCity(orderDetails.address.city);
      setState(orderDetails.address.state);
      setPincode(orderDetails.address.pincode);
      setPhone(orderDetails.phone);
      dispatch(orderActions.updateOrderCreatedValue());
    }
  }, [orderCreated, dispatch, orderDetails, loggedInUserDetails, navigate]);

  useEffect(() => {
    if (orderUpdated) {
      navigate(`/checkout/order/${loggedInUserDetails._id}/payment`);
      dispatch(orderActions.updateOrderUpdatedValue());
    }
    if (orderDetails.paymentMethod === "card") {
      setPaymentMethod("card");
      setCod(false);
      setUpi(false);
      setCard(true);
    } else if (orderDetails.paymentMethod === "cod") {
      setPaymentMethod("cod");
      setCod(true);
      setUpi(false);
      setCard(false);
    } else {
      setPaymentMethod("upi");
      setCod(false);
      setUpi(true);
      setCard(false);
    }
  }, [orderUpdated, loggedInUserDetails, dispatch, navigate, orderDetails]);

  useEffect(() => {
    if (orderPaymentUpdated) {
      navigate(`/checkout/order/${loggedInUserDetails._id}/review`);
      dispatch(orderActions.updateOrderPaymentUpdatedValue());
    }
  }, [orderPaymentUpdated, loggedInUserDetails, dispatch, navigate]);

  useEffect(() => {
    if (orderPlacedFinal) {
      dispatch(orderActions.updateOrderPageLoaderValue());
      navigate(`/order/placed/${loggedInUserDetails._id}/${orderDetails._id}`);
      dispatch(orderActions.updateOrderPlacedFinalValue());
    }
  }, [orderPlacedFinal, navigate, dispatch, loggedInUserDetails, orderDetails]);

  const checkboxHandler = (event) => {
    setCheckbox(event.target.checked);
  };

  const codCheckboxHandler = (event) => {
    if (cod !== true) {
      setPaymentMethod("cod");
      setCod(event.target.checked);
      setUpi(!event.target.checked);
      setCard(!event.target.checked);
    }
  };

  const cardCheckboxHandler = (event) => {
    if (card !== true) {
      setPaymentMethod("card");
      setCod(!event.target.checked);
      setUpi(!event.target.checked);
      setCard(event.target.checked);
    }
  };

  const upiCheckboxHandler = (event) => {
    if (upi !== true) {
      setPaymentMethod("upi");
      setCod(!event.target.checked);
      setUpi(event.target.checked);
      setCard(!event.target.checked);
    }
  };

  const continueShoppingButtonHandler = () => {
    if (
      country === "" ||
      road === "" ||
      locality === "" ||
      city === "" ||
      state === "" ||
      pincode === "" ||
      phone === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      const data = {
        address: {
          country,
          road,
          locality,
          city,
          state,
          pincode,
          phone,
        },
        checkboxStatus: checkbox,
        orderId: orderDetails._id,
        totalAmount: total,
        products: productsInCart,
      };
      dispatch(orderActions.updateOrderButtonLoaderValue());
      dispatch(updateOrderAddress(data));
    }
  };

  const paymentHandler = () => {
    if (!upi && !card && !cod) {
      toast.error("Please select one payment method");
    } else {
      dispatch(orderActions.updateOrderButtonLoaderValue());
      dispatch(
        updateOrderPayment({
          paymentMethod,
          orderId: orderDetails._id,
        })
      );
    }
  };

  const orderPlacedHandler = () => {
    dispatch(orderActions.updateOrderButtonLoaderValue());
    dispatch(orderPlaced({ orderId: orderDetails._id }));
  };

  return (
    <>
      {orderPageLoader ? (
        <MyComponent />
      ) : (
        <>
          <ToastContainer
            position="top-center"
            hideProgressBar={true}
            autoClose={3000}
          />
          <div className="order-wrapper">
            <div className="banner">
              <p>Daily Needs</p>
            </div>
            <div className="body">
              {step === "address" ? (
                <div className="order-detail">
                  <p id="add-title">Shipping Address</p>
                  <FormControl fullWidth>
                    <InputLabel
                      sx={{ marginTop: "40px" }}
                      id="demo-simple-select-label"
                    >
                      Select Country
                    </InputLabel>
                    <Select
                      sx={{ marginTop: "40px" }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={country}
                      label="Select Country"
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <MenuItem value={"america"}>America</MenuItem>
                      <MenuItem value={"denmark"}>Denmark</MenuItem>
                      <MenuItem value={"asutralia"}>Australia</MenuItem>
                      <MenuItem value={"india"}>India</MenuItem>
                      <MenuItem value={"pakistan"}>Pakistan</MenuItem>
                      <MenuItem value={"norway"}>Norway</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Road"
                    variant="outlined"
                    fullWidth
                    value={road}
                    onChange={(e) => setRoad(e.target.value)}
                    style={{ margin: "20px 0px 10px 0px" }}
                    autoComplete="off"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Apartment, suite, etc."
                    variant="outlined"
                    fullWidth
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    style={{ margin: "5px 0px" }}
                    autoComplete="off"
                  />
                  <div
                    style={{ display: "flex", margin: "10px 0px" }}
                    className="city-state-pin"
                  >
                    <TextField
                      id="outlined-basic"
                      label="City"
                      variant="outlined"
                      fullWidth
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      autoComplete="off"
                    />
                    <FormControl fullWidth>
                      <InputLabel
                        sx={{ margin: "0px 10px" }}
                        id="demo-simple-select-label"
                      >
                        Select State
                      </InputLabel>
                      <Select
                        sx={{ margin: "0px 10px" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state}
                        label="Select State"
                        onChange={(e) => setState(e.target.value)}
                      >
                        <MenuItem value={"goa"}>Goa</MenuItem>
                        <MenuItem value={"gujarat"}>Gujarat</MenuItem>
                        <MenuItem value={"tamilnadu"}>Tamil Nadu</MenuItem>
                        <MenuItem value={"tripura"}>Tripura</MenuItem>
                        <MenuItem value={"uttarpradesh"}>
                          Uttar Pradesh
                        </MenuItem>
                        <MenuItem value={"westbengal"}>West Bengal</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      id="outlined-basic"
                      label="PIN code"
                      variant="outlined"
                      fullWidth
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                  <TextField
                    type="number"
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ margin: "5px 0px" }}
                    autoComplete="off"
                  />
                  {!loggedInUserDetails.address.status ? (
                    <FormControlLabel
                      control={<Checkbox />}
                      value={checkbox}
                      label="Save this address for future orders"
                      onChange={checkboxHandler}
                    />
                  ) : null}

                  <div className="button-container">
                    <p id="return"> {"<"} Return to cart</p>
                    {orderButtonLoader ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        sx={{ color: "white", backgroundColor: "black" }}
                        variant="contained"
                        onClick={continueShoppingButtonHandler}
                      >
                        Continue to shipping
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  {step === "payment" ? (
                    <div className="payment-detail">
                      <p>
                        <span style={{ color: "grey" }}>
                          Address&nbsp;&nbsp;{">"}
                        </span>
                        <span
                          style={{
                            fontSize: "30px",
                            fontWeight: "600",
                            color: "black",
                          }}
                        >
                          &nbsp;Payment
                        </span>
                        <span style={{ color: "grey" }}>
                          &nbsp;&nbsp;{">"}&nbsp;&nbsp;Review
                        </span>
                      </p>
                      <div className="info-box">
                        <div className="contact">
                          <p style={{ color: "grey", fontSize: "18px" }}>
                            Contact
                          </p>
                          <p id="email">{loggedInUserDetails.email}</p>
                          <p id="change">Change</p>
                        </div>
                        <hr style={{ width: "90%", margin: "auto" }} />
                        <div className="contact">
                          <p style={{ color: "grey", fontSize: "18px" }}>
                            Ship to
                          </p>
                          <p id="email">
                            {orderDetails.address.locality},{" "}
                            {orderDetails.address.road},{" "}
                            {orderDetails.address.city},{" "}
                            {orderDetails.address.state},{" "}
                            {orderDetails.address.pincode},{" "}
                            {orderDetails.address.country}
                          </p>
                          <p id="change">Change</p>
                        </div>

                        <div className="shipto"></div>
                      </div>
                      <p id="payment-title">Payment</p>
                      <p id="note">
                        All transactions are secure and encrypted.
                      </p>
                      <div className="payment-option">
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Cash on Delivery"
                          checked={cod}
                          onChange={codCheckboxHandler}
                        />
                        <br />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Other UPI Apps"
                          checked={upi}
                          onChange={upiCheckboxHandler}
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Debit/Credit/ATM Card"
                          checked={card}
                          onChange={cardCheckboxHandler}
                        />
                      </div>
                      <div className="review-button">
                        <p>{"<"} Return to shipping</p>
                        {orderButtonLoader ? (
                          <CircularProgress />
                        ) : (
                          <Button
                            sx={{ color: "white", backgroundColor: "black" }}
                            variant="contained"
                            onClick={paymentHandler}
                          >
                            Review
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      {step === "review" ? (
                        <div className="review-order">
                          <p>
                            <span style={{ color: "grey" }}>
                              Address&nbsp;&nbsp;{">"}
                            </span>

                            <span style={{ color: "grey" }}>
                              &nbsp;&nbsp;Payment&nbsp;&nbsp;{">"}
                            </span>
                            <span
                              style={{
                                fontSize: "30px",
                                fontWeight: "600",
                                color: "black",
                              }}
                            >
                              &nbsp;Review items and delivery
                            </span>
                          </p>
                          <div className="review-infobox">
                            <p id="date">
                              Delivery date:{" "}
                              <span style={{ color: "green" }}>
                                {orderDetails.deliveryDate}
                              </span>
                            </p>
                            <div className="review-address">
                              <p id="address">
                                {orderDetails.address.locality}
                              </p>
                              <p>{orderDetails.address.road}</p>
                              <p>{orderDetails.address.city}</p>
                              <p>
                                {orderDetails.address.state},{" "}
                                {orderDetails.address.pincode}
                              </p>
                            </div>
                            <p id="review-paymethod">
                              Payment Method:{" "}
                              {orderDetails.paymentMethod === "cod" ? (
                                <span style={{ color: "red" }}>
                                  Cash on Delivery
                                </span>
                              ) : (
                                <>
                                  {orderDetails.paymentMethod === "card" ? (
                                    <span style={{ color: "red" }}>
                                      Credit/Debit card
                                    </span>
                                  ) : (
                                    <>
                                      {orderDetails.paymentMethod === "upi" ? (
                                        <span style={{ color: "red" }}>
                                          UPI
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </>
                              )}
                            </p>
                          </div>
                          <div className="place-order">
                            <div className="placeorder-button">
                              {orderButtonLoader ? (
                                <CircularProgress />
                              ) : (
                                <Button
                                  onClick={orderPlacedHandler}
                                  sx={{
                                    backgroundColor: "orange",
                                    color: "black",
                                    fontWeight: "600",
                                    textTransform: "none",
                                    marginTop: "5px",
                                  }}
                                  variant="contained"
                                >
                                  Place your order
                                </Button>
                              )}
                            </div>
                            <div className="review-total">
                              <p id="total">
                                Order Total: &#8377;{orderDetails.totalMoney}
                              </p>
                              <p id="note">
                                By placing your order, you agree to Daily
                                Needs's privacy notice and conditions of use.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </>
                  )}
                </>
              )}

              <div className="products">
                {productCartPopupLoader ? (
                  <CircularProgress />
                ) : (
                  <>
                    {productsInCart.map((product, index) => {
                      total += product.quantity * product.id.price;
                      return (
                        <div key={index}>
                          <ProductsInCartDisplay
                            state="checkout"
                            product={product}
                          />
                        </div>
                      );
                    })}
                    <div
                      style={{
                        border: "1px solid rgb(179, 179, 179)",
                        width: "80%",
                        margin: "auto",
                        marginTop: "20px",
                      }}
                    ></div>
                    <div className="subtotal">
                      <p style={{ color: "grey" }}>Subtotal</p>
                      <p>&#8377;{total}</p>
                    </div>
                    <div className="shipping">
                      <p style={{ color: "grey" }}>Shipping</p>
                      <p>Free</p>
                    </div>
                    <div
                      style={{
                        border: "1px solid rgb(179, 179, 179)",
                        width: "80%",
                        margin: "auto",
                        marginTop: "20px",
                      }}
                    ></div>
                    <div className="total">
                      <p>Total</p>
                      <p>
                        <span style={{ color: "grey", fontSize: "14px" }}>
                          INR
                        </span>
                        {"  "}
                        &#8377;{total}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Order;
