import React from "react";
import { categories } from "../../assets/assets.js";
import "./ExploreMenu.css";
import { useRef } from "react";

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);
  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="explore-menu position-relative">
      <h1 className="d-flex fw-bold align-items-center justify-content-between mt-5">
        Explore Our Menu
        <div className="d-flex">
          <i
            className="bi bi-arrow-left-circle scroll-icon"
            onClick={scrollLeft}
          ></i>
          <i
            className="bi bi-arrow-right-circle scroll-icon"
            onClick={scrollRight}
          ></i>
        </div>
      </h1>
      <p>Explore curated lists of delicious dishes from various categories.</p>
      <div
        className="d-flex justify-content-between overflow-auto gap-4 explore-menu-list py-3"
        ref={menuRef}
      >
        {categories.map((item, index) => {
          return (
            <div
              className="text-center explore-menu-list-item"
              key={index}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.category ? "All" : item.category
                )
              }
            >
              <img
                src={item.icon}
                alt={item.category}
                className={
                  item.category === category
                    ? "rounded-circle active"
                    : "rounded-circle"
                }
                height={100}
                width={100}
              />
              <p
                className={
                  item.category === category
                    ? "mt-2 fw-bold activep"
                    : "mt-2 fw-bold"
                }
              >
                {item.category}
              </p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
