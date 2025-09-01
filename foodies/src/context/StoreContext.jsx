import { createContext, useEffect } from "react";
import { useState } from "react";
import { fetchFoodList } from "../service/foodService.js";
import { toast } from "react-toastify";
import axios from "axios";
import {
  addToCart,
  removeQtyFromCart,
  getCartData,
} from "../service/cartService.js";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [foodlist, setFoodlist] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [token, setToken] = useState();

  const increaseQuantity = async (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1,
    }));

    await addToCart(foodId, token);
  };

  const decreaseQuantity = async (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: Math.max((prev[foodId] || 0) - 1, 0),
    }));
    await removeQtyFromCart(foodId, token);
  };

  const loadCartData = async (token) => {
    const response = await getCartData(token);
    setQuantities(response);
  };
  const removeItemFromCart = (foodId) => {
    setQuantities((prev) => {
      const updated = { ...prev };
      delete updated[foodId];
      toast.success("Item removed from cart");
      return updated;
    });
  };
  const contextValue = {
    foodlist,
    increaseQuantity,
    decreaseQuantity,
    quantities,
    removeItemFromCart,
    token,
    setToken,
    setQuantities,
    loadCartData,
  };

  useEffect(() => {
    async function loadData() {
      const data = await fetchFoodList();
      setFoodlist(data);
      //keep token in setoken after reloading page
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
