import "./AddFood.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { toast } from "react-toastify";
import { addFood } from "../../services/foodService";

const AddFood = ({ darkMode }) => {
  const Categories = [
    "Meals",
    "Burgers",
    "Cakes",
    "Ice-Cream",
    "Rolls",
    "Salads",
  ];
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Meals",
    price: "",
  });
  const onChangeHandeler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandeler = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload an image");
      return;
    }
    if (!data.name || !data.description || !data.category || !data.price) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      await addFood(data, image);
      toast.success("Food added successfully");
      setData({
        name: "",
        description: "",
        category: "Meals",
        price: "",
      });
      setImage(null);
    } catch (error) {
      //console.error("Error:", error);
      toast.error("Error adding food");
    }
  };

  return (
    <div
      className={`mt-3 mx-3  ${darkMode ? "bg-dark text-light" : "bg-white"}`}
    >
      <div className="row">
        <div
          className={`card col-md-5 ${
            darkMode
              ? "bg-dark text-light add-food-card-dark"
              : "add-food-card-light"
          }`}
        >
          <div
            className={`card-body ${
              darkMode ? "bg-dark text-light" : "bg-white"
            }`}
          >
            <h2 className="mb-4 text-center fw-semibold display-4">Add Food</h2>
            <form
              className="add-food-form"
              onSubmit={(e) => onSubmitHandeler(e)}
            >
              <div className="mb-3">
                <label
                  htmlFor="image"
                  className="form-label justify-content-center d-flex"
                >
                  <img
                    src={image ? URL.createObjectURL(image) : assets.upload}
                    alt="upload image"
                    width={120}
                  />
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="form-control"
                  required
                  hidden
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className={`form-label ${
                    darkMode ? "text-white-50" : "text-dark"
                  }`}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Chicken biryani"
                  required
                  className={`form-control ${
                    darkMode
                      ? "bg-dark text-light border-black placeholder-light"
                      : "placeholder-fade"
                  }`}
                  onChange={onChangeHandeler}
                  value={data.name}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="description"
                  className={`form-label ${
                    darkMode ? "text-white-50" : "text-dark"
                  }`}
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Delicious chicken biryani with raita..."
                  required
                  className={`form-control ${
                    darkMode
                      ? "bg-dark text-light border-black placeholder-light"
                      : "placeholder-fade"
                  }`}
                  onChange={onChangeHandeler}
                  value={data.description}
                  rows={3}
                ></textarea>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="category"
                  className={`form-label ${
                    darkMode ? "text-white-50" : "text-dark"
                  }`}
                >
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  className={`form-select ${
                    darkMode ? "bg-dark text-light border-black" : ""
                  }`}
                  onChange={onChangeHandeler}
                  value={data.category}
                  required
                >
                  {Categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="price"
                  className={`form-label ${
                    darkMode ? "text-white-50" : "text-dark"
                  }`}
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="$200.00"
                  required
                  className={`form-control ${
                    darkMode
                      ? "bg-dark text-light border-black placeholder-light"
                      : "placeholder-fade"
                  }`}
                  onChange={onChangeHandeler}
                  value={data.price}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn custom-orange-btn px-5 py-2"
                  style={{ minWidth: "150px" }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
