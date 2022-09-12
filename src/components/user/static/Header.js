import React, { useEffect, useState } from "react";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/userstore/UserAction";
import { userActions } from "../../../store/userstore/UserSlice";
import { CircularProgress } from "@mui/material";
import { logoutAdmin } from "../../../store/adminstore/AdminAction";
import { adminActions } from "../../../store/adminstore/AdminSlice";
import CartPopup from "../cart/CartPopup";
import { productActions } from "../../../store/ProductSlice";
import { getProductsNameByQuery } from "../../../store/ProductAction";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartState, setCartState] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchDropdown, setSearchDropdown] = useState(false);

  const { loggedStatus, loggedInUserDetails, userButtonLoader, userLoggedOut } =
    useSelector((state) => state.user);
  const { adminLoggedStatus, loggedInAdminDetails, adminButtonLoader } =
    useSelector((state) => state.admin);
  const { productsInSearchbar, productsFetched } = useSelector(
    (state) => state.product
  );
  const { onOrderScreen } = useSelector((state) => state.order);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    if (userLoggedOut) {
      setCartState(false);
      dispatch(productActions.updateProductsInCartValue());
      dispatch(userActions.updateUserLoggedOutValue());
    }
  }, [dispatch, userLoggedOut]);

  const dropdownHandler = (choice) => {
    if (choice === "logout") {
      if (loggedStatus && !adminLoggedStatus) {
        dispatch(userActions.updateUserButtonLoaderValue());
        dispatch(logoutUser(localStorage.getItem("loggedId")));
      } else if (!loggedStatus && adminLoggedStatus) {
        dispatch(adminActions.updateAdminButtonLoaderValue());
        dispatch(logoutAdmin(localStorage.getItem("adminLoggedId")));
      }
    } else if (choice === "order") {
      navigate(
        `/your-account/orders/${loggedInUserDetails._id}/success-orders`
      );
    }
  };

  const cartOpenHandler = () => {
    if (loggedStatus) {
      setCartState(!cartState);
    }
  };

  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      setSearchDropdown(true);
      dispatch(productActions.updateProductsFetchedvalue());
      dispatch(getProductsNameByQuery(e.target.value));
    } else {
      setSearchDropdown(false);
      dispatch(productActions.updateProductsFetchedvalue());
    }
  };

  const searchedItemClickedHandler = (product) => {
    localStorage.setItem("filters", []);
    if (product.status === "tags") {
      setSearchQuery(product.slug);
      navigate(
        `/product/${product.slug}/search/${product.status}/${product.slug}/featured/1`
      );
    } else {
      setSearchQuery(product.name);
      navigate(
        `/product/${product.slug}/search/${product.status}/${product.name}/featured/1`
      );
    }
  };

  return (
    <>
      {onOrderScreen ? null : (
        <>
          <div
            className={
              cartState && loggedStatus ? `cart-wrapper` : `cartwrapper-hide`
            }
          >
            <CartPopup
              loggedInUserDetails={loggedInUserDetails}
              loggedStatus={loggedStatus}
              cartState={cartState}
              setCartState={setCartState}
            />
          </div>
          <div
            onClick={() => setSearchDropdown(false)}
            className="header-wrapper"
          >
            <div className="title">
              <DensityMediumIcon style={{ color: "white", fontSize: "30px" }} />
              <Link style={{ textDecoration: "none" }} to="/">
                <p id="title">DailyNeeds</p>
              </Link>
            </div>
            <div className="search">
              {!adminLoggedStatus ? (
                <input
                  type="search"
                  value={searchQuery}
                  onChange={searchHandler}
                  placeholder="Search essentials, groceries, and more..."
                />
              ) : (
                <input type="search" placeholder="Search users..." />
              )}
              {searchDropdown ? (
                <>
                  {productsFetched ? (
                    <>
                      {productsInSearchbar.length === 0 ? (
                        <div className="search-dropdown">
                          <p id="no-data-found">No data found</p>
                        </div>
                      ) : (
                        <div className="search-dropdown">
                          {productsInSearchbar.map((product) => {
                            return (
                              <>
                                {product.status === "name" ? (
                                  <>
                                    <div
                                      onClick={() =>
                                        searchedItemClickedHandler(product)
                                      }
                                      className="search-result"
                                    >
                                      <span>{product.name}</span>
                                      <p id="category">
                                        in {product.category[0]}
                                      </p>
                                    </div>
                                  </>
                                ) : (
                                  <p
                                    onClick={() =>
                                      searchedItemClickedHandler(product)
                                    }
                                    className="search-result"
                                  >
                                    <span>{product.slug}</span>
                                  </p>
                                )}
                              </>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="search-dropdown">
                      <CircularProgress size="2rem" sx={{ margin: "5px" }} />
                    </div>
                  )}
                </>
              ) : null}
            </div>
            <div
              onMouseOver={() => setDropdown(true)}
              onMouseOut={() => setDropdown(false)}
              className="auth"
            >
              {loggedStatus || adminLoggedStatus ? (
                <>
                  {dropdown ? (
                    <div
                      onMouseOver={() => setDropdown(true)}
                      onMouseOut={() => setDropdown(false)}
                      className="dropdown"
                    >
                      <span
                        onClick={() => dropdownHandler("setting")}
                        id="dropdown-text"
                      >
                        Settings
                      </span>
                      {!adminLoggedStatus ? (
                        <span
                          onClick={() => dropdownHandler("order")}
                          id="dropdown-text"
                        >
                          Orders
                        </span>
                      ) : null}

                      {userButtonLoader || adminButtonLoader ? (
                        <CircularProgress />
                      ) : (
                        <span
                          onClick={() => dropdownHandler("logout")}
                          id="dropdown-text"
                        >
                          Logout
                        </span>
                      )}
                    </div>
                  ) : null}
                  <PersonIcon style={{ color: "white" }} />
                  {loggedStatus ? (
                    <p id="logged-name">{loggedInUserDetails.name}</p>
                  ) : (
                    <>
                      {adminLoggedStatus ? (
                        <p id="logged-name">{loggedInAdminDetails.name}</p>
                      ) : null}
                    </>
                  )}
                </>
              ) : (
                <>
                  <Link style={{ textDecoration: "none" }} to="/auth">
                    <PersonIcon style={{ color: "white" }} />
                  </Link>
                  <Link style={{ textDecoration: "none" }} to="/auth">
                    <p>Sign in / Sign up</p>
                  </Link>
                </>
              )}
            </div>
            <div onClick={cartOpenHandler} className="cart">
              {!adminLoggedStatus ? (
                <>
                  <ShoppingCartIcon style={{ color: "white" }} />
                  <p>
                    Cart{" "}
                    {loggedStatus && loggedInUserDetails.cartQuantity > 0 ? (
                      <>
                        <span id="cartquantity">
                          {loggedInUserDetails.cartQuantity}
                        </span>
                      </>
                    ) : null}
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Header;
