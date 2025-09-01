import React, { useContext, useState, useEffect } from "react";

import axios from "axios";
import { assets } from "../../assets/assets.js";
import { toast } from "react-toastify";

const Orders = () => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get("http://localhost:8080/api/orders/all");
    setData(response.data || []);
  };

  const updateStatus = async (event, orderId) => {
    const response = await axios.patch(
      `http://localhost:8080/api/orders/status/${orderId}` +
        `?newStatus=${event.target.value}`
    );
    if (response.status === 200) {
      await fetchOrders();
      toast.success("Order status updated successfully");
    } else {
      toast.error("Error updating order status");
    }
    // Refresh the orders list after updating status
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          <table className="table table-responsive">
            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((order, index) => (
                  <tr key={index} className="order-row">
                    <td>
                      <img
                        src={assets.parcel}
                        height={55}
                        width={55}
                        alt="parcel"
                      />
                    </td>
                    <td>
                      <div className="fw-semibold">
                        {" "}
                        {order.orderedItems?.map((item, idx) => (
                          <span key={idx}>
                            {item.name} x {item.quantity}
                            {idx !== order.orderedItems.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                      <div>
                        <span className="fw-semibold">Address:</span>{" "}
                        {order.userAddress}
                      </div>
                    </td>
                    <td>${order.amount}</td>
                    <td>Items: {order.orderedItems?.length || 0}</td>

                    <td>
                      <select
                        className="form-control"
                        onChange={(event) => updateStatus(event, order.id)}
                        value={order.orderStatus}
                      >
                        <option value="PENDING">pending</option>
                        <option value="OUT FOR DELIVERY">
                          out for delivery
                        </option>
                        <option value="DELIVERED">delivered</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-5">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
