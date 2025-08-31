import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";

const FoodItem = ({ name, description, id, imageUrl, price }) => {
  const { increaseQuantity, decreaseQuantity, quantities } =
    useContext(StoreContext);
  const [showFull, setShowFull] = useState(false);
  const isLong = description && description.length > 60;
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
      <div
        className="card"
        style={{
          maxWidth: 290,
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          border: "none",
        }}
      >
        <Link to={`/food/${id}`}>
          <img
            src={imageUrl}
            className="card-img-top"
            alt="Product Image"
            height={270}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <div className="card-text text-gray-700 font-light">
            <span
              style={
                showFull
                  ? {
                      overflow: "visible",
                      textOverflow: "clip",
                      whiteSpace: "normal",
                      display: "-webkit-box",
                      WebkitLineClamp: "unset",
                      WebkitBoxOrient: "vertical",
                    }
                  : {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      maxWidth: "100%",
                    }
              }
            >
              {showFull || !isLong
                ? description
                : description.slice(0, 60) + "..."}
              {isLong ? (
                <button
                  className="btn btn-link btn-sm p-0 ms-2"
                  style={{
                    fontWeight: 400,
                    textTransform: "capitalize",
                    color: "#364153",
                    fontSize: "0.7rem",
                  }}
                  onClick={() => setShowFull((prev) => !prev)}
                >
                  {showFull ? "Read less" : "Read more"}
                </button>
              ) : null}
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="h5 mb-0">&#x24;{price}</span>
            <div>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-half text-warning"></i>
              <small className="text-muted">(4.5)</small>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between border-0  bg-white">
          <Link to={`/food/${id}`} className="btn btn-warning btn-sm fw-bold">
            View Food
          </Link>
          {quantities[id] > 0 ? (
            <div className=" d-flex justify-content-between  bg-white">
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => decreaseQuantity(id)}
              >
                <i className="bi bi-dash-circle"></i>
              </button>
              <span className="fx-bold px-2 text-gray-800">
                {quantities[id]}
              </span>
              <button
                className="btn btn-outline-success btn-sm "
                onClick={() => increaseQuantity(id)}
              >
                <i className="bi bi-plus-circle"></i>
              </button>
            </div>
          ) : (
            <button
              className="btn btn-outline-success btn-sm"
              onClick={() => increaseQuantity(id)}
            >
              <i className="bi bi-plus-circle"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
