import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

export const placeOrder = async (orderDetails, token) => {
  try {
    const response = await axios.post(`${API_URL}/create`, orderDetails, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // <-- this returns only the actual order object
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};
