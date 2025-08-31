import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { fetchFoodDetails } from "../../service/foodService.js";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";
import { useNavigate } from "react-router-dom";

const FoodDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { increaseQuantity } = useContext(StoreContext);
  const navigate = useNavigate();
  const handleAddToCart = () => {
    increaseQuantity(data.id);
    toast.success("Item added to cart");
    navigate("/cart");
  };

  useEffect(() => {
    const getFoodDetails = async () => {
      try {
        const foodData = await fetchFoodDetails(id);
        setData(foodData);
      } catch (error) {
        toast.error("Error fetching food details:", error);
      }
    };
    getFoodDetails();
  }, [id]);
  return (
    <section className="pb-5 pt-3">
      <div className="container px-4 px-lg-5 mb-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img
              className="card-img-top mb-5 mb-md-0 shadow-3xl shadow-black"
              src={data.imageUrl}
              alt="..."
            />
          </div>
          <div className="col-md-6">
            <div className="small mb-1">
              <span className="fw-bold">Category:</span>{" "}
              <span className="badge text-bg-warning">{data.category}</span>
            </div>
            <h1
              className="display-3 fw-bolder py-2"
              style={{
                textShadow: "4px 4px 2px orange",
                // fontSize: "4rem",
              }}
            >
              {data.name}
            </h1>
            <div
              className=" mb-3 fw-bold display-5"
              //   style={{
              //     textShadow: "4px 4px 2px rgba(182,180,174,1)",
              //   }}
            >
              <span>&#x24;{data.price}</span>
            </div>
            <p className="lead text-secondary fs-6 fw-semibold">
              {data.description}
            </p>
            <div className="d-flex">
              <button
                className="btn btn-warning btn-lg  border-2 fw-bold flex-shrink-0"
                type="button"
                onClick={handleAddToCart}
              >
                <motion.img
                  src={assets.cart}
                  alt="cart icon"
                  height={20}
                  width={18}
                  style={{ marginRight: "15px" }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodDetails;
