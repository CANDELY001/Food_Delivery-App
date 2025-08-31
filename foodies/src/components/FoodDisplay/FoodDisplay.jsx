import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category, searchText }) => {
  const { foodlist } = useContext(StoreContext);
  const filteredFoods = foodlist.filter(
    (food) =>
      (category === "All" || food.category === category) &&
      food.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const [expanded, setExpanded] = useState({});
  return (
    <div className="container py-3">
      <div className="row">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food, index) => {
            const isLong = food.description && food.description.length > 60;
            const showFull = expanded[food.id];
            return (
              <FoodItem
                key={index}
                name={food.name}
                description={food.description}
                id={food.id}
                imageUrl={food.imageUrl}
                price={food.price}
              />
            );
          })
        ) : (
          <div className="text-center mt-4 w-100">
            <h4>No food items available.</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
