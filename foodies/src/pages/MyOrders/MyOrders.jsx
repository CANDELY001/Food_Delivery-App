// import React, { useContext, useState, useEffect } from "react";
// import "./MyOrders.css";
// import { StoreContext } from "../../context/StoreContext.jsx";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const MyOrders = () => {
//   const { token } = useContext(StoreContext);
//   const [data, setData] = useState([]);

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/orders", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setData(response.data);
//     } catch (err) {
//       toast.error("Error fetching orders: " + err.message);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchOrders();
//   }, [token]);

//   return (
//     <div className="container">
//       <div className="py-5 row justify-content-center">
//         <div className="col-11 card">
//           <table className="table table-responsive">
//             <tbody>
//               {data.map((order, index) => {
//                 return (
//                   <tr key={index} className="order-row">
//                     <td>
//                       <img src={assets.logo} height={48} width={48} />
//                     </td>
//                     <td>
//                       {order.orderedItems.map((item, index) => {
//                         if (index === order.orderedItems.length - 1) {
//                           return item.name + " x " + item.quantity;
//                         } else {
//                           return item.name + " x " + item.quantity + ", ";
//                         }
//                       })}
//                     </td>
//                     <td>${order.amount}</td>
//                     <td>Items: {order.orderedItems.length}</td>
//                     <td className="fw-bold text-capitalize">{order.status}</td>
//                     <td>
//                       <button className="btn btn-warning" onClick={fetchOrders}>
//                         <i className="bi bi-arrow-clockwise"></i>
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyOrders;

import React, { useContext, useState, useEffect } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { assets } from "../../assets/assets.js";

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched orders:", response.data);
      setData(response.data || []);
    } catch (error) {
      setData([]); // fallback to empty array on error
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="container">
      <div className="py-5 row justify-content-center ">
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
                      {order.orderedItems?.map((item, idx) => (
                        <span key={idx}>
                          {item.name} x {item.quantity}
                          {idx !== order.orderedItems.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </td>
                    <td>${order.amount}</td>
                    <td>Items: {order.orderedItems?.length || 0}</td>
                    <td
                      className={`fw-bold text-lowercase 
`}
                    >
                      •{order.ordersStatus}
                    </td>
                    <td>
                      <button className="btn btn-warning">
                        <i className="bi bi-arrow-clockwise"></i>
                      </button>
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

export default MyOrders;
