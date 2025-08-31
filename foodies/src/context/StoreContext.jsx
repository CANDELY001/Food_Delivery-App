import { createContext, useEffect } from "react";
import { useState } from "react";
import { fetchFoodList } from "../service/foodService.js";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const [foodlist, setFoodlist] = useState([]);
  const [quantities, setQuantities] = useState({});

  const increaseQuantity = (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (foodId) => {
    setQuantities((prev) => ({
      ...prev,
      [foodId]: Math.max((prev[foodId] || 0) - 1, 0),
    }));
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
  };

  useEffect(() => {
    async function loadData() {
      const data = await fetchFoodList();
      setFoodlist(data);
    }
    loadData();
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
