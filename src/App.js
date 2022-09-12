import "./App.css";
import Header from "./components/user/static/Header";
import UserLogin from "./components/user/UserLogin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/user/home/Home";
import AdminRegister from "./components/admin/AdminRegister";
import AdminHome from "./components/admin/AdminHome";
import ProductInfo from "./components/user/product/ProductInfo";
import Order from "./components/user/cart/Order";
import OrderPlaced from "./components/user/cart/OrderPlaced";
import ViewOrders from "./components/user/order/ViewOrders";
import SearchPage from "./components/user/home/SearchPage";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/admin" element={<AdminHome />} />
          <Route exact path="/admin/:page" element={<AdminHome />} />
          <Route exact path="/product/:productId" element={<ProductInfo />} />
          <Route
            exact
            path="/checkout/order/:userId/:step"
            element={<Order />}
          />
          <Route
            exact
            path="/order/placed/:userId/:orderId"
            element={<OrderPlaced />}
          />
          <Route
            exact
            path="/your-account/orders/:userId/:orderStatus"
            element={<ViewOrders />}
          />
          <Route
            exact
            path="/product/:query/search/:productStatus/:searchQuery/:sortQuery/:page"
            element={<SearchPage />}
          />
          <Route exact path="/auth" element={<UserLogin />} />
          <Route exact path="/auth/admin" element={<AdminRegister />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
