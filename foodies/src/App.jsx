import { Route } from "react-router-dom";
import "./App.css";
import MenuBar from "./components/Menubar/MenuBar.jsx";
import { Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./pages/Home/Home.jsx";
import Explore from "./pages/ExploreFood/Explore.jsx";
import ContactUs from "./pages/ContactUs/ContactUs.jsx";
import FoodDetails from "./pages/FoodDetails/FoodDetails.jsx";
import CartPage from "./pages/cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Success from "./pages/Checkout/Success.jsx";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";
import { useContext } from "react";
import { StoreContext } from "./context/StoreContext.jsx";

function App() {
  const { token } = useContext(StoreContext);
  return (
    <>
      <MenuBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/food/:id" element={<FoodDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order" element={token ? <PlaceOrder /> : <Login />} />
        <Route path="/login" element={token ? <Home /> : <Login />} />
        <Route path="/register" element={token ? <Home /> : <Register />} />
        <Route path="/payment/success*" element={<Success />} />
        <Route path="/myorders" element={token ? <MyOrders /> : <Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
